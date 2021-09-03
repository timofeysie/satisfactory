# Trendy Client Layout

nx generate @nrwl/angular:lib trendy-layout

nx generate @nrwl/angular:component containers/trendy-layout --project=trendy-layout

nx generate @nrwl/angular:lib pictures --routing --parent-module=apps/trendy/src/app/app.module.ts

nx g @nrwl/angular:component  containers/pictures --project=pictures

## Mike Richards example

nx g @nrwl/angular:component  containers/pictures/trends/MikeRichards --project=pictures

nx g @nrwl/angular:component  containers/pictures/trends/mike-richards/toonify/ToonifyMikeRichards --project=pictures

nx g @nrwl/angular:component  containers/pictures/trends/mike-richards/transitioncat/TransitioncatMikeRichards --project=pictures

Using this layout immediately creates a problem.  We need only one card, and the container should pass down properties into one picture card.

But will this still be OK for SEO?  If JavaScript is turned off, will the sever side rendered pages still work for a search crawler to read the content?  We need to compare the two methods before jumping into the usual DRY/SOLID programming approach.

## The layout

https://zoaibkhan.com/blog/create-a-responsive-card-grid-in-angular-using-flex-layout-part-1/

Next, the side nav?

https://zoaibkhan.com/blog/create-a-responsive-sidebar-menu-with-angular-material/

https://material.angular.io/components/sidenav/examples

I don't think side nav is the answer.  Have to fight against it.
Just add our own panel on the right and use that.

In mobile view, the panel should disappear and the footer should appear (or grow).

## Re-usable container and presentational components

Containers are smart
Components are dumb and just have input/output and layout

This is how it was done for auth.

```txt
>nx generate @nrwl/angular:component containers/login --project=auth
>nx generate @nrwl/angular:component components/login-form --project=auth
```

This is how we can do it for cards.

```txt
nx g @nrwl/angular:component  containers/picture-cards/picture-cards --project=pictures
nx g @nrwl/angular:component  components/picture-card/picture-card --project=pictures
```

The picture-cards can get the data from a service.
The picture-card gets its info from the picture-cards container.

This way we can just add a new data model to the source, and it will end up as a route?

Not sure how that part is going to work.  Maybe we just add an entry in the service and make sure to add a route for each entry.  That could work.  Worth a try for our first effort.

The status demo:

```js
{ path: 'Mike Richards', component: MikeRichardsComponent },
```

The first idea:

```js
{ path: 'picture/Mike Richards', component: PictureCardsComponent },
```

Then in PictureCardsComponent, we look at the path and use the data for that picture.  Not sure about all this, but it actually works.

I thought it would be a good idea to create a topic about something which has not search results.  So enter:

http://localhost:4200/topic/Qivit%20Tittysure

## Git issue

Git fatal: failed to resolve HEAD as a valid ref.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
apps/trendy/src/app/app.component.scss
docs/trendy-client-layout.md
libs/material/src/lib/material.module.ts
libs/pictures/src/lib/containers/pictures/trends/mike-richards/mike-richards.component.html      
libs/pictures/src/lib/containers/pictures/trends/mike-richards/mike-richards.component.scss      
libs/pictures/src/lib/containers/pictures/trends/mike-richards/toonify/toonify-mike-richards/toonify-mike-richards.component.html
libs/pictures/src/lib/containers/pictures/trends/mike-richards/toonify/toonify-mike-richards/toonify-mike-richards.component.scss
libs/pictures/src/lib/containers/pictures/trends/mike-richards/transitioncat/transitioncat-mike-richards/transitioncat-mike-richards.component.html
libs/pictures/src/lib/containers/pictures/trends/mike-richards/transitioncat/transitioncat-mike-richards/transitioncat-mike-richards.component.scss
libs/trendy-layout/src/lib/containers/trendy-layout/trendy-layout.component.html
libs/trendy-layout/src/lib/containers/trendy-layout/trendy-layout.component.scss
libs/trendy-layout/src/lib/containers/trendy-layout/trendy-layout.component.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        apps/trendy/src/assets/pictures/mike-richards/transitioncat-mike-richards-452-316.jpg

The solution was to re-clone the project in a new directory and move the files to that to make the commit.  This is the second time this has happened to a repo on this hp laptop.  I'm concerned about the hard drive.

Best to keep everything backed up on other peoples computers (the cloud).  Thanks to the cloud.
