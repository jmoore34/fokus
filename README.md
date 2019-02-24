## Inspiration

One of our members, Jonathan, felt the currently available productivity and focus apps were lacking. The thing is, you can always just... ignore them. So we set out to build one that you can't ignore.

## What it does

Our app is designed to launch on start and force you to immediately select "Work" or "Play". By selecting what you intend to accomplish with the session, you're more likely to stay on task. After selecting some other options as well, you can launch the application, which closes the full screen and creates a small notification in the bottom right with useful information, such as what task you're currently supposed to be working on and how much longer you're supposed to be working on it. At the end of the timer, the main window relaunches, forces you to select once again.

## How we built it

We decided to build using a combination of React, Electron, and Javascript, as well as an assortment of other technologies to hold it all together. Electron allowed us to write a desktop app in React. We created a main process that contained the core business logic, and this connected to all of the browser windows, which used React to control the UI of both the main page and the browser window.

## Challenges we ran into

One major challenge we were faced with was that this was the first time any of us had made a desktop app with Electron. Significant difficulty arose in putting these two technologies together, especially with a lack of documentation on the subject. In particular, we experienced a large roadblock when trying to get the browser windows to communicate with the main process due to an insufficiency in available documentation.

## Accomplishments that we're proud of

We used a lot of creative workarounds to make to app essentially unclosable. Does that make it uncomfortably similar to malware? Perhaps. But we use our powers for good, we swear.

## What we learned

The coolest sounding solution is not always the best. While educational, our chosen technologies caused more issues than we feel they solved. However, it did provide a great chance to learn multiple really cool technologies that simply coding in a familiar language wouldn’t have. We also learned the approximate upper limit of non-lethal caffeine consumption.

## What's next for fokus

The big next step is increasing functionality for the app. Adding features such as custom user profiles, browser integration, and application blocking could take fokus from a hackathon project to a product useful for individuals and businesses alike. What’s next for us? A nap, hopefully.
