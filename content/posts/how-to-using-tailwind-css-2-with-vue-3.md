---
title: "How to using Tailwind CSS 2 with Vue 3"
date: 2020-12-30T12:28:05+07:00
tags: ["tailwind", "css", "vue"]
---

I used to choose <a href="https://bulma.io/" target="_blank">Bulma</a> as CSS framework for my personal projects. Recently, I found out that <a target="_blank" href="https://tailwindcss.com/">Tailwind CSS v2</a> interesting to try. Let's begin

# Init Vue 3 project

For now, I still stick with <a target="_blank" href="https://cli.vuejs.org">Vue CLI</a> to create new Vue project, as it is the best option for me. But you can also try <a target="_blank" href="https://github.com/vitejs/vite">Vite</a> too, it's fast.

Enter the command below to create a new project, you will be prompted to pick a preset. Then you can choose your own configurations:

```bash
vue create my-app
```

# Install Tailwind CSS

Install Tailwind and its peer-dependencies:

```bash
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

Add `tailwind.config.js` Tailwind configuration file at the root of your project:

```javascript
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './src/**/*.{ts,js,vue}',
        './public/*.html'
    ],
    darkMode: 'class', // or 'media' or false
    theme: {
        colors: colors,
        extend: {
            colors: {
                'light-blue': colors.lightBlue
            },
            spacing: {
                'xl': '28rem',
                '2xl': '32rem',
                '3xl': '36rem',
                'full': '100%'
            }
        },
    },
    variants: {},
    plugins: [],
}
```

**Note:** 
* Please don't forget to modify `purge` option with the paths to all of your files that contain Tailwind CSS classes to remove unused styles on production, because Tailwind CSS file size is extremely large if you include all of the library.
* By default, Tailwind does not include all of the colors, so I've used `extend` option to add `light-blue` color, and more `spacing`. You can customize anything you want.

Next, add `postcss.config.js` file at the root of your project, too:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Finally, add `tailwind.css` file to your project assets folder at the address like this: `./src/assets/css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And ensure it is being imported in your `./src/main.js` file:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'

createApp(App).mount('#app')
```

**Note:** Don't try to import Tailwind in your `scss` file because it may crash your computer. As I said Tailwind file size is extremely large, and when your SCSS compiles to CSS file, it will take huge resources of your computer.

## Trick

Use Tailwind `@apply` directive to reducing repetition of elements that have same classes. For example:

```vue
// without using `@apply` directive
// ./src/components/HelloWord.vue
<template>
    <button class="shadow rounded font-bold py-2 px-4 focus:outline-none bg-green-600 hover:bg-green-700 text-white">Confirm</button>
    <button class="shadow rounded font-bold py-2 px-4 focus:outline-none bg-gray-500 hover:bg-gray-600 text-white">Cancel</button>
</template>
```

```vue
// with using `@apply` directive
// ./src/components/HelloWord.vue
<template>
    <button class="btn is-primary">Confirm</button>
    <button class="btn is-dark">Cancel</button>
</template>

<style lang="scss">
    .btn {
        @apply shadow rounded font-bold py-2 px-4 focus:outline-none;

        &.is-primary {
            @apply bg-green-600 hover:bg-green-700 text-white;
        }

        &.is-dark {
            @apply bg-gray-500 hover:bg-gray-600 text-white;
        }
    }
</style>
```

## Conclusion

With those simple steps above, Tailwind CSS is ready for your Vue project. You might not need to write a single line of CSS to build a beautiful layout :) Enjoy!

## Reference

* https://cli.vuejs.org/guide/creating-a-project.html#vue-create
* https://tailwindcss.com/docs/guides/vue-3-vite
* https://tailwindcss.com/docs/functions-and-directives#apply



