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

This summarizer involves multiple steps:

1. Importing Pipeline functionality for a variety of pretrained models.
2. Read an article stored in some text file.
3. Initializing and configuring the summarization pipeline, and generating the summary using BART.
4. Printing the summarized text.

Make the summary bigger by setting the value for min_length.

## Call bart.py from Nest

## Use goose3 to extract the body of a news article

pip install goose-extractor

pip install goose3

```txt
> python apps\hugging-face\src\goose.py
Building prefix dict from the default dictionary ...
Dumping model to file cache C:\Users\timof\AppData\Local\Temp\jieba.cache
Loading model cost 0.936 seconds.
Prefix dict has been built successfully.
 Christopher Plummer's death after head blow and Julie Andrews' moving tribute

```

That's a nice one liner, but the bbc article is longer.  That first line is just the title.  The blank line is where the content should be, but it isn't:

```py
print('', article.title)
print(article.cleaned_text)
```

I was looking at [this link](https://www.codestudyblog.com/sfb20b2/0305161912.html).  It has another example which extracts links from the page, which works fine.

The sample code is actually setup to work for Chinese:

```py
from goose3.text import StopWordsChinese
g = Goose({'stopwords_class': StopWordsChinese})
```

If you remove the Chinese stop words, then the article body comes out fine.

Here is the result for the BBC article for the Sound of Music: https://www.mylondon.news/news/celebs/bbc-sound-music-christopher-plummers-22600079

```txt
 Christopher Plummer's death after head blow and Julie Andrews' moving tribute
The Sound of Music is on BBC One today (January 1) in what is surely the perfect way to celebrate the New Year.

The iconic 1965 film starred Julie Andrews and the late Christopher Plummer who died at the age of 91 in February last year.

Christopher Plummer had an amazing career and made his big break with The Sound Of Music where he and Julie evaded the Nazi's in 1940's Austria.

READ MORE: The Bill star Billy Murray's co-star daughter and 'bigger than Brad Pitt' role

Away from the mountains, Christopher also featured in Malcolm X, Knives Out and was even a villainous Klingon in the Star Trek movie franchise.

Sadly the Oscar winner died peacefully at his home in Connecticut, USA on February 5, 2021 with his wife Elaine Taylor by his side.   

His wife said the cause of his death was a "blow to the head as a result of a fall", according to the New York Times.

Following his death, his co-star Julie Andrews who plays Maria von Trapp paid poignant tribute to his memory.

Her words spoke about her "cherished friend" as she said she "treasures the memories" of their work together.

"The world has lost a consummate actor today and I have lost a cherished friend,” she told PA.

At MyLondon, we want to make sure you get the latest and greatest from across the capital. And one way you can do that is by getting the best news, reviews and features from wherever you are straight to your inbox with our free email newsletters. We have seven newsletters you can currently sign up for - including a different one for each part of London, as well as an EastEnders one for all the gossip from Albert Square, and a London Underground one to keep you up to date on the latest transport news. The local newsletters go out twice a day and send the latest stories straight to your inbox. From community stories and news covering every borough of London to celebrity and lifestyle stories, we'll make sure you get the very best every day. To sign up to any of our newsletters, simply follow this link and select the newsletter that's right for you. And to really customise your news experience on the go, you can download our top-rated free apps for iPhone and Android. Find out more here.

"I treasure the memories of our work together and all the humour and fun we shared through the years.

"My heart and condolences go out to his lovely wife Elaine and his daughter Amanda."

The Sound of Music airs on BBC One at 2.20pm today (January 1, 2022).

Do you want the latest crime, sport, or breaking news in London straight to your inbox? Tailor your needs to suit you here.
```

Not really happy about the last line slipping in there, but it's good enough to use.  Now, run that through BART and see what the summary looks like.

[{'summary_text': ' The Sound of Music is on BBC One at 2.20pm today (January 1, 2022) Christopher Plummer died at the age of 91 in February last year . The Oscar winner died peacefully at his home in Connecticut, USA on February 5, 2021 . His wife said the cause of his death was a "blow to the head as a result of a fall"'}]

### Another anomaly

This url: https://klewtv.com/news/entertainment/tiger-king-joe-exotic-oklahoma-city-resentencing-carole-baskin-joseph-maldonado-passage-prostate-cancer-wynnwood-zoo-netflix

Returns this summary:

CNN.com will feature iReporter photos in a weekly Travel Snapshots gallery. Please submit your best shots of our featured destinations for next week. Visit CNN iReport.com/Travel next Wednesday for a new gallery of snapshots. Visit www.dailyimpact.com for a gallery next week for snapshots of places to go next week in the gallery.com. Submit photos of your favorite destinations to see next week's featured destinations.

### The Tom Brady anomaly

bart.controller.findOne: got id <https://www.fox13news.com/sports/tom-brady-announces-hes-coming-out-of-retirement>
bart.service.loadSummaryById: <https://www.fox13news.com/sports/tom-brady-announces-hes-coming-out-of-retirement>
loadSummaryById.loadSummary [{'summary_text': ' Tom Brady announced Sunday that he\'s coming out retirement and will return for his 23rd season to the NFL . The seven-time Super Bowl champion made the announcement on Twitter . ESPN first reported Brady�s retirement in January, citing unidentified sources . Last month, it was reported that Brady will play himself in the new film called "80 for Brady" The movie tells the story of four friends and Patriots fans who take a road trip to watch Brady and the Pats battle the Atlanta Falcons in Super Bowl LI in 2017 .'}]

All that showed up in the description was this:P

The movie tells the story of four friends and Patriots fans who take a road trip to watch Brady and the Pats battle the Atlanta Falcons in Super Bowl LI in 2017.

This indicates that we can't rely on a " mark to start the section.
