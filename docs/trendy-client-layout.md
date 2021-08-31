# Trendy Client Layout

nx generate @nrwl/angular:lib trendy-layout

nx generate @nrwl/angular:component containers/trendy-layout --project=trendy-layout

nx generate @nrwl/angular:lib pictures --routing --parent-module=apps/trendy/src/app/app.module.ts

nx g @nrwl/angular:component  containers/pictures --project=pictures
