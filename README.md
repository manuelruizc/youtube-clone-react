# CloneTube FrontEnd (ReactJS) 1.0.0

CloneTube is a [YouTube](https://www.youtube.com) clone web app made with ReactJS, NodeJS, MySQL. **_It's use is merely educative and to show technical skills, each user is responsible for the use of this application._**  
Videos are blocked geologically depending of the location of the server.

[Live Version](https://www.mannyruiz.com/projects/clonetube) \*video downloading is limited to users with a key.

## Installation

You can clone this repo or download it

```bash
npm install // to install the node modules
npm start // to start running the web app
```

## Features

**Elements with a red text color are upcoming features**

The app count with the next sections on it:

### Sections

**Home:** This view shows the recommended videos of the _Youtube_ home page.

**Video:** It plays the video in a Vanilla made Youtube Video Player Clone, and recommends a group of recommended videos, you also can like or dislike the video, create a playlist or/and add the video to a playlist (you can also do this with the related videos) or you can download the video in a series of formats.

**Search:** You can search a video in the youtube database, it only return 20 search results as it uses web scrapping (***not *Youtube* API***).

**Playlist:** You can manage your created playlists as well as your _Favorites_ and _Watch Later_ playlists.

### Most significant features

- **Youtube Top Loading Bar**
- **Dark and Light Mode**
- **Miniature Video Playing** (navigate through the app while the video is playing in a miniature fixed player)
- **Modals** that position up or down from their parents element depending on the offset space below them.
- **Formatting of numbers**, i.e. current time of a video in seconds to a formatted _mm:ss_ or _hh:mm:ss_ depending of the duration of the video; number of suscribers or likes from _100234_ to _100,200 suscribers_ and _100K_ respectively.
- **Video Player** made from scratch with JS and ReactJS with most of the Youtube Original Video Player.
- **Google User Authentication** implemented with Firebase and Google Sign In.
- **Creation and management of Playlists**, CRUD operations to control your playlists, managed by a MySQL database.
- **Comments and video descriptions**: comments and video descripton section with CRUD operations as well as regex functions to identify timestamps and links.
- **Video player settings modal**

## Upcoming Features

- **Channel Page**: a page to navigate through **YouTube** channels and see all their videos.
- **Drag to reorder playlists**
- **Video queueing**
- **Options modal in search page**
