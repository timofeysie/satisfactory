from goose3 import Goose
from transformers import pipeline
import sys

# extract article text
g = Goose()
article = g.extract(url=sys.argv[1])
# print("article:"+str(article))
# g.close()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(article.cleaned_text, min_length=75, max_length=300)

# print(str(summarized))
sys.stdout.flush()

file1 = open('apps/hugging-face/src/article.txt', 'x')
file1.write(str(article))
file1.close()
file2 = open('apps/hugging-face/src/articleSummary.json', 'x')
file2.write(str(summarized))
file2.close()
