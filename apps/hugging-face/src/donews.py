from goose3 import Goose
from goose3.text import StopWordsChinese
from bs4 import BeautifulSoup

g = Goose({'stopwords_class': StopWordsChinese})
urls = [
    'https://www.mylondon.news/news/celebs/bbc-sound-music-christopher-plummers-22600079'
]
url_articles = []
for url in urls:
    page = g.extract(url=url)
    soup = BeautifulSoup(page.raw_html, 'lxml')
    links = soup.find_all('a')
    for l in links:
        link = l.get('href')
        if link and link.startswith('http') and any(c.isdigit() for c in link if c) and link not in url_articles:
            url_articles.append(link)
            print(link)

for url in url_articles:
    try:
        article = g.extract(url=url)
        content = article.cleaned_text
        if len(content) > 200:
            title = article.title
            print(title)
            with open('homework/goose/' + title + '.txt', 'w') as f:
                f.write(content)
    except:
        pass
