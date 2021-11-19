# Project

How to create a new post with AI generated images and descriptions.

## Manual steps

The following are the twenty steps required to make a post.

1. Choose a trend in the Trend Factory
2. Generate a description using an LSTM Python app
3. Generate Images using pre-trained GAN models
4. Add content to the Tundra app and deploy

These steps will be automated so eventually only the first step will be required, and maybe even that can be automated.

### 1. Choose a trend

1.1 Open the Satisfactory project:

C:\Users\timof\repos\timofeysie\satisfactory\

1.2 Run the backend server:

```shell
nx serve nest-demo
nx serve customer-portal
```

1.3 Choose "Trends" from the menu and select the desired trend.

1.4 Finish the from and post it to the backend.  The json file will be saved in the posts directory.

1.5 Download the images needed for the post.

### 2. Generate a description

Make sure the server is still running from the previous step.

2.1 Goto url http://localhost:3333/api/text/<topic>

A file called array.txt will be created with the text content for the topic.

2.2 Switch to the Training LSTM app C:\Users\timof\repos\python\training-lstm

2.3 Modify is run.sh

```py
python train.py --data_dir=./data/michael-richards \
```

2.4 Run the command to upload the content and generate a model:

```shell
paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command "bash run.sh" --project 'LSTM training'
```

Make note of the job id before it scrolls out of view.

2.5 Change to the models directory and download the model created.

```shell
cd ml5js_example/models
paperspace jobs artifactsGet --jobId jzje8j09ciij8ohd
cd ..
```

2.6 Edit the sketch.js file with the topic name:

```py
const lstm = ml5.LSTMGenerator("./models/champions_league/", modelReady);
```

2.7 Run the app:

```shell
python -m http.server
```

(or for Python 2): python -m SimpleHTTPServer

2.8 Type in some seed text, and change the length.
Copy the results to the description of the AI picture.

### 3. Generate Images

3.1 In the Cartoonify project, put the images to convert in the dir:

C:\Users\timof\repos\python\cartoonify\test_img

3.2 Run the commands to use the various models to generate images:

```txt
python test.py (default)
python test.py --style Hosoda --gpu 0
python test.py --style Hayao --gpu 0
python test.py --style Paprika --gpu 0
python test.py --style Shinkai --gpu 0
```

The created images will be put in:

C:\Users\timof\repos\python\cartoonify\cartooned_img

### 4. Add content to the tundra app and deploy

4.1 Add images to assets directory

apps\my-app\src\assets\pictures\<topic>\\<topic.jpg>

4.2 Add the json created 1.4 to the data file:

libs\pictures\src\lib\containers\picture-cards\picture-cards\picture-data.ts

4.3 Add a route to:

libs\pictures\src\lib\pictures.module.ts

4.4 Add a link on the pictures home page

libs\pictures\src\lib\containers\pictures\pictures.component.html

4.5 Deploy the app to Heroku

```shell
git deploy heroku main
```
