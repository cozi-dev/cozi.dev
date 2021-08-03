---
title: "Building Golang Docker Image For Production"
date: 2021-08-03T10:19:05+07:00
tags: ["docker", "golang"]
---

Today, we have modern applications and modern systems to manage and scale our containers. To make our deployment smooth and fast you can not just building an image without care about its size.\
For example, building a normal Golang image will have around 1GB in size. It's pretty much huge, so you will lose a bunch of time waiting for it builds (even your CI), your server needs more time to pull the image to deploy the new feature to users, ...\
We need to find a solution! Right, we can do it by using the base Golang alpine image and Docker multi-stage builds. Let's check the example `Dockerfile` below:

```docker
# stage 1: building application binary file
FROM golang:1.16-alpine as build

WORKDIR /app

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

COPY . .

RUN go build -mod vendor -o main main.go

# stage 2: copy only the application binary file and necessary files to the alpine container
FROM alpine:3.12
RUN apk --update add ca-certificates

WORKDIR /app

COPY --from=build /app/main .

# run the service on container startup.
CMD ["/app/main"]
```

With the Dockerfile above, I ended up with a 26MB image and saved a lot of money without upgrade SSD for my small server, haha :D

## Reference
* https://docs.docker.com/develop/develop-images/multistage-build/