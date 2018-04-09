# Midterm Project
## Where's The Fun? Decision Maker

The WTF Decision Maker is a web app that uses ranked voting to help groups of friends make decisions like, "When's The Fiesta?" or "Where's The Fun?" 

Users create a poll by posing a question, providing options and descriptions, and sharing the poll with friends through a unique share URL. Votes are cast through the share URL using drag and drop voting. Poll admins receive an initial email following the poll creation that contains the admin and share URLs and receive an additional email following each successful vote. At any time, admins can see the options ranked and scored according to voter preference.

Combining user-focused, front-end development with back-end application, server, and database software, this project utilizes HTML, CSS, SASS, JS, jQuery, AJAX, Node, Express, PostgreSQL, and Knex.js.

## Final Product

!["Welcome Screen"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/splash_page.png?raw=true)
!["Create a Poll"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/create_poll.png?raw=true)
!["Email Error Flash Message"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/email_error.png?raw=true)
!["Poll Admin Page"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/admin_page.png?raw=true)
!["Drag and Drop Voting"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/vote_page.png?raw=true)
!["Thank You"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/thank_you.png?raw=true)
!["404 - Error Message"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/error_404.png?raw=true)
!["New Poll Creation Email"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/newpoll_email.png?raw=true)
!["New Vote Received Email"](https://github.com/anhadgill23/Midterm_project/blob/master/public/images/newvote_email.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Run migrations using `npm run knex migrate:latest`
4. Run database seed file using `npm run knex seed:run`
5. Run the server using `npm run local`
6. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Express
- ejs
- body-parser
- dotenv
- flash-messages
- jquery-ui
- knex
- knex-logger
- mailgun-js
- morgan
- node-sass-middleware
- pg
