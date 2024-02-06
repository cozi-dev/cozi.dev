---
title: "Serving AWS S3 private content with Golang and AWS SDK for Go v2"
date: 2024-02-05T22:08:46-06:00
tags: ["go", "aws", "s3"]
---

Have you ever wanted to serve private files from your AWS S3 storage to your users, but making the bucket public is not a safe option? In this post, I will show you how to do it using Golang and AWS SDK for Go v2 with a presigned URL, and later, you can integrate it with your own authentication system. Let's dive in!

## Prerequisites

- Go 1.19 or later
- AWS SDK for Go v2
- Private S3 bucket and credentials to access it (atleast `s3:GetObject` permission)

## Steps

### 1. Creating the AWS S3 client

There are two options for creating the AWS S3 client:

**a. Using access key and secret key (not recommended for production)**

```go
func newS3Client() *s3.Client {
    return s3.New(s3.Options{
        BaseEndpoint: aws.String("your_s3_endpoint"), // Replace with your S3 endpoint
        Region: "your_s3_region", // Replace with your S3 region
        Credentials: aws.NewCredentialsCache(
            credentials.NewStaticCredentialsProvider(
                "your_access_key", // Replace with your AWS access key
                "your_secret_key", // Replace with your AWS secret key
                "",
            ),
        ),
    })
}
```

**b. Using IAM role for service account credentials**

```go
func newS3Client() *s3.Client {
    cfg, err := config.LoadDefaultConfig(context.TODO(),
        config.WithRegion("your_s3_region"), // Replace with your S3 region
    )
    if err != nil {
        panic(err)
    }

    return s3.NewFromConfig(cfg)
}
```

### 2. Creating HTTP handler to serve private content using presigned URL

Creating HTTP handler that will handle incoming requests and generate the signed URLs for private S3 content. 
This function serves well for both partial content and full content.

```go
type s3Handler struct {
	s3Client *s3.Client
}

func newS3Handler() *s3Handler {
	return &s3Handler{
		s3Client: newS3Client(),
	}
}

// The servingContent function is the HTTP handler that takes a request, extracts the bucket name, object path from the parameters, 
// generates a signed URL for the private S3 object, and then response file content to client.
func (h *s3Handler) servingContent(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimLeft(r.URL.Path, "/")
	bucketName := strings.Split(path, "/")[0]
	path = strings.Replace(path, bucketName+"/", "", 1)

    // generate presigned URL
	presignClient := s3.NewPresignClient(h.s3Client)
	presignedGetRequest, err := presignClient.PresignGetObject(r.Context(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(path),
		Range:  aws.String(r.Header.Get("Range")),
	})
	if err != nil {
		log.Printf("failed to presign request: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// new http reqest
	req, err := http.NewRequest(http.MethodGet, presignedGetRequest.URL, nil)
	if err != nil {
		log.Printf("failed to create request: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// set request headers
	for key, values := range r.Header {
		for _, value := range values {
			// ignore header: If-Modified-Since, If-None-Match to prevent status 304
			if key == "If-Modified-Since" || key == "If-None-Match" {
				continue
			}

			req.Header.Add(key, value)
		}
	}
	// set header no cache to prevent status 304
	req.Header.Set("Cache-Control", "no-cache")
	req.Header.Set("Pragma", "no-cache")

	httpClient := http.Client{}
	resp, err := httpClient.Do(req)
	if err != nil {
		log.Printf("failed to get response: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// check status code
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Printf("failed to get response: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// set response headers
	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	// check if the response contains partial content
    // for streaming content like video, audio, etc.
	if resp.Header.Get("Content-Range") != "" {
		w.Header().Set("Content-Length", fmt.Sprintf("%d", resp.ContentLength))
		w.Header().Set("Content-Type", "application/octet-stream")
		w.WriteHeader(http.StatusPartialContent)
	}

	// write response body to client
	io.Copy(w, resp.Body)
}
```

### 3. Running the HTTP Server

Finally, we need to start the HTTP server and register the handler.

```go
func main() {
    // register the handler
	s3Handler := newS3Handler()
	http.HandleFunc("/", s3Handler.servingContent)

    // start the server
	port := ":8080"
	fmt.Println("Server start at", port)
	http.ListenAndServe(port, nil)
}
```

## Putting it all together

Here is the complete code:

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	// register the handler
	s3Handler := newS3Handler()
	http.HandleFunc("/", s3Handler.servingContent)

	// start the server
	port := ":8080"
	fmt.Println("Server start at", port)
	http.ListenAndServe(port, nil)
}

func newS3Client() *s3.Client {
	return s3.New(s3.Options{
		BaseEndpoint: aws.String("your_s3_endpoint"), // Replace with your S3 endpoint
		Region:       "your_s3_region",               // Replace with your S3 region
		Credentials: aws.NewCredentialsCache(
			credentials.NewStaticCredentialsProvider(
				"your_access_key", // Replace with your AWS access key
				"your_secret_key", // Replace with your AWS secret key
				"",
			),
		),
	})
}

type s3Handler struct {
	s3Client *s3.Client
}

func newS3Handler() *s3Handler {
	return &s3Handler{
		s3Client: newS3Client(),
	}
}

// The servingContent function is the HTTP handler that takes a request, extracts the bucket name, object path from the parameters,
// generates a signed URL for the private S3 object, and then response file content to client.
func (h *s3Handler) servingContent(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimLeft(r.URL.Path, "/")
	bucketName := strings.Split(path, "/")[0]
	path = strings.Replace(path, bucketName+"/", "", 1)

	// generate presigned URL
	presignClient := s3.NewPresignClient(h.s3Client)
	presignedGetRequest, err := presignClient.PresignGetObject(r.Context(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(path),
		Range:  aws.String(r.Header.Get("Range")),
	})
	if err != nil {
		log.Printf("failed to presign request: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// new http reqest
	req, err := http.NewRequest(http.MethodGet, presignedGetRequest.URL, nil)
	if err != nil {
		log.Printf("failed to create request: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// set request headers
	for key, values := range r.Header {
		for _, value := range values {
			// ignore header: If-Modified-Since, If-None-Match to prevent status 304
			if key == "If-Modified-Since" || key == "If-None-Match" {
				continue
			}

			req.Header.Add(key, value)
		}
	}
	// set header no cache to prevent status 304
	req.Header.Set("Cache-Control", "no-cache")
	req.Header.Set("Pragma", "no-cache")

	httpClient := http.Client{}
	resp, err := httpClient.Do(req)
	if err != nil {
		log.Printf("failed to get response: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// check status code
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Printf("failed to get response: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// set response headers
	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	// check if the response contains partial content
	// for streaming content like video, audio, etc.
	if resp.Header.Get("Content-Range") != "" {
		w.Header().Set("Content-Length", fmt.Sprintf("%d", resp.ContentLength))
		w.Header().Set("Content-Type", "application/octet-stream")
		w.WriteHeader(http.StatusPartialContent)
	}

	// write response body to client
	io.Copy(w, resp.Body)
}
```

## Conclusion

In this post, we have learned how to serve private content from AWS S3 using Golang and AWS SDK for Go v2. We have created an HTTP handler that generates a presigned URL for the private S3 object and then serves the file content to the client. This approach is secure and efficient, and it allows you to serve private content from your S3 storage to your users without making the bucket public.

Furthermore, you can modify the `servingContent` function to fit your needs, such as adding authentication, authorization, or caching. For example, you can add authentication middleware to ensure that only authorized users can access the private content.

I hope you find this post helpful. Please let me know in the comment section below if you have any questions.
