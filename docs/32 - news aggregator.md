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

Before this, we might want to setup a Python library in this project, however that is done.  OK, used nx-python for that (see below section).

```txt
> python apps\hugging-face\src\hello.py
Hello hugging-face
No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)
Downloading: 100%|██████████████████████████████████████████████████████████████| 1.76k/1.76k [00:00<00:00, 989kB/s]
Downloading: 100%|█████████████████████████████████████████████████████████████| 1.14G/1.14G [06:32<00:00, 3.12MB/s]
Downloading: 100%|████████████████████████████████████████████████████████████████████████████████| 26.0/26.0 [00:00<00:00, 1.64kB/s]
Downloading: 100%|█████████████████████████████████████████████████████████████████████████████████| 878k/878k [00:01<00:00, 500kB/s]
Downloading: 100%|█████████████████████████████████████████████████████████████████████████████████| 446k/446k [00:01<00:00, 321kB/s]
Token indices sequence length is longer than the specified maximum sequence length for this model (13421 > 1024). Running this sequence through the model will result in indexing errors
Traceback (most recent call last):
  File "C:\Users\timof\repos\timofeysie\satisfactory\apps\hugging-face\src\hello.py", line 19, in <module>
    summarized = summarizer(to_tokenize, min_length=75, max_length=300)
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\transformers\pipelines\text2text_generation.py", line 
225, in __call__
    return super().__call__(*args, **kwargs)
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\transformers\pipelines\text...  
    return F.embedding(
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\torch\nn\functional.py", line 2043, in embedding      
    return torch.embedding(weight, input, padding_idx, scale_grad_by_freq, sparse)
IndexError: index out of range in self
```

Reducing the lines in the input file worked:

No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)
[{
  'summary_text': 
  'John Madden and Pat Summerall spent 22 seasons calling games together at CBS and Fox . The retired head coach and placekicker called their final game together at Fox in February 2002 . Summerall and Madden called eight Super Bowls together, a stint which began with Joe Montana and ended with Tom Brady . Madden ended his broadcasting career working with another iconic play-by-play announcer: Al Michaels .'
}]

Sweet.  Now to understand what was just accomplished.

### Transformers

Introduced by Vaswani in 2017.

A Transformer is a machine learning architecture that combines an encoder with a decoder and jointly learns them, allowing us to convert input sequences (e.g. phrases) into some intermediate format before we convert it back into human-understandable format.

The Bidirectional Encoder Representations from Transformers (BERT) by Devlin et al. (2018)

BERT-like encoder and GPT-like decoder

BART - Bidirectional and Auto-Regressive Transformers

### maximum sequence length for this model 1024

How to automatically determine sequence length?  Maybe this is an issue with only the default transformer.

## NxPy: Nx Python plugin

https://github.com/eulerrapp/nx-python

npm i @nx-python/nx-python --save-dev

nx g @nx-python/nx-python:app hugging-face

apps\hugging-face\src\hello.py

## extract the full text of the article

Another point from the initial article was this: *to extract the full text of the article... libraries such as goose3 solve this problem by applying ML methods to extract the body of the page.*

## Pre-trained summarizer with HuggingFace Transformers


