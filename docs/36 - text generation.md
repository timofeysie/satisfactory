# Text Generation

## Using the LSTM script

LSTM stands for Long/Short Term Memory in the NLP field (Natural Language Processing).

I'm not sure if it's work creating a new lib for this.

For now, it's own component should be fine.  Put it in a container in the trends lib.

nx g @nrwl/angular:component  containers/lstm --project=trends

The html source from [the demo used by paperspace](https://blog.paperspace.com/training-an-lstm-and-using-the-model-in-ml5-js/) looks like this:

```html
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/ml5@0.1.1/dist/ml5.min.js"></script>
</head>
<body>
  <div id="container">
    <textarea id="textInput" placeholder="Start typing here"></textarea>
    <p id="status">Loading Model</p>
    <p id="result">
        <span id="original"></span><span id="prediction"></span>
      </p>
    <br/> Length:
    <input id="lenSlider" type="range" min="1" max="100" value="20"> <span id="length">20</span>
    <br/> Temperature:
    <input id="tempSlider" type="range" min="0" max="1" step="0.01"><span id="temperature">0.5</span>
  </div>

  <script src="sketch.js"></script>
</body>
```

I suppose I should try and Angularify the code.  It's kind of weird JavaScript from fifteen years ago, long before Angular 2 or even Angular 1.  Pre 2008 I would guess.

Typescript is NOT happy.

```js
const lstm = ml5.LSTMGenerator("./models/hemingway/", modelReady);

let textInput;
let tempSlider;
let lengthSlider;

function modelReady() {
  select('#status').html('Model Loaded');
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

  // Run generate anytime something changes
  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);
}

function generate() {
  // Update the status log
  select('#status').html('Generating...');

  // Update the length and temperature span elements
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something
  if (txt.length > 0) {
    // Here is the data for the LSTM generator
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, (err,result)=>{
      // Update the DOM elements with typed and generated text
      select('#status').html('Ready!');
      select('#original').html(original);
      select('#prediction').html(result);
    });
  } else {
    // Clear everything
    select('#original').html('');
    select('#prediction').html('');
  }
}
```

Start from the beginning then:

npm i ml5

Buuut, this may not even work.  As I recall, there were version issues.

I had to revert to an earlier 1.1 version of ml5.js and using Python 2.7.15.

We are not going to be changing the Python version for this.  If it doesn't work, they it might be time to use the updated version from Paperspace.

I actually created a [PR on their GitHub](https://github.com/Paperspace/training-lstm/pull/4) for this issue.

*Instead of updating the example to use the latest ml5.js, the CDN version can be downgraded to use v0.1.1 which was release on Jul 27, 2018 which is before the ml5.LSTMGenerator() function was removed.*

Is it 1.1, or 0.1.1?

This is what we installed:    "ml5": "^0.10.1",

## TypeScript version

Without really looking at anything like [this article](https://anilmaharjan.com.np/blog/ml5-with-webpack-and-typescript), I gave it a go.  Here is the first error from that unsuccessful attempt:

```txt
core.js:6456 ERROR TypeError: ml5__WEBPACK_IMPORTED_MODULE_0___default(...).LSTMGenerator is not a function
    at LstmComponent.ngOnInit (libs_trends_src_index_ts.js:1223:64)
    at callHook (vendor.js:29666:22)
```

I do this this in the console before the error above:

Thank you for using ml5.js v0.10.1 🌟

That error I recall is why the version had to be downgraded.

npm i ml5@0.1.1

The next error after this is:

zone.js:2863
GET <http://localhost:4200/models/hemingway/manifest.json> 404 (Not Found)

The directory is there:

libs\trends\src\lib\containers\lstm\models\hemingway\manifest.json

Using the full path to the directory works.  Actually, no it doesn't:

zone.js:2863
GET <http://localhost:4200/libs/trends/src/lib/containers/lstm/models/hemingway/manifest.json> 404 (Not Found)

Another thing that happened is that the browser tab crashed.  At first, this might be expected.  The demo often becomes unresponsive.  But this is more concerning for an app that does more that just generate some text.  So a crash needs to be avoided.  Imagine having all the data needed to be set up, taking minutes to get there, and then the app crashes before the submit.

So I'm thinking that an API to the backend could be in order?  Less chance of a crash there?

The router.url path in the function shows "/trends" as the current path.

## Other options

Looking around, I read [this](https://towardsdatascience.com/text-generation-with-pretrained-gpt2-using-pytorch-563c7c90700): *how to generate text using pretrained GPT-2, the lighter predecessor of GPT-3. We will be using the notable Transformers library developed by Huggingface.*

Um. yeah, we already use Huggingface.  Why not just add a description to the summary we already create?

Are we using Bart or Goose from the front end api?

## Bart or Goose

Which py script is getting used?

Here are the three service calls in the bart.controller:

```ts
this.bartService.loadSummary();
this.bartService.loadSummaryById(id);
this.bartService.getArticleSummary(article.link)
```

Here are the three functions in the bart.service for those:

```ts
loadSummary() {
  console.log('DEPRECATED bart.service.loadSummary()');
    const path = `./apps/nest-demo/src/app/bart/summary.txt`;

loadSummaryById(summaryUrl: string) {
  console.log('bart.service.loadSummaryById:', summaryUrl);
    const path = `./apps/nest-demo/src/app/bart/summaries/${summaryFilename}.txt`;

async getArticleSummary(articleUrl: any) {
      'apps/hugging-face/src/goose.py',
```

So it's goose.py, not bart.py despite the name of the api.

Then it's hard to understand the output from the script.  This is the bart specific output:

bart.controller.getArticleSummary: article {
  link: 'https://www.skysports.com/nba/news/36244/12538803/lebron-james-and-kevin-durant-in-hilarious-nba-all-star-draft-as-james-harden-trade-adds-spice'
}

bart.service getArticleSummary service err No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (<https://huggingface.co/sshleifer/distilbart-cnn-12-6>)

bart.service.getArticleSummary: path ./apps/nest-demo/src/app/bart/summaries/https%3A%2F%2Fwww.skysports.com%2Fnba%2Fnews%2F36244%2F12538803%2Flebron-james-and-kevin-durant-in-hilarious-nba-all-star-draft-as-james-harden-trade-adds-spice.txt

So the summary gets done.  It happens to be a rotten one: James picked Joel Embiid, Steph Curry, DeMar DeRozan and reigning MVP Nikola Jokic.

But the generation pipe is not getting done.

Try the code out separately:

python apps\hugging-face\src\hello.py

```txt
PS C:\Users\timof\repos\timofeysie\satisfactory> python apps\hugging-face\src\hello.py 
Start hugging-face
No model was supplied, defaulted to gpt2 (https://huggingface.co/gpt2)
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
======= generated

The world is a better place if you're a good person.

I'm not saying that you should be a bad person. I'm saying that you should be a good person.

I'm not saying that you should be a bad
```

Nice.  It works.  I suppose we just need a separate script and api endpoint to call it.

```py
text_generation = pipeline("text-generation")
prefix_text = "The world is"
generated_text = text_generation(
    prefix_text, max_length=50, do_sample=False)[0]
print('generated' + generated_text['generated_text'])
sys.stdout.flush()
```

Now to implement that.  We will need to use an endpoint that calls a new script.

nx generate @nestjs/schematics:resource generate --sourceRoot apps/nest-demo/src/app

### Examples

http://localhost:3333/api/generate/Ash%20Barty%20is

Input: Alex-de-Minaur

Output: Alex-de-Minaur, a former member of the French parliament, said the government had been "very clear" that it would not allow the use of the term "radical Islam" in the country.

Input: Alex de Minaur has reached the fourth round of the Australian Open for the first time in his career.

Output: The Australian Open is the first time de Minaur has won the Australian Open since he won the Australian Open in 2012.

Input: Ash Barty is one win away from adding another major championship to her tally.

The former champion of the world's top-ranked women's bantamweight division, Barty, who is currently ranked No. 1 in the world, is

Input: Ash Barty is

generated: Ash Barty is a writer and editor for the blog The Daily Beast. He is also a regular contributor to the Daily Beast's The Daily Beast.  Read more from The Daily Beast.

That's pretty weird.  Try a longer one:

Ash Barty is one win away from adding another major championship to her tally.
Barty achieved the feat in style on Thursday night, comfortably winning her semifinal against American Madison Keys 6-1, 6-3 in just over an hour on Rod Laver Arena.
She will chase her third major singles championship in Saturday night's final against 27th-seeded Danielle Collins of the United States.

Taking a looooong time this one.  And, it's not coming back.

generated: Australian of the Year 2022.

The event will be held at the University of Sydney's Centre for the Study of the Humanities and the Arts.

The event will be held at the University of Sydney's Centre for the Study of the

Then this;

warnings from Washington that a Russian invasion of Ukraine could be imminent.

"The United States is not going to let this happen," he said. "We are going to have to do everything we can to prevent this from happening."

Wh-what?
