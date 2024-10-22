# Text classification

<https://www.analyticsvidhya.com/blog/2021/12/text-classification-of-news-articles/>

newsCategory: "",

There are five news categories
Sports,
Business,
Politics,
Entertainment,
Tech.

I'm still not sure if we want to stick to theses standard categories or add anything like "scandal" or "Obituary".  Given that obituaries are a very common trending search, maybe we could have something like a secondary sub-category, so we could have like:

Sports - obituary
Politics - Obituary

## The select

We want to create a select for these to let the user change it themselves.  Also a button to "auto-detect" the category when the Python script and API endpoint for that is ready.

For the material select widget the documentation Angular Material Select we need to add <mat-option> tags inside of the <mat-select> with [value] set so that the mat-select has something to select from.

Also after to change a form value using setValue you should call this.dropDownControl.updateValueAndValidity()
