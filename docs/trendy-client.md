# Trendy Client

## Getting started

The plan is that this will be the SEO SSR client to hold the images and other front end public facing behavior.  Let's start with a list.

- SEO
- SSR
- Ads
- Analytics
- SN sharing
- Voting
- Images
- Deployments
- Hosting

Wow, that's a lot.  I haven't seen it myself like this yet, so just digesting that this is not going to get done as quickly as I first imagined.  I am usually optimistic at estimating.  But putting on my PM hat, that's about nine months of work there if each is a month.  But no, I think Ads and Analytics are both weekend jobs.  If this can be finished by December, I will be happy.

There is still a lot to work out too.  I'm still not sure how the images work with the first two.  Can we pull them from a db and still have good SEO/SSR?

It would be nice to re-use the layout module for this.  We won't need auth.  So the scaffolding will be simpler.  Not sure if we even need NgRx, as there is no login.  The product list is not a big deal.  Not sure if sorting is needed or wanted.  Not sure how the UI is even going to look beyond the header, the ad fields and the image cards.

Voting should however have NgRx, so may as well think about how that's going to work.

Lets get the links here that were put in the notes.  I did all this research at the beginning, so now, after the ML phase is cooling off, all will have to be gone over again.

### Angular seo

https://yoast.com/image-seo/

https://www.webceo.com/blog/how-to-do-seo-for-news-websites/#6_get_featured_in_google_news

https://aglowiditsolutions.com/blog/angular-seo/amp/

Use title and meta data

ng add @nguniversal/express-engine --clientProject project-name

npm run build:SSR && npm run serve:SSR

npm run prerender on the project and use guess-parser to guess the application’s routes

### Nx SSR

The next step is doing this in Nx using the [Angular Universal server-side rendering (SSR) in Nrwl Nx by Jared Christensen](https://jareddesign.medium.com/angular-universal-server-side-rendering-ssr-in-nrwl-nx-fdb94d7953e) article.

Generating the app in the Christensen approach looks like this:

```sh
nx generate @nrwl/angular:app MyApp
```

Generating the app in the Duncan looked like this:

```sh
nx generate @nrwl/angular:app customer-portal --routing
```

Going with this:

```hs
nx generate @nrwl/angular:app trendy --routing
```

This brings up the difference between CamelCase or snake-case (also called kebab-case).  Apparently, the Angular CLI recognizes the options written in either case, so there.

What is the Angular Express Engine?  It's for SSR.  Don't overthink it.  There is a lot to get through.

```sh
npx ng add @nguniversal/express-engine --clientProject my-app
```

Step 4: “apps” was dropped from the path. We will add that back in

Step 5: Inside of the generated server.ts file (apps > my-app > server.ts) we need to add “apps” to the distFolder  

Step 5:  

npm run build:ssr

This command will start up the server.

npm run serve:ssr

view your app in a browser at  http://localhost:4000/

### Deploy

https://www.thisdot.co/blog/deploying-nx-workspace-based-angular-and-nestjs-apps-to-heroku 

### AsSense

1. Ni1. Create space for a leaderboard top banner.
2. Have a sidebar for a rectangular or skyscraper banner.
3. Find a spot under your main header for link units.
4. Add a horizontal banner  at end of your content.

- Use Responsive ad sizes, it adjusts with Mobile (most of your traffic)
- Use ad Border and Ad Background to your site Background. 

Always use text ads: If you want to get a high Click-through rate then you need to must add text plus link ads, they have high CPC if your traffic is coming from tier 1 countries.

Add page-level ads to your site.

Convert your Cheap traffic to premium traffic.

Source: https://www.quora.com/How-much-money-can-I-make-from-AdSense-with-1000-visitors-per-day 

1000 visitor CTR 1% = click per 100 views = 10 clicks = $15 per 1000 visitors.

4,000 visitors per day at $2, from Asian Countries = #Traffic from a Developed Country.

US/UK $7 per 1000 page views.

https://www.adpushup.com/blog/whats-causing-the-sudden-drop-in-your-adsense-earnings-ctr-and-rpm/ 

robot.txt investigation.

section targeting tags.

This is done with the following tags:

< !– google_ad_section_start –>The most relevant text, the text you want to have AdSense target when selecting ads, should be placed within these tags< !–
