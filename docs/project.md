# Project

## TODO

- show all sections of Google trends result, not just last day

## Manual steps

### 1.Choose a trend

Satisfactory project:

C:\Users\timof\repos\timofeysie\satisfactory\

Run the backend server:

```shell
nx serve nest-demo
```

In a separate prompt, serve the front end:

```shell
nx serve customer-portal
```

Choose "Trends" from the menu and select the desired trend.

### 2. Generate a description

Goto url http://localhost:3333/api/images/kansas%20city 

Switch to the Training LSTM app C:\Users\timof\repos\python\training-lstm

Modify is run.sh

python train.py --data_dir=./data/michael-richards \

Run the command:

paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command "bash run.sh" --project 'LSTM training'

cd ml5js_example/models

paperspace jobs artifactsGet --jobId jzje8j09ciij8ohd

cd ..

Edit the sketch.js file

const lstm = ml5.LSTMGenerator("./models/champions_league/", modelReady);

Run the app:

python -m http.server

(or for Python 2)

python -m SimpleHTTPServer

### 3. Generate Image

Put the images to convert in the dir:

C:\Users\timof\repos\python\cartoonify\test_img

Run the commands:

python test.py (default)
python test.py --style Hosoda --gpu 0
python test.py --style Hayao --gpu 0
python test.py --style Paprika --gpu 0
python test.py --style Shinkai --gpu 0

The created images will be put in  

C:\Users\timof\repos\python\cartoonify\cartooned_img  

### Add content to the tundra app

Add images to assets directory

Add text content, tags, etc to data file

libs\pictures\src\lib\containers\picture-cards\picture-cards\picture-data.ts

Add a route to:

libs\pictures\src\lib\pictures.module.ts

Add a link on the pictures home page

libs\pictures\src\lib\containers\pictures\pictures.component.html

Deploy the app to Heroku

```shell
git deploy heroku main
```
