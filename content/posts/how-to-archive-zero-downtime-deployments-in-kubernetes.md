---
title: "How to archive zero downtime deployments in Kubernetes"
date: 2020-11-20T05:21:53+07:00
tags: ["k8s", "zero downtime", "graceful shutdown", "deployment"]
---

It was worse when you need to wait until late at night to deploy your app in production because you scare to break users' experience when the short downtime happens after deployment.\
You deserve a good sleep after a long working day, so let find out the solution for this.

For normal application, we just need to do 3 simple steps:

* Define readiness probe
* Add container lifecycle preStop hook
* Listen to SIGTERM signal

### Define readiness probe

kubelet sends requests after your container running, but maybe your application is not ready to receive requests.
How to tell kubelet to wait until your application ready or stop sending requests if your application shutdown.
The answer is <a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes" target="_blank">readiness probe</a>, let view this example config for your deployment:

```yaml
...
containers:
  - name: my_web_app
    readinessProbe:
      httpGet:
        path: /health # your health check api
        port: 8080 # your container port
      initialDelaySeconds: 5 # delay 5s before send first request to check
      periodSeconds: 2 # send check request every 2s
      successThreshold: 1 # success when the response has a status code greater than or equal to 200 and less than 400
      failureThreshold: 1 # otherwise failure
...
```

### Add container lifecycle preStop hook

You should wait 15 seconds to let kubelet update routing to send requests to another pod.
By default, k8s wait 30 seconds before force killing your app, so you should use `preStop` hook with `terminationGracePeriodSeconds` options:

```yaml
...
terminationGracePeriodSeconds: 60 # wait 60 seconds before force killing your app, increase it if you need more time
containers:
  - name: my_web_app
    ...
    lifecycle:
      preStop:
        exec:
          command: ["/bin/sh", "-c", "sleep 15"] # sleep 15 seconds before sending SIGTERM to container and let kubelet update routing
...
```

### Listen to SIGTERM signal

Finally, listen to the SIGTERM signal to finish current requests, shutdown your app and close database connection, etc.
Here is a golang example:

```go
...
quit := make(chan os.Signal)
signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

<-quit // blocks util receive signal
// finish current requests
// close DB connection
// shutdown app
```

## How to test?

You can install HTTP testing tool like <a target="_blank" href="https://github.com/tsenart/vegeta">vegeta</a>,
alongs with <a target="_blank" href="https://github.com/stedolan/jq">jq</a> to format the report in the terminal

Example command:

```bash
jq -ncM 'while(true; .+1) | {method: "GET", url: "http://localhost:30000?delay=5"}' | \
  vegeta attack -rate=200/s -lazy -format=json -duration=30s | \
  tee results.bin | \
  vegeta report
```

Then trigger force k8s update `my_web_app` deployment by this command:

```bash
kubectl patch deployment my_web_app -p \
  "{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"date\":\"`date +'%s'`\"}}}}}"
```

You may got this report:

```bash
Requests      [total, rate, throughput]         3000, 100.03, 99.05
Duration      [total, attack, wait]             30.287s, 29.99s, 297.897ms
Latencies     [min, mean, 50, 90, 95, 99, max]  198.877ms, 363.615ms, 309.861ms, 381.551ms, 802.951ms, 1.988s, 2.692s
Bytes In      [total, mean]                     71244000, 23748.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:3000
Error Set:
```

## Conclusions

I hope you find something helpful to make your daily deployment task easier.

## References

* https://learnk8s.io/graceful-shutdown