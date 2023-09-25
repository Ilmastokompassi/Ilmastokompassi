# Kubernetes / OpenShift Guide

This document describes how to deploy the application to a OpenShfit (Kubernetes fork) cluster for the staging and production environment. 

> **Note**
> Because we are using the OpenShift cluster offered by the University Of Helsinki, this documentation and the configuration files are specific to OpenShift. However, the application can be deployed to any Kubernetes cluster with minor changes to the configuration files.

### Table of contents
- [Kubernetes / OpenShift Guide](#kubernetes--openshift-guide)
    - [Table of contents](#table-of-contents)
    - [Material](#material)
    - [Prerequisites](#prerequisites)
  - [Setup OpenShift CLI](#setup-openshift-cli)
    - [Choosing the environment](#choosing-the-environment)
    - [Login to OpenShift cluster](#login-to-openshift-cluster)
  - [Deploying new version to the production](#deploying-new-version-to-the-production)
  - [Deployment of the application from scratch](#deployment-of-the-application-from-scratch)
    - [Apply the configuration](#apply-the-configuration)
    - [List all objects of the app](#list-all-objects-of-the-app)
    - [Manually trigger redeployment of the pods](#manually-trigger-redeployment-of-the-pods)


### Material
- [OHTU OpenShift guide](https://github.com/HY-TKTL/TKT20007-Ohjelmistotuotantoprojekti/tree/master/openshift)
- https://devopswithkubernetes.com/
- [Kubectl & Kustomize documentation](https://kubectl.docs.kubernetes.io/guides/)
- [UoH OpenShift documentation](https://wiki.helsinki.fi/display/SO/Tike+container+platform)

### Prerequisites

- [Access to UoH's network (OpenVPN)](https://helpdesk.it.helsinki.fi/kirjautuminen-ja-yhteydet/verkkoyhteydet/yhteydet-yliopiston-ulkopuolelta)
- [OpenShift CLI](https://docs.openshift.com/container-platform/3.11/cli_reference/get_started_cli.html)
- [Kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)

## Setup OpenShift CLI

### Choosing the environment
There is two OpenShift clusters available for the project. One for the staging environment and one for the production environment. 
* The staging cluster is gets updated automatically from the `main` branch. Every commit to the `main` branch will trigger a new images to be pushed to Docker Hub with `latest` tag. The staging environment has `ImageStream` with a trigger which will then pull the latest image from Docker Hub and deploy it. 
* The production cluster is updated manually by creating a new release tag. 

### Login to OpenShift cluster

> **Note**
> Accessing the OpenShift cluster requires that you are connected to the University of Helsinki's network. If you are not connected to the network, you can use the [OpenVPN](https://helpdesk.it.helsinki.fi/kirjautuminen-ja-yhteydet/verkkoyhteydet/yhteydet-yliopiston-ulkopuolelta) to connect to the network.

| Environment | OpenShift API URL                              |
| ----------- | ---------------------------------------------- |
| Staging     | https://api.ocp-test-0.k8s.it.helsinki.fi:6443 |
| Production  | https://api.ocp-prod-0.k8s.it.helsinki.fi:6443 |

To login to the staging OpenShift cluster as an example, run the following command:
```bash
oc login https://api.ocp-test-0.k8s.it.helsinki.fi:6443
```

In both environments, the project is called `ohtuprojekti-staging`. To switch to the project, run the following command:
```bash
oc project ohtuprojekti-staging
```

## Deploying new version to the production

The versions to the staging environment are deployed automatically from the `main` branch. However, the production environment is updated manually by creating a new release tag and triggering a rollout of the pods with the new version tag.

To deploy a new version of the application to the production environment, a new release tag needs to be created first. This will trigger the GitHub Actions workflow which will build the application and push the image to Docker Hub. To apply this new image to the production environment, the `Deployment` object needs to be updated to use the new image. First, we need to update the production configuration. This is done with `kustomize edit set image` command in the `kubernetes/production` directory.

For example, to update the production environment to use the images tagged with `v1.0.0`, run the following command:

```bash
cd kubernetes/production
kustomize edit set image ilmastokompassi/frontend:v1.0.0 ilmastokompassi/backend:v1.0.0
```

After that, the changes need to be applied to the cluster with 

```bash
oc apply -k .
```

Now the production environment is updated to use the new images. However, the pods are not yet updated to use the new images. To do that, we need to trigger a rollout of the pods. This can be done with the following command:

```bash
oc rollout restart deploy -l app=ilmastokompassi
```

*After* each version deployment, remember to commit the changes to the `kubernetes/production` directory to the `main` branch. 

## Deployment of the application from scratch

This process will create all the necessary objects to run the application on the OpenShift cluster automatically. 

> **Important**
> This is not needed if the application is already deployed and you just want to deploy a new version of it. Refer to the [Deploying new version to the production](#deploying-new-version-to-the-production) section for that.

### Apply the configuration

> **Important**
> Use `--dry-run=server` flag to test the deployment without actually applying it. This will show what objects would be created from applying the configuration or any potential errors in it.

For example, for the staging deployment which Kustomize configuration is located in `kubernetes/staging` directory, run the following command:

```bash
oc apply -k kubernetes/staging
```

The command will output the objects that were created from the configuration files. 

### List all objects of the app

```bash
oc get all -l app=ilmastokompassi
```

### Manually trigger redeployment of the pods

```bash
oc rollout restart deploy -l app=ilmastokompassi
```