---
title: "Prevent multiple Webpack instances lazy loading conflict"
date: 2021-05-03T14:51:48+07:00
tags: ["webpack"]
---

If you have been running multiple webpack instances with lazy loading, you must define the loading chunk function name in your webpack config. Otherwise, your lazy loading module may not be loaded and cause your app error. Let’s check out the config:

**For webpack 4:**

```js
module.exports = {
  //...
  output: {
    //...
    jsonpFunction: 'yourAppJsonpFunction', // define your unique function name here
  },
  //...
}
```

**For webpack 5:**

```js
module.exports = {
  //...
  output: {
    //...
    chunkLoadingGlobal: 'yourAppJsonpFunction', // define your unique function name here
  },
  //...
}
```

Finally, reload your app to apply the changes.

## References
* https://webpack.js.org/configuration/output/#outputchunkloadingglobal