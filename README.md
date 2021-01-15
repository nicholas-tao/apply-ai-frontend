# ApplyAI (apply-ai.online)

**Job hunting, made easy**

![Demo Gif](https://github.com/nicholas-tao/apply-ai-frontend/blob/master/gifs/demo.gif)

[Live Version](https://apply-ai.online)

[Visit Devpost Page](https://devpost.com/software/applyai)

[Demo Video](https://www.youtube.com/watch?v=7Sxl3rX8u4U)

[Front End Repo](https://github.com/nicholas-tao/apply-ai-frontend)

[Back End Repo](https://github.com/nicholas-tao/apply-ai-backend)

[Parsers](https://github.com/qasimza/apply-ai-parsers)

## Inspiration

As a result of the COVID-19 pandemic, millions of people lost their jobs and the US unemployment rate reached an all-time-high of nearly 15% in April of 2020. Job hunting has never been easy. It's time consuming, repetitive, and draining.

As students, we've spent countless hours applying to internships and filling in the same details over and over again.

ApplyAI is here to change that.

## What it does

ApplyAI is broken into two main features:

First, it parses your resume to automatically fill out as many fields as it can (if you wrote it on your resume once, why should you have to also enter it into a form a million times?). It then will let you modify any of the fields it gathered, and then update your information.

Second, our extensive bot network will be constantly adding new jobs to our database of jobs and will automatically pick a few that best suit you, using fuzzy matching and cosine similarity. These jobs will be displayed to you all in one place at one time, and you can select as many as you would like and click apply once. That's it! You just applied to multiple highly-relevant jobs in under a minute!

## How we built it

The frontend is built with HTML, CSS, JS, and Bootstrap. We use Javascript's Fetch API to communicate with the backend. The frontend is hosted on Firebase at apply-ai.online.

The backend is a Ubuntu server configured with Nginx serving files to api.apply-ai.online. It is built using python and flask, which then communicates with a Firebase Realtime Database and a Google Cloud Storage Bucket to store resumes.

This project also has a cronjob running on our Ubuntu server. This cronjob is constantly indexing many job sites to pull as much useful info as it can, and continues to train our ML model as it goes. This ensures that even with a limited number of jobs on the market, our algorithms will always be able to provide you with the best job recommendations out there.

## Challenges we ran into

Connecting the frontend to the backend took a long time. We, rather naively, began connecting the two at about 2 am on the day of submissions. Integrating the two was not successful until 10 am on the day of submissions. This meant our entire Devpost is being written in an extremely sleep-deprived state, so we hope you like it!

Besides the constant lack of sleep, another challenge was parsing the resume. Unfortunately, pdf resumes don't have a standardized format. This meant in many cases we needed to apply ML instead of an algorithm. Even still, these ML models are by no means perfect. If you run our demo and happen to get weird data in your pre-filled forms, or no data at all, that is likely a result of our model being unable to properly scrape your resume. If you would be willing, we would love to receive your resume so we could work on upgrading the model in the future to support it.

## Accomplishments that we're proud of

With only 3 members on our team, and none of us heavy in frontend knowledge, we knew this was an ambitious project. The fact that we got the Devpost submitted is a testament to our perseverance as a team, especially considering I (Eric), only slept about 6 hours this entire hackathon.

## What we learned

As cheesy as it sounds, I really learned to be patient. This took a lot of time and restraint while up in the night debugging. When we finally made it through with everything working, it was the greatest feeling of relief ever.

In addition to our excellent practice debugging it, we also learned how to integrate so many moving parts. We wanted to implement many different features so we would be in the running for the Google Cloud prize track. This meant if one thing threw an error we weren't catching, everything would break. We learned just how important proper error handling is.

## What's next for ApplyAI

We really hope to improve on our resume parser. Currently, that is definitely a bottleneck.

We also want to integrate our bots with more job posting websites, like monster.com.

Lastly, our bots have trouble applying to many websites where you need to create an account, or there is an "I'm not a robot" functionality. We are thinking of perhaps packaging this as a chrome extension, and when it detects job fields it will fill them out for you.
