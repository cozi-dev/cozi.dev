---
title: "Debugging Go http server with VS Code"
date: 2020-06-28T22:56:42+07:00
tags: ["debug", "go", "vscode"]
---

Like the title said, in this article we will do debugging go application with {{< new-tab-link href="https://code.visualstudio.com/" >}}VS Code{{</ new-tab-link >}} and {{< new-tab-link href="https://marketplace.visualstudio.com/items?itemName=golang.go" >}}Go extension{{< /new-tab-link >}}.

## Setup simple application

We will create a simple http server that says hello

```go
// main.go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", helloServer)
    http.ListenAndServe(":8080", nil)
}

func helloServer(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Path[1:]
    fmt.Fprintf(w, "Hello, %s!", name)
}
```

## Debugging

For example, you may want to debug the value of the `name` variable from the application above then we have two options here to debug our http server.

### Option 1: Debugging with test

#### Step 1: Let's write our test

```go
// main_test.go
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func Test_helloServer(t *testing.T) {
    request, _ := http.NewRequest(http.MethodGet, "/Foo", nil)
    response := httptest.NewRecorder()

    helloServer(response, request)

    got := response.Body.String()
    want := "Hello, Foo!"
    if got != want {
        t.Errorf("got %q, want %q", got, want)
    }
}

```

#### Step 2: Add breakpoint
Now we have our test for `helloServer`, next step we need to add a breakpoint right after this line `name := r.URL.Path[1:]` by click on the left of expect line number or move the pointer to the expect line number and press `F9` to toggle a breakpoint.

{{< resize-image src="add_breakpoint.jpg" >}}

#### Step 3: Debug test
Finally, click on `debug test` to see the result:

{{< resize-image src="debug_test.jpg" >}}

Here, we can see the value of the `name` variable is `Foo` in the left panel or hover mouse on the `name` variable

{{< resize-image src="debug_result.jpg" >}}

### Option 2: Debug with http request using dlv

#### Step 1: Install dlv

Open the Command Palette (`Ctrl+Shift+P` or `Command+Shift+P`), select `Go: Install/Update Tools`, and select `dlv`

#### Step 2: Add launch configuration

Create `.vscode/launch.json` in your root project folder and put this content into it

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${fileDirname}",
            "env": {},
            "args": []
        }
    ]
}
```

**Note:** If your `main.go` file inside sub folder like `cmd/api/main.go`, you may want add this config to `launch.json` file to set current working directory to root project folder: `"cwd": "${workspaceRoot}"`

#### Step 3: Add breakpoint

This step is the same as add breakpoint like [Option 1](#step-2-add-breakpoint)

#### Step 4: Run and Debug

Open the `main.go` file and press `F5` and you ready to "Go" :) \
Next, open your favorite terminal and enter `curl localhost:8080/Baz` for example. Now you can see the debug result:

{{< resize-image src="http_debug_result.jpg" >}}

## Source code

You can find source code for this article at {{< new-tab-link href="https://github.com/cozi-dev/go-debugging" >}}GitHub{{</ new-tab-link >}}.

## Conclusion

Above are two debug options for Go using VS Code which is very useful. For me, I prefer to cover as many tests as possible (Option 1), but when I need to debug a full flow of a request then Option 2 will be the best choice. And you? Which method do you use for debugging Go code?