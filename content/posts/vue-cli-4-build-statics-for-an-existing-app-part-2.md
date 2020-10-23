---
title: "Vue CLI 4 build statics for an existing app - Part 2"
date: 2020-10-23T16:39:14+07:00
tags: ["vue", "cli"]
---

In the [previous part](/posts/vue-cli-4-build-statics-for-an-existing-app/), we have updated Vue CLI config to output static files that we can manually inject to anywhere. And in this part, we will optimize the config to output only one main entry script combines with hot reload.

## Vue CLI config file

It will look very simple like this:

{{< highlight js "linenos=table" >}}
module.exports = {
    filenameHashing: false, // main entry js file without hashing name
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        extract: false,
    },
    chainWebpack: config => {
        config.plugins.delete(`html`)
        config.plugins.delete(`preload`)
        config.plugins.delete(`prefetch`)
    },
    configureWebpack: {
        optimization: {
            splitChunks: false // this ensure we don't need to inject vendor js file
        }
    },
}
{{< / highlight >}}

Next, run `npm run serve` to serve static files on the dev environment at this address `http://localhost:8080`, then you can inject `http://localhost:8080/js/app.js` into your project without worrying about injecting other assets like images, css.

If you run `npm run build` to build statics for production, it will output something like this:

```bash
File                                Size                                                 Gzipped

dist/js/app.js               1325.40 KiB                                          332.74 KiB
dist/js/chunk-2c152118.js    111.30 KiB                                           31.23 KiB
dist/js/chunk-79e4a602.js    109.19 KiB                                           30.51 KiB
```

You just need to include `app.js` file only

## Conclusion

Thanks, Vue CLI, with a simple config like above, we can quickly start a new project with powerful feature like hot reload. And if you have any questions, please leave a comment below :)