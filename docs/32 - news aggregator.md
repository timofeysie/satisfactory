# News Data Pipeline

## Build a Serverless News Data Pipeline using ML on AWS Cloud

[Here is the article](https://www.kdnuggets.com/2021/11/build-serverless-news-data-pipeline-ml-aws-cloud.html)

It might take some time.  The first step is already vague: *To grant our functions access to all the resources it needs, we need to set up IAM role. This role assigns our function permissions to use other resources in the cloud, such as DynamoDB, Sagemaker, CloudWatch, and SNS.*

But on the AWS page for this, it says: *The wizard has slightly different steps depending on whether you're creating a role for an AWS service, for an AWS account, or for a federated user.*

With some Topics

```txt
Creating a role to delegate permissions to an IAM user
Creating a role to delegate permissions to an AWS service
Creating a role for a third-party Identity Provider (federation)
```

So to grant functions access to resources, what type is that?

Also, on login, we get this choice:

1. Root user: Account owner that performs tasks requiring unrestricted access.
2. IAM user: User within an account that performs daily tasks.

It seems like we want to login as root to create #2.  All we have to go off is a screenshot with permission policies.

It's a super high level article, so on further inspection, I'm having second thoughts about attempting it in my current virtually beginner status.

What attracted me to the article in the first place was this: *We shouldn't store full text due to copyright*

And then a comment in the code: *Create a summary using our HuggingFace text summary model*

If this is what we want right now, we can find another article that focuses on just using the HuggingFace text summary model.

## HuggingFace text summary model

https://www.machinecurve.com/index.php/2020/12/21/easy-text-summarization-with-huggingface-transformers-and-machine-learning/

Transformers models, which learn to interweave the importance of tokens by means of a mechanism called self-attention and without recurrent segments, allow us to train larger models without all the problems of recurrent neural networks.

```shell
pip install transformers
```

Before this, we might want to setup a Python library in this project, however that is done.

## NxPy: Nx Python plugin

https://github.com/eulerrapp/nx-python

## extract the full text of the article

Another point from the initial article was this: *to extract the full text of the article... libraries such as goose3 solve this problem by applying ML methods to extract the body of the page.*
