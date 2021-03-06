---
title: "Use Vue dynamic components to build multiple layouts web app"
date: 2021-03-06T15:14:24+07:00
tags: ["vue", "component"]
---

This feature may not be used too much but it's a useful and powerful feature of Vue. Let's take a look :)

## Syntax

We can use the syntax below to declare dynamic components:

```vue
<component :is="dynamicComponent" />

// "dynamicComponent" is your component name
```

Simple, right?

## Setup multiple layouts web app

Your Vue app has multiple layouts, so how to make it easy to switch and develop? Please check out these 3 simple steps below:

### 1. Define your layout components

Imagine you have two layouts: `AuthLayout` and `DashboardLayout`

```vue
// components/AuthLayout.vue
// use this layout for sign in, sign up, forgot password pages

<template>
  <div id="auth">
    <h1>Hello, I'm auth layout</h1>

    <router-view />
  </div>
</template>
```

```vue
// components/DashboardLayout.vue
// use this layout for dashboard pages after user authenticated

<template>
  <div id="dashboard">
    <h1>Hello, I'm dashboard layout</h1>

    <router-view />
  </div>
</template>

<script>
export default {
    mounted() {
        // this is dashboard layout
    }
}
</script>
```

### 2. Update your routers

Add route meta property called "layout" with a value equal to your layout component name

```js
// router/index.js
import VueRouter from 'vue-router'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/sign-in',
            name: 'auth:sign_in',
            meta: {
                layout: 'AuthLayout', // we add new meta layout here to use it later
            },
        },
        {
            path: '/sign-up',
            name: 'auth:sign_up',
            meta: {
                layout: 'AuthLayout', // same here
            },
        },
        {
            path: '/',
            name: 'dashboard:home',
        },
    ]
})

export default router
```

### 3. Update App.vue to use dynamic components

```vue
// App.vue

<template>
  <component :is="layout" />
</template>

<script>
import AuthLayout from "@/components/AuthLayout";
import DashboardLayout from "@/components/DashboardLayout";

export default {
  components: {
    AuthLayout,
    DashboardLayout,
  },
  data() {
    return {
      layout: null,
    };
  },
  watch: {
    $route(to) {
      // set layout by route meta
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout
      } else {
        this.layout = "DashboardLayout" // this is default layout if route meta is not set
      }
    },
  },
};
</script>
```

## Conclution

So we're done! you can now change your web layout by simply change the route meta "layout" property. I hope this post can be useful for you and thanks for reading!

## References

* https://v3.vuejs.org/guide/component-dynamic-async.html