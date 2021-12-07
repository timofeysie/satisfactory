# TODO

## Plans

### Add/Remove posts pictures

+/- buttons for trend post setup page type cards.
For this this should be able to remove the "two" picture.
But really, very quickly we should remove the one/two hardwired approach and just have an array of images.

## Issues

### Current

- add three original meta-descriptions pre-filled using the description via a button.
- actual description should be an array of sections representing paragraphs.
- srcset should be prefilled for Artist pictures only

### Frontend Todo

done - remove special characters from trend details and text used to create description model

- Loading spinner for Wikimedia Commons images doesn't work when choosing the update button
- Meta description length: a minimum of 100 characters is recommended
- Word count total: 115, Corrected word count: 100, Anchor text words: 15
- identify dimensions of artist image
- load raw data for lstm description generation
- Timry Tenry or Him Hem or Hemithy group artist name (Josm Parchod, Tosh Carr)
- make title/link input fields on the create post section fill their containers
- the AI type doesn't use srcset currently, so this should be optional
- wikiLink: ' Kosmos 1408 ', needs to be translated to full link
- imageSrc needs full path like './../assets/pictures/Champions-League/UEFA_Champions_League_Hosoda.jpg',
- add description type: paragraph | poem
- sercset and  image src names need underscores not spaces: "Belfast by one_300w.jpg"
- Need to have an easily search for marker for "one" and "two".  Like "<one_ai>" and "<two_artist>".
- Srcset needs to have separate widths for protrait and landscape.  Ie: does width 300, 600, 1800 also make sense for portrait?
- need to allow multiple links for topics.
- mobile check for layout change not working on first load

### Data structure

- images should be s3 links
- posts should have primary index (NgRx with entity adapter?)

### Backend Todo

done - save json for post

- topicText and links need to be removed from the generated json
- googleImage and commonsImage are also not used
- Picture titles need to include author: one: { title: 'Belfast by AI', ...
- download image
- save topicText for model creation
- create route for post
- show all sections of Google trends result, not just last day

### Pythons scrips Todo

- lstm generate script
- cartoonify image
- copy images to dir
- add description added to form

### Todo

- create api to return raw data for lstm model generation?
- or allow editing and adding raw text from links before post?
- show total lines
- allow adding more content and

## Merge projects

- upgrade Tundra to latest Angular (or version from Satisfactory)
- Add Satisfaction apps and libs to Tundra
- Add Python projects to Tundra
- Automate create 10 descriptions for the user to choose from
- Create api to let the user load the 10 descriptions in the front end
- Create page to allow the user to select a description
