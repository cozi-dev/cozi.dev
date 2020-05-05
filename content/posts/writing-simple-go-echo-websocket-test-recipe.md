---
title: "Writing Simple Go Echo Websocket Test Recipe"
date: 2020-05-05T22:37:57+07:00
---

## Introduction

Today, I'll show you how I set up a simple test for WebSocket using [gorilla/websocket](https://github.com/gorilla/websocket) in [Echo](https://github.com/labstack/echo) framework and how it makes me more confident with my code :)

## Let's get started

### Writing a simple handler

The handler just simply says hello to the client (`Hello, Client!`) and reads the message from the client.

```go {linenos=table,hl_lines=[8,"15-17"],linenostart=1}
// websocket.go

package websocket

import (
  "fmt"

  "github.com/gorilla/websocket"
  "github.com/labstack/echo"
)

var (
  upgrader = websocket.Upgrader{}
)

func hello(c echo.Context) error {
  ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
  if err != nil {
    return err
  }
  defer ws.Close()

  for {
    // Write
    err := ws.WriteMessage(websocket.TextMessage, []byte("Hello, Client!"))
    if err != nil {
      c.Logger().Error(err)
    }

    // Read
    _, msg, err := ws.ReadMessage()
    if err != nil {
      c.Logger().Error(err)
    }
    fmt.Printf("%s\n", msg)
  }
}
```

### Implement test

Because we need to communicate with WebSocket server so we need to create a test server by using `httptest` package, below is the handler function need for creating new test server:

{{< code numbered="true" >}}
type WsHandler struct {
  handler echo.HandlerFunc
}

func (h *WsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  e := echo.New()
  c := e.NewContext(r, w)

  forever := make(chan struct{})
  [[[h.handler(c)]]]
  [[[<-forever]]]
}
{{< /code >}}

1. Call the actual Echo handler function.
2. Block, keep the handler function run forever.

This is full test file:

```go
// websocket_test.go

package websocket

import (
  "net/http"
  "net/http/httptest"
  "strings"
  "testing"

  "github.com/gorilla/websocket"
  "github.com/labstack/echo"
  "github.com/stretchr/testify/assert"
)

// WsHandler -
type WsHandler struct {
  handler echo.HandlerFunc
}

func (h *WsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  e := echo.New()
  c := e.NewContext(r, w)

  forever := make(chan struct{})
  h.handler(c)
  <-forever
}

func TestWebsocketExample(t *testing.T) {
  h := WsHandler{handler: hello}
  server := httptest.NewServer(http.HandlerFunc(h.ServeHTTP))
  defer server.Close()

  wsURL := "ws" + strings.TrimPrefix(server.URL, "http") + "/ws"
  ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
  assert.Nil(t, err, err)

  // write
  err = ws.WriteMessage(websocket.TextMessage, []byte("Hello, Server!"))
  assert.Nil(t, err, err)

  // read
  _, msg, err := ws.ReadMessage()
  assert.Nil(t, err, err)
  assert.Equal(t, "Hello, Client!", string(msg))
}

```

## Source code

Source code for this test recipe can be found [here](https://github.com/tungquach/go-echo-websocket-test-recipe).

## Conclusion

That's it! We have done a simple test case that ensures client and server receive hello from each other. And I want to say it is important to write tests for your real-world projects to get those benefits:

{{< ticks >}}

* More confident.
* More time to focus on new features.
* Reduce bugs.
* Easier for debugging.

{{< /ticks >}}
