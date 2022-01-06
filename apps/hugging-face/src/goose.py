from goose3 import Goose
import sys

g = Goose()
article = g.extract(url=sys.argv[1])
print(article.cleaned_text)
g.close()

# send back to node
sys.stdout.flush()

file = open('apps/hugging-face/src/articleBody.txt', 'x')
file.write(article.cleaned_text)
file.close()
