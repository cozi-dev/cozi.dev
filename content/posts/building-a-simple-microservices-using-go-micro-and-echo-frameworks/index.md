---
title: "Building a simple microservices using Go Micro and Echo frameworks"
date: 2020-06-10T21:48:16+07:00
tags: ["go", "microservices", "go-micro", "echo", "framework"]
---

## Introduction

In this article, we will learn how to build a simple microservices using {{< new-tab-link href="https://github.com/micro/go-micro" >}}Go Micro{{< /new-tab-link >}} and {{< new-tab-link href="https://github.com/labstack/echo" >}}Echo{{< /new-tab-link >}} frameworks. And with Go Micro, building a microservices has never been easy than this before.

## Building our first microservices

### Generate services

We will generate two services here: the first one is API gateway and the other one is a simple service to demonstrate calling between our services.

```bash
# gateway api
micro new --namespace=echo.micro --type=api gateway

# baz service
micro new --namespace=echo.micro --type=service baz
```

**Note:** we use a custom namespace here `echo.micro`.

### Writing your first Echo handler

The handler simply calls and gets a response from the `baz` service.

```go
// gateway/handler/hello.go
package handler

import "net/http"

// Hello handler
func Hello(c echo.Context) error {
    bazService := baz.NewBazService("echo.micro.service.baz", client.DefaultClient)
    res, err := bazService.Call(c.Request().Context(), &baz.Request{
        Name: "hello",
    })

    if err != nil {
        return echo.NewHTTPError(http.StatusInternalServerError, err)
    }

    return c.JSON(http.StatusOK, res)
}
```

### Integrate Echo with Go Micro

> Echo is a high performance, extensible, minimalist web framework for Go.

By integrating with Echo, we will have both advantages of Echo and Go Micro.

{{< highlight go "linenos=table,hl_lines=23-35" >}}
package main

import (
    "go-micro-echo/gateway/handler"

    log "github.com/micro/go-micro/v2/logger"
    "github.com/micro/go-micro/v2/web"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    // New Service
    service := web.NewService(
        web.Name("echo.micro.api.gateway"),
        web.Version("latest"),
    )

    // Initialise service
    service.Init()

    // Echo instance
    e := echo.New()

    // Middleware
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    // Routes
    g := e.Group("/api")
    g.GET("/hello", handler.Hello)

    // Register Handler
    service.Handle("/", e)

    // Run service
    if err := service.Run(); err != nil {
        log.Fatal(err)
    }
}
{{< / highlight >}}

In the snippet above, from lines 23 to 35, we init Echo instance and assign to Go Micro service handle. But why?
If you're looking at `service.Handle` method (line 35), the second argument type is `http.Handler` which is an interface:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

And our Echo instance implements `http.Handler` interface.

```go
func (e *Echo) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // ...
}
```

That's why we can use the Echo instance on the Go Micro web service handle method.

### Run our services

```bash
# run baz service
go run baz/main.go

# run gateway service
go run gateway/main.go

# run micro api for namespace echo.micro
micro api --handler=http --namespace=echo.micro
```

And now you can call API to test the result

```bash
curl http://localhost:8080/gateway/hello\?name\=World
{"msg":"Hello World"}
```

{{< resize-image src="go_micro_test.jpg" >}}

## Source code

For more details, please checkout source code for this article at {{< new-tab-link href="https://github.com/cozi-dev/go-micro-echo" >}}GitHub{{< /new-tab-link >}}.

## Conclusion

Now, we have done first step into the microservices world, there are many things we need to do but I hope with this step we can easily continue to explore more knowledge to apply to our real-world projects.