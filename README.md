# Book-Club-Project

Search bookclubs to join, meet new pleople and read together !

## API's used

- Goodreads API

## Routes

| Route  | Http verb | Description |
| ------------- | ------------- | ------------- |
| `/api/bookclubs/allBookClubs`  | GET  | All book clubs list  |
| `/api/bookclubs/:genre`  | GET  | All book clubs list by genre |
| `/api/bookclubs/:bookClub_id`  | GET  | Book club details |
| `/api/bookclubs/newBookClub`  | POST  | Create Book club |
| `/api/bookclubs/editBookClub/:bookClub_id`  | PUT  | Edit Book club |
| `/api/bookclubs/delete/:bookClub_id`  | DELETE  | Delete Book club |
| `/api/quotes/newQuote`  | POST  | Create quotes post |
| `/api/quotes/:user_id`  | GET  | All quotes post filtered by user |
| `/api/quotes/newQuote`  | PUT  | Edit quotes post |
| `/api/quotes/newQuote`  | DELETE  | Delete quotes post |
| `/api/auth/signup`  | POST  | Sign up |
| `/api/auth/login`  | POST  | Log in |
| `/api/auth/logout`  | POST  | Log out |
| `/api/auth/loggedin`  | GET  | Is user logged in |












