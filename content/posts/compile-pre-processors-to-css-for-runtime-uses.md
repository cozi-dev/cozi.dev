---
title: "Compile pre-processors to CSS for runtime uses"
date: 2021-03-14T22:47:14+07:00
tags: ["css", "pre-processors", "javascript", "webpack"]
---

In some cases, you might just want to compile your pre-processors styles like SCSS, LESS to CSS and assign it to a variable then do something with it at runtime. With these simple steps, you can make it possible:

First, let's install <a href="https://github.com/webpack-contrib/raw-loader" target="_blank">raw-loader</a>:

```bash
npm i -D raw-loader
```

Finally, import your pre-processor file and compile it to CSS string:

```bash
# we use this structure:
# import cssString from "!raw-loader!{loader}!{path_to_your_file}";
# check out example below for scss file
# you can do the same for less file with less-loader
import cssString from "!raw-loader!sass-loader!./assets/scss/app.scss";
console.log(cssString);

# you can even add more loader like postcss
import cssString from "!raw-loader!postcss-loader!sass-loader!./assets/scss/app.scss";
console.log(cssString);
```

Done, I hope you enjoy :)