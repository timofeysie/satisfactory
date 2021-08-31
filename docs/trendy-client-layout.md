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

First, I will create a layout.

https://zoaibkhan.com/blog/create-a-responsive-card-grid-in-angular-using-flex-layout-part-1/
