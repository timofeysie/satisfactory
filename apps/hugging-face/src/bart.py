
from transformers import pipeline
import sys

# Open and read the article
f = open("apps/hugging-face/src/articleText.txt", "r", encoding="utf8")
to_tokenize = f.read()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(to_tokenize, min_length=75, max_length=300)

# Print summarized text
print(str(summarized))
sys.stdout.flush()

<<<<<<< HEAD
=======
file = open('apps/hugging-face/src/article.json', 'x')
file.write(str(summarized))
file.close()
>>>>>>> HuggingFace
file = open('apps/hugging-face/src/articleSummary.json', 'x')
file.write(str(summarized))
file.close()
