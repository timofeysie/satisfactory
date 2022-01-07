from goose3 import Goose
from transformers import pipeline
import sys


# extract article text
g = Goose()
article = g.extract(url=sys.argv[1])
g.close()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(article.cleaned_text, min_length=75, max_length=300)
print(summarized)
sys.stdout.flush()

# Print summarized text and save file
file = open('apps/hugging-face/src/articleSummary.json', 'x')
file.write(summarized)
file.close()
