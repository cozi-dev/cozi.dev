---
title: "Inject Vue instance into an iframe that create in runtime"
date: 2020-06-21T22:59:16+07:00
tags: ["vue", "iframe"]
---

## Introduction

Have you had ever wanted your component style won't be affected by any third-party style and too lazy to create a new page to put it into iframe src? If the answer is "yes" then you come into the right place :)

## Let's do it

### Step 1: Create a new iframe

First, we need create a new iframe in runtime and append it to somewhere like document body for example:

```js
iframe = document.createElement("iframe");
document.body.appendChild(iframe);
```

### Step 2: Mount Vue instance into the iframe

Now we already have a iframe in the step 1, the only next thing we need to do is mount our Vue instance into it:

```vue
new Vue({
    el: iframe.contentWindow.document.body,
    template: "<div>Hello, World</div>"
})
```

### Put everything together

```html
<script>
iframe = document.createElement("iframe");
document.body.appendChild(iframe);

new Vue({
    el: iframe.contentWindow.document.body,
    template: "<div>Hello, World</div>"
})
</script>
```

## Demo

{{< rawhtml >}}
<div id="article-demo"></div>

<style>
    #article-demo iframe {
        border: 1px solid;
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
    }
</style>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
<script>
iframe = document.createElement("iframe");
document.getElementById('article-demo').appendChild(iframe);

new Vue({
    el: iframe.contentWindow.document.body,
    template: "<div>Hello, World</div>"
})
</script>
{{< /rawhtml >}}

## Conclusion

It's simple right? but it could save you a ton of time. Thank you for reading :)
