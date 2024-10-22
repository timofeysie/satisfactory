# Twitter

A basic [Twitter for Node](https://www.codementor.io/@harikrishna83/step-by-step-guide-to-connect-twitter-api-with-angular-11msotxtvw) guide shows this:

```js
const Twitter = require('twit');

const api-client = new Twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token: 'ACCESS_TOKEN',
  access_token_secret: 'ACCESS_TOKEN_SECRET'
});
```

It doesn't have a search example, but here is one from [the docs](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/guides/standard-operators):

search URL is: https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent

twurl /1.1/search/tweets.json?q=%23superbowl&result_type=recent

You will need to be authenticated otherwise you would get:

{"errors":[{"code":215,"message":"Bad Authentication data."}]}
