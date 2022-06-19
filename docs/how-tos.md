# How tos

This file is a collection of notes on things that might be helpful later, such as tracing a front end feature to the backend.

## retrace the "Choose source Image" from ui to service to controller to service

(click)="onChooseSourceImage()" -> this.originalFileInput.nativeElement.click();

Then you have to look at the template native input element to see what it is attached to.

<input #originalFileInput (change)="sourceImageChosen($event)"

And in the class:

```js
  sourceImageChosen(event) {
      const fileChosen = event.target.files[0]['name'];
      this.originalImageSelected.emit(fileChosen);
```

On the parent template: libs\trends\src\lib\components\post-creation-form\post-creation-form.component.html

  <demo-app-post-creation-form (originalImageSelected)="onOriginalImageSelected($event)"

That goes back down into this component where a behavior subject is waiting for a change:

```html
            <demo-app-image-preview
              *ngIf="fullTopicForm.value.one?.imageChosen"
              [imageFileName]="fullTopicForm.value.one?.imageChosen"
            ></demo-app-image-preview>
```

this.trendsService.postImageMetadata(body).subscribe((result2) => {

This calls the POST: return this.httpClient.post('http://localhost:3333/api/image/', body, {

So look in the image POST API endpoint.

First of all, the logs are coming from async functions, so there could be a few lines from one fuction, and a few lines from another as they get their turn on the mystical Javascript event loop.

So having each line tell us where it's coming from is important.  But for now, we have console log.

ImageService.create
