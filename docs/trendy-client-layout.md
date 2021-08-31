# Trendy Client Layout

nx generate @nrwl/angular:lib pictures --routing --parent-module=apps/trendy/src/app/app.module.ts

nx generate @nrwl/angular:lib trendy-layout

nx generate @nrwl/angular:component containers/trendy-layout --project=trendy-layout
