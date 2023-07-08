<img src="./assets/img/readme-header.png" alt="ArtiLinks logo" />


# **ArtiLinks** - Bookmark Manager

Read this in other languages: [Русский](./README.ru.md), [English](./README.md).


## Project idea:

---

The application solves the problem of storing & categorizing links to useful online-services.

**Deployment** [here](https://artilinks.vercel.app/).


## Implemented functionality:

---

1. Registration with email confirmation & Authorization
1. Password recovery via email
1. Categorization of links (groups & collections):
    - **Group** is a container that stores a set of collections
    - **Collection** is a container that stores the links
    - Example: _Programming_ is a group, _Javascript_ is a collection
1. Full-fledged **CRUD** API for the groups & collections
1. Ability to change a group of a created collection
1. Automatic data scraping of resources:
    - Retrieving favicons, titles, descriptions, and domain names
1. Links searching functionality within the considered collection:
    - Search is made by the link title & the resource domain
1. Error notifications


## Used technologies:

---

| Technology             | Description |
|------------------------|----------|
| NextJS                 | React server-side rendering framework |
| jsonwebtoken           | User Registration & Authentication |
| nodemailer             | Email confirmation & Password recovery |
| MongoDB/Mongoose       | Cloud-based database |
| axios                  | API requests of client & server sides |
| open-graph-scraper     | Data scraping of resources |
| react-transition-group | Animations of rendered components |

## Difficulties encountered & Interesting task:

---

The most time consuming and interesting part was developing the JWT authentication/registration. This approach was new to me, so I had to spend a lot of time searching for information about how to write such functionality correctly. In the end, I implemented a separate service class to handle **refresh/access-tokens**. The main problem was access-token update in the case when user sent a request to the API-protected route, being authenticated, but having an already expired access-token. I found out that the **axios** library supports **interceptor functionality**, which have solved my problem. With an expired access-token, my server returns a **401 authorization error**, in the interceptor response from the server I catch this type of error, send a request to update the tokens, and then try to repeat the original request.

## Screenshots and videos:

---

### **Youtube** video with functionality demonstration:

<div style="display: flex; justify-content: center;">
    <a href="https://youtu.be/69W3Q3u83dg">
        <img style="max-width: 500px; width: 100%;" src="./assets/img/youtube-thumbnail.png" alt="Video Thumbnail" />
    </a>
</div>

### Main page screen:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/main.png" alt="Landing Page Main Screen" />
</div>

<div style="display: flex; justify-content: center; margin-top: 20px">
    <img style="max-width: 800px; width: 100%;" src="./assets/videos/landing-page-scrolling.gif" alt="Landing Page Scrolling" />
</div>


### Registration & Login:

<div style="display: flex; justify-content: space-around;">
    <img style="max-width: 550px; width: 100%;" src="./assets/img/registration.png" alt="Registration Screen" />
    <img style="max-width: 550px; width: 100%;" src="./assets/img/login.png" alt="Login Screen" />
</div>


### Password Recovering:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/password-recover.png" alt="Password Recovering Screen" />
</div>


### Error Notifications:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 800px; width: 100%;" src="./assets/img/error-notification.png" alt="Error Notification Screen" />
</div>


### Dashboard View:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/dashboard-1.png" alt="Dashboard Screen" />
</div>

<div style="display: flex; justify-content: center; margin-top: 20px">
    <img style="max-width: 900px; width: 100%;" src="./assets/videos/functionality-demonstration.gif" alt="Functionality Demonstration" />
</div>


### Bookmark Editing:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/bookmark-editing.png" alt="Bookmark Editing Screen" />
</div>


### Collection Creation:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/collection-creation.png" alt="Collection Creation Screen" />
</div>


### Available Dialogs:

<div style="display: flex; justify-content: center;">
    <img style="max-width: 900px; width: 100%;" src="./assets/img/dialogs.png" alt="Available Dialogs" />
</div>