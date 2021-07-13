# 16 - Entity State Adapter

After getting the products sorted, and running well, all of a sudden there is a template linting error in the libs\products\src\lib\containers\products\products.component.html file.

```html
<p>products works!</p>
{{products$ | async | json}}
```

It's a pretty harmless piece of debugging code that just prints out the json of the products returned from the demo server.  Both pipes have errors under them.  The async error says:

```txt
No pipe found with name 'async'.ngtsc(-998004)
```

After a bit of googling, I found [one person](https://www.programmersought.com/article/84735645750/) who saw this error and fixed it.

Jerry's answer involves importing the Common module into the parent module, which we already have.  The app still runs without error, so leaving this for now, as this code will be replaced with an actual product display, and if the error is still around then, we can come back to it.

Another problem which could be considered a defect is that the logged in state is lost on refresh.  A few steps ago, the state was saved in the local storage so the user wouldn't have to log in over and over again.  This should be fixed as it's annoying during development, and is probably a regression that hopefully is not in the workshop, but this should be looked at.
