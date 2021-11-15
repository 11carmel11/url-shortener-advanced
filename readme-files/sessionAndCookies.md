## Local Storage

### explain:

The localStorage read-only property of the window interface allows you to access a Storage object
for the Document's origin; the stored data is saved across browser sessions.

### example:

```
localStorage.setItem("name", "ofer");
console.log(localStorage.getItem("name"));
localStorage.removeItem("name");
```

## Session Storage:

### explain:

sessionStorage is similar to localStorage; the difference is that while data in localStorage
doesn't expire, data in sessionStorage is cleared when the page session ends.

### example:

```
sessionStorage.setItem("name", "ofer");
console.log(sessionStorage.getItem("name"), "session");
sessionStorage.removeItem("name");
```

## Cookies:

### explain:

An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to
a user's web browser. The browser may store the cookie and send it back to the
same server with later requests.
mainly used for three purposes:

1. Session management
   Logins, shopping carts, game scores, or anything else the server should remember

2. Personalization
   User preferences, themes, and other settings

3. Tracking
   Recording and analyzing user behavior
   example:

### example:

```
document.cookie = "id=a3fWa; Expires=Wed, 21 Oct 2022 07:28:00 GMT";
```

## In Class:

1. We will build a simple api to work with cookies
2. We will build a server to example working with JWT

## Task:

### We will rely on your `url shortener` exercise.

### You **must** open a new repo for this drill (The reason is that we are testing the exercise these days and we want to avoid mistakes while testing)

### End-goal url shortener system with registration and login authentication which relies on the `jsonwebtoken` directory from NPM.

1. Clone your `url shortener` repo into a new one.
2. Please convert your data to rely on Mongodb on the cloud.
3. If you do not have one - create a user scheme.
4. Create a registration form and login form.
5. When a new user registers we will save it in our database and transfer him/her to the login form.
6. When an existing user logs in, we use the `jsonwebtoken` directory to issue him a token that will allow him to use our system.
7. Only a user after login will be able to use our system
8. Save the token in the browser's local-storage

### Clarifications

1. We strongly recommend that you encrypt the password before storing it in the database
2. A validation check must be performed on the user when registering and logging in.

### Bonus:

1. Create functionality that will allow the user to stay connected for an hour from the time of login. Even if the tab closes, the user will be recognized as soon as he enters the site again
