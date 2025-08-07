# Machine Learning Background

This document aims to provide an overall background of the development of the ML used in this project.

## Terms

- CNN Convolutional Neural Networks (CNN) for dataset contains images or pixels.
- RNN Recurrent Neural Networks (RNN) train a network on a sequence of inputs.  (replaced LSTM)
- LSTM Long Short-Term Memory (LSTM) If goal is to recognize patterns in sequences of data
- GAN (Generative Adversarial Nets)
- DCGAN (Deep Convolutional Generative Adversarial Networks)
- NLP (Natural language Processing)
- BERT (Bidirectional Encoder Representations from Transformers)
- BART (Bidirectional and Auto-Regressive Transformers)
- GPT - Generative Pre-trained Transformer
- MW-GAN: Multi-Warping GAN for Caricature Generation with Multi-Style Geometric Exaggeration
- https://arxiv.org/abs/2001.01870
- ML inference - the process of running data points into a machine learning model to calculate an output such as a single numerical score. This process is also referred to as "operationalizing a machine learning model" or "putting a machine learning model into production."
- Transformers - neural network that learns the context of sequential data and generates new data out of it.
- TTD-DR - Test-Time Diffusion Deep Researcher

## My history with ML

I was part of the the shift from LSTM to RNN to Transformers like GPT for NLP problems.
I used LSTM on Papaerspace at the beginning of this project to train a model for each Google trend I wanted to produce content for.
This process led to output more poetic than accurate, and with only about 6000 lines of text for training, that was probably the reason.

Eventually Papaerspace deprecated the service I was using to upload the text for model training, but I didn't feel like the amount of content I could scrape was enough to make it worthwile.  It would also mean there would be a cost for each post.

Later I moved on to just using pretrained models with BART which I believe is in the current implementation.

## Transformers

Transformers were inspired by the encoder-decoder architecture found in RNNs. However, Instead of using recurrence, the Transformer model is completely based on the Attention mechanism.

However, the recurrent process did not make use of modern GPUs and had other limitations.

### Encoders & decoders

The encoder takes in our input and outputs a matrix representation of that input. For instance, the English sentence “How are you?”
The decoder takes in that encoded representation and iteratively generates an output. In our example, the translated sentence “¿Cómo estás?”
