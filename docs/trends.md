# Trends

This document describes setting up [google-trends-api](https://www.npmjs.com/package/google-trends-api#dailyTrends).

```txt
nx generate @nestjs/schematics:resource trends --sourceRoot apps/nest-demo/src/app
```

The docs show using require:

```txt
const googleTrends = require('google-trends-api');
```

```js
import * as googleTrends from 'google-trends-api';

googleTrends.dailyTrends({
  trendDate: new Date(),
  geo: 'US',
}, function(err, results) {
  if (err) {
    console.log(err);
  }else{
    console.log(results);
  }
});
```

Now, about that callback.
