export interface Trend {
  title: Title;
  formattedTraffic: string;
  relatedQueries: any[],
  image: Image,
  articles: Article[],
  shareUrl: string
}

export interface Title {
  query: string;
  exploreLink: string;
}

// export interface RelatedQueries {}

export interface Image {
  newsUrls: string;
  source: string;
  imageUrl: string;
}

export interface Article {
  title: string;
  timeAgo: string;
  source: string;
  image: Image;
  url: string;
  snippet: string;
}
