from transformers import pipeline
class HelloFactory:
    def __init__(self, **args):
        for key, value in args.items():
            setattr(self, key, 'Start {}'.format(value))

if __name__ == '__main__':
    hello = HelloFactory(application="hugging-face", user="Human")
    print(hello.application)

# Open and read the article
f = open("apps/hugging-face/src/article.txt", "r", encoding="utf8")
to_tokenize = f.read()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(to_tokenize, min_length=75, max_length=300)

# Print summarized text
print(summarized)
