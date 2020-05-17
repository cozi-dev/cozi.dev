---
title: "Simple Django Vue Websocket Chat Application Using Channels"
date: 2020-05-17T14:17:27+07:00
tags: ["django", "vue", "websocket", "chat", "channels"]
---

## Introduction

In this article, we will create a simple chat application using {{< new-tab-link href="https://www.djangoproject.com/" >}}django{{< /new-tab-link >}}, {{< new-tab-link href="https://vuejs.org/" >}}vue{{< /new-tab-link >}} and {{< new-tab-link href="https://github.com/django/channels" >}}channels{{< /new-tab-link >}}.

**Note:** Source code for this article can be found {{< new-tab-link href="https://github.com/tungquach/django-vue-websocket-chat" >}}here{{< /new-tab-link >}}. You can pull it to your machine and run `docker-compose up` to start.

Our chat application looks like this:

{{< resize-image src="chat_app.jpg" >}}

## Walk thourgh

### Chat consumer

Your chat consumer located in `chat/consumers.py`.
This file allow you to receive message from a chat group and send it to other people in this group.

```python
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
```

And here is routing configuration for your consumer `chat/routing.py`

```python
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer)
]
```

Make sure your chat consumer is working correctly with `chat/tests/test_chat_consumer.py`

```python
import pytest
from channels.testing import WebsocketCommunicator
from chat.consumers import ChatConsumer
from channels.routing import URLRouter
from django.urls import re_path


@pytest.mark.asyncio
async def test_chat_consumer():
    application = URLRouter([re_path(r"ws/chat/(?P<room_name>\w+)/$", ChatConsumer)])
    communicator = WebsocketCommunicator(application, "/ws/chat/newbie/")
    connected, subprotocol = await communicator.connect()
    assert connected

    # test sending text
    await communicator.send_json_to({"message": "hello"})
    response = await communicator.receive_json_from()
    assert response.get("message") == "hello"

    # close
    await communicator.disconnect()
```

### Chat client

`assets/src/components/ChatRoom.vue` is use to send and receive message from Websocket server.

```html
<template>
  <div>
    <div class="top"><span><span class="name">#{{ roomName }}</span></span></div>
    <div class="chat active-chat">
      <div class="conversation-start">
        <span>Today, 6:48 AM</span>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="bubble text"
      >
        {{ message }}
      </div>
    </div>
    <div class="write">
      <a
        href="javascript:;"
        class="write-link attach"
      ><i class="fas fa-paperclip"></i></a>
      <input
        type="text"
        @keyup.enter="sendMessage()"
        v-model="message"
        placeholder="Send a message..."
      />
      <a
        @click="sendMessage()"
        href="javascript:;"
        class="write-link send"
      >
        <i class="far fa-paper-plane"></i>
      </a>
      <a
        href="javascript:;"
        class="write-link smiley"
      >
        <i class="far fa-smile"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChatRoom extends Vue {
  @Prop() private roomName!: string;

  messages: Array<string> = [];
  chatSocket: WebSocket = new WebSocket(
    `ws://${window.location.host}/ws/chat/${this.roomName}/`
  );
  message: string = "";

  mounted() {
    this.chatSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      const message = data.message;
      this.messages.push(message);
    };

    this.chatSocket.onclose = e => {
      console.error("chat socket closed unexpectedly!");
    };
  }

  sendMessage(): void {
    this.chatSocket.send(
      JSON.stringify({
        message: this.message
      })
    );

    this.message = "";
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
```

## Conclusion

This is just a simple chat application, if you love this stack then you can update the code to build more features. Thanks for reading!
