---
title: "Vue CLI 4 build statics for an existing app"
date: 2020-05-30T09:24:20+07:00
tags: ["vue", "vue-cli"]
---

## Introduction
By default, Vue CLI build target is `App` which means your static will auto inject to a static `index.html` file. If you want to manual inject static to an existing app like Django, Laravel, etc then you may want to remove webpack html plugin.

Before going further, you can check your Vue CLI version by this command:

```bash
vue --version
```

## Modify Vue CLI config file

Navigate to your Vue CLI project root directory and looking for `vue.config.js` file or create one if it does not exist, modify it and it will look like this:

{{< highlight js "linenos=table" >}}
const pages = {
  index: 'src/pages/index.ts', // I use typescript here but you can change it to js too
}

module.exports = {
  publicPath: '/static/', // change it to your static path
  pages,
  // disable hashes in filenames
  filenameHashing: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    // delete HTML related webpack plugins
    Object.keys(pages).forEach(key => {
      config.plugins.delete(`html-${key}`)
      config.plugins.delete(`preload-${key}`)
      config.plugins.delete(`prefetch-${key}`)
    })
  },
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  },
  css: {
    // extract css to files
    extract: true
  }
}
{{< / highlight >}}

Next, update your `package.json` file, change `serve` command to `vue-cli-service build --watch --mode development` and run `npm run serve` to see the result:

```bash
File                  Size                       Gzipped

dist/js/index.js      1029.51 KiB                216.73 KiB
dist/css/index.css    236.82 KiB                 28.87 KiB
```

That's it, you're ready to create an incoming awesome app :)\
In the next article, I will try to modify Vue CLI to auto inject CSS files without doing it manually, maybe combine without hot reload too.

[Updated] Here is the [part 2](/posts/vue-cli-4-build-statics-for-an-existing-app-part-2/) with simple configuration and hot reload.