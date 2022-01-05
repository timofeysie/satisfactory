from goose3 import Goose

g = Goose()
url = 'https://www.mylondon.news/news/celebs/bbc-sound-music-christopher-plummers-22600079'
article = g.extract(url=url)
print('', article.title)
print(article.cleaned_text)
