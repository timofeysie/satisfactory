# Call Python from Node

There are a number of ways to do this.  It can actually be done in the browser with a lib.  However, since we have a Node server, let's use that for now so that the front end doesn't get overly complex.

[This SO](https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js) list a few methods.

Of the ten answers there, many of the examples are years out of date.  They all seem to rely on  RPC (Remote Procedure Calls) libraries.

1. JSPyBridge/pythonia
2. The python-shell module by extrabacon
3. Boa
4. child_process module
5. zerorpc
6. transpile Python to JS

The answer by bormat has a decent example of using spawn fro child_process.  Also, child_process is mentioned at least five times in the answers, so that wins the popularity contest.

The [npm lib child_process](https://www.npmjs.com/package/child_process) is not currently in use, but was formerly occupied by another package. To avoid malicious use, npm is hanging on to the package name.

One answer on the SO says that the package which comes with node.

## Call the Python lib

The lib we crated was using the [nx-python](https://github.com/eulerrapp/nx-python) plugin.

However, there is no exported lib from that creation.  Do we just rely on calling the Python scripts by their path?

## Create a new endpoint for goose and bart functions

nx generate @nestjs/schematics:resource bart --sourceRoot apps/nest-demo/src/app

This time I will clear out the unused API endpoints and just have the one we will use:

http://localhost:3333/api/bart/nets%20vs%20rockets

Next, the bart.service works like this:

```ts
  findOne(id: string) {
    const process = spawn('python', ['apps/hugging-face/src/bart.py', id]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        console.log('Sending Info', data.toString('utf8'));
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }
```

However, given the time taken to generate the result, I think we should just store the result in a file and let the front end load that.

## Workflow options

1. The front end needs to supply a news url to the goose script to then get the body of the article.
2. Then the goose script saves the article to a file that can then be used as input for the bart script.
3. The bart script will then save the resulting summary to another file which the front end can load via an API.

### Option 1

Step 1 can be done after the form is posted, since then the json will have a list of news stories to use.  I suppose we can just go through them all, and process each url and save all the summaries, and then let the user choose which one?

This will be the same way that the user will be able to choose which model the generated image should use.

### Option 2

An alternate method would be to have the user select a new story and then generate a summary that can be loaded and added to the form before it is finalized.

### Option 3

We could also generate summaries for all the urls automatically when the user starts the form.

Option 1 doesn't require any extra api calls, in which case, we don't really need the above function.  Option 2 is good, as we can let the user select the url to use for the scrape, just we don't

So that means an extra field in the form.  Still, it would be good to have a separate topic description pre-fill function so the user has a chance to preview and edit.  So let's make that happen with this endpoint.

## Frontend article for summary selection

We can get a url from an event on a checkbox click in a trend-list-detail.component and emit it to 
the demo-app-trends-list.component.

The demo-app-trends-list.component is used in this template:

libs\trends\src\lib\containers\trends\trends.component.html

This component also has to emit the value up to it's parent, then from this class we can call the service which will send the url to Node on the backend:

libs\trends\src\lib\containers\trends\trends.component.ts

Then, it's up to the goose script to scrape the article, and send it to the BART (Bidirectional and Auto-Regressive Transformers) script which will summarize it.

In the goose.py script, we see this data, sent back to the:

bart API goose "https://www.kansan.com/lifestyles/entertainment/morbius-delayed-3-months/article_53b8a104-85e9-52b3-b9fd-246d89f17a97.html"

But then it hangs.  Writing a file with the expected article text is not working also.

Not sure what's going on.  This was all looking to easy.

The next morning running the app again gives this error:

```txt
[Nest] 9904   - 07/01/2022, 9:25:35 am   [ExceptionsHandler] Traceback (most recent call last):
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\goose3\__init__.py", line 128, in crawler_wrapper
 +49106ms
```

I have no idea.  Not much of an error message there.

Is this a versions issue?  We are using Python 3.9.6.

Running the app locally with the same url actually works:
https://www.westernslopenow.com/news/powerball-tickets-sold-in-wisconsin-california-split-632m/

python apps\hugging-face\src\goose.py https://www.westernslopenow.com/news/powerball-tickets-sold-in-wisconsin-california-split-632m/

```txt
MADISON, Wis. (AP) — Powerball tickets sold in Wisconsin and California were winners of the latest jackpot and will split $632 million, officials said.
The Wisconsin Lottery didn’t immediately announce where the winning ticket in its state was sold. The winning ticket in California was sold at a 7-Eleven convenience store in Sacramento, the California Lottery said.     
The winning numbers for the Powerball jackpot drawn Wednesday night were 6, 14, 25, 33 and 46. The Powerball was 17.
The winners have a cash option of splitting $450 million. The jackpot was one of the largest in the history of the Powerball game, but it didn’t rank among the Top 10 largest in U.S. lottery history.
In the drawing there were also 14 other tickets that won several million dollars.
Powerball is played in 45 states plus Washington, D.C., the U.S. Virgin Islands and Puerto Rico.
```

Running bart on that text:

```txt
python apps\hugging-face\src\bart.py                         
No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)
Your max_length is set to 300, but you input_length is only 209. You might consider decreasing max_length manually, e.g. summarizer('...', max_length=104)
[{'summary_text': ' 
Winning numbers for the Powerball jackpot drawn Wednesday night were 6, 14, 25, 33 and 46. 
The winning ticket in California was sold at a 7-Eleven convenience store in Sacramento . The winners have a cash option of splitting $450 million . Powerball is played in 45 states plus Washington, D.C., the U.S. Virgin Islands and Puerto Rico .'}]
```

The summarizer('...', max_length=104) is a good idea, but looks like we are not out of the woods yet on this feature.  At least we know that the issue isn't with Python.

Looking at how the SO answers called Python from Node, I made a simple change here:

```ts
    const process = spawn('python', [
      'apps/hugging-face/src/goose.py',
      JSON.stringify(articleUrl),
    ]);
```

After removing the stringify, it works!

## Saving the article body

This is how the file could be saved.
file = open('apps/hugging-face/src/articleBody.txt', 'x')
file.write(article.cleaned_text)
file.close()

But probably we want that done in Node, so that the file doesn't need to be saved.

Or, save the file and let bart use that file.

## Sending the article to bart

This was a little awkward in Node, as it would require spawning processes and two separate promises.

May as well add the summarize functions to the goose script and do it all there.

This works, except the file it writes is blank.  We can see it getting printed to console after 30 seconds or so.

Also, the front end receives a 500 error almost immediately.  How to we make it wait for the second process to finish?

It's not working out.  After doing quite a bit of tooling around, I have decided just to save the result in Nest and let the user retrieve that via a button on the form page to pre-fill the topic description.

The connection between Nest and Angular wasn't working out.  We had to remove the generic type to allow the basic response type of text:

this.httpClient.get<any>

After that, this worked:

```js
  retrieveArticleSummary() {
    return this.httpClient.get('http://localhost:3333/api/bart', {
      responseType: 'text',
    });
  }
```

## Formatting the result

The result has a few issues:

[{'summary_text': " Wednesday�s $630 million Powerball jackpot will be split between winners in California and Wisconsin . The winner has 180 days from the day of the drawing to come forward, or the prize is forfeited . It's the fourth Powerball or Mega Millions jackpot won by a Wisconsin resident in four years . The winning numbers were 6, 14, 25, 33, 46, and the Powerball was 17 ."}]

It's special characters time.
The punctuation has a space before each period.

We just use the old string.split(' .').join('.'), etc to finish this off.

## Handle the in crawler_wrapper error

We need to be able to alert the front end we get the following error:

getArticleSummary service err Traceback (most recent call last):
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\goose3\__init__.py", line 128, in crawler_wrapper

This is an error with goose getting the article.  If this happens, then the user should have the option of capturing the article text by hand and using that to be summarized by the bart.

## Call toonify from Nest

Next, without taking a break on this subject, we need to move the Toonify app into this one and do that same for that as was done for goose and bart.

We will needs to quick UX for this, as we should be able to offer all four models to preview and choose one.  Seems like it would be prudent to start a new markdown document and tie up the specific subject of calling Python scripts from a Node Nest.

## Anomalies

loadSummary [{'summary_text': ' Meat Loaf\'s agent confirms his death to CNN . The singer, whose real name is Marvin Lee Aday, was born in Dallas . He won a Grammy in 1993 for Best Solo Rock Vocal Performance for the song "I\'d Do Anything for Love" In November, he said he\'d had four back surgeries and would be back in the studio in the new year .'}]

Description shows: In November, he said he\'d had four back surgeries and would be back in the studio in the new year.

Looks like it's cutting of everything before the last " character.
