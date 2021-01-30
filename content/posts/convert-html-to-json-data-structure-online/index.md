---
title: "Convert HTML to JSON data structure online"
date: 2021-01-30T15:50:56+07:00
tags: ["html", "json", "online", "tool"]
---

Today, I will introduce a tool that help you to convert HTML to JSON data structure online:

<a href="https://myboringtools.com/html-to-json" target="_blank">https://myboringtools.com/html-to-json</a>

{{< resize-image src="myboringtools.png" >}}

If you develop a frontend app, you may not want to repeat the same HTML blocks many times, so what to do next? For me, I will convert it into JSON data and use a loop to iterate that data then my code will look much cleaner and easy to update.

For example, we will convert a list of team members from HTML to JSON data:

```html
<!-- HTML data -->
<div class="row">
  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Jane Doe</h2>
        <p class="title">CEO & Founder</p>
        <p class="exp">years of experience: <b>15</b></p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Mike Ross</h2>
        <p class="title">Art Director</p>
        <p class="exp">years of experience: <b>8</b></p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p class="exp">years of experience: <b>5</b></p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p>5 years</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
```

Here is the JSON output data:
```json
[
  {
    "name": "Jane Doe",
    "experience": 15,
    "email": "jane@example.com"
  },
  {
    "experience": 8,
    "email": "mike@example.com",
    "name": "Mike Ross"
  },
  {
    "name": "John Doe",
    "experience": 5,
    "email": "john@example.com"
  }
]
```

Example use in Vue app

```html
<template>
  <div class="team">
    <div
        v-for="member in teamMembers"
        :key="member.email"
        class="member"
    >
        <div class="name">{{ member.name }}</div>
        <div class="email">{{ member.email }}</div>
        <div class="exp">{{ member.experience }}</div>
    </tr>
  </div>
</template>

<script>
export default {
  data() {
      return {
          teamMembers: [
            {
                "name": "Jane Doe",
                "experience": 15,
                "email": "jane@example.com"
            },
            {
                "experience": 8,
                "email": "mike@example.com",
                "name": "Mike Ross"
            },
            {
                "name": "John Doe",
                "experience": 5,
                "email": "john@example.com"
            }
        ],
      }
  },
}
</script>

```

The HTML part looks much cleaner now. I hope you enjoy it!
