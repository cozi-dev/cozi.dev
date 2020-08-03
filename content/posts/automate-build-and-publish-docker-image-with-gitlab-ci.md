---
title: "Automate build and publish Docker Image with GitLab CI"
date: 2020-08-02T08:29:24+07:00
tags: ["docker", "gitlab", "cicd"]
---

If you're using GitLab then you have a free container registry for your projects. Do you want to repeat the process of building and publishing a docker image every day when you have GitLab built-in CI/CD too? The answer definitely is "no", so let's get started :)

## Your .gitlab-ci.yml

We need to use Docker-in-Docker to reach our approaches, and your `.gitlab-ci.yml` might look like this:


```yml
stages:
  - build

build:
  stage: build
  image: docker:19.03.11
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    DOCKER_IMAGE: <my-docker-image>
  services:
    - docker:19.03.11-dind
  before_script:
    - docker login -u <username> -p <deploy_token> $CI_REGISTRY
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $IMAGE
  only:
    - master
```

You can get `<username>` and `<deploy_token>` by create a GitLab Deploy Token follow <a href="https://docs.gitlab.com/ee/user/project/deploy_tokens/#creating-a-deploy-token" target="_blank">this tutorial</a>.

**NOTE:** If you too lazy for create GitLab environment variables to secure your CI file for this command:  

```bash
docker login -u <username> -p <deploy_token> $CI_REGISTRY
```

You can create a user named with `gitlab-deploy-token` then the username and token of the Deploy Token will be automatically exposed to the CI/CD jobs as environment variables. And you can replace the command above with this command:

```bash
docker login -u $CI_DEPLOY_USER -p $CI_DEPLOY_PASSWORD $CI_REGISTRY
```

## Conclusion

Now we have our simple CI file that helps us automate boring repeat processes. And you can customize or improve it base on your needs.

## References

* https://docs.gitlab.com/ee/ci/docker/using_docker_build.html
* https://docs.gitlab.com/ee/user/project/deploy_tokens/
