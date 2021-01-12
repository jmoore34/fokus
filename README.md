# Fokus

[![Version](https://img.shields.io/github/v/release/jmoore34/fokus.svg)](https://github.com/jmoore34/fokus/releases)
[![Downloads](https://img.shields.io/github/downloads/jmoore34/fokus/total.svg)](https://github.com/jmoore34/fokus/releases)
[![License](https://img.shields.io/github/license/jmoore34/fokus.svg)](https://github.com/jmoore34/fokus)
[![Activity](https://img.shields.io/tokei/lines/github/jmoore34/fokus.svg)](https://github.com/jmoore34/fokus/graphs/contributors)
[![Activity](https://img.shields.io/github/contributors/jmoore34/fokus.svg)](https://github.com/jmoore34/fokus/graphs/contributors)
[![Activity](https://img.shields.io/github/last-commit/jmoore34/fokus.svg)](https://github.com/jmoore34/fokus/commits)



## Inspiration

Our motivation was that many currently available productivity and focus apps were lacking. The thing is, you can always just... ignore them. So we set out to build one that you can't ignore.

## What it does

Our app is designed to launch on start and force you to immediately select "Work" or "Play". By selecting what you intend to accomplish with the session, you're more likely to stay on task. After selecting some other options as well, you can launch the application, which closes the full screen and creates a small notification in the bottom right with useful information, such as what task you're currently supposed to be working on and how much longer you're supposed to be working on it. At the end of the timer, the main window relaunches, forces you to select once again.

You can also keep track of goals with the notes field below the main UI. (Tip: You can type "chk" to insert a ✔ checkmark.)

![](https://i.imgur.com/v7zSVe2.jpg)
![](https://i.imgur.com/Z5gok8Q.png)
![](https://i.imgur.com/d7FKXrx.png)
![](https://i.imgur.com/AYNIfnY.jpg)

## Installation

Simply download and run the installer from the [releases page](https://github.com/jmoore34/fokus/releases).


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

### Open source software used

https://github.com/electron-react-boilerplate/electron-react-boilerplate
