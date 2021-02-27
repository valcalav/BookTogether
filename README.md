# Book-Club-Project

Search bookclubs to join, meet new pleople and read together !

## API's used

- Goodreads API

## Routes

| Route  | Http verb | Description |
| ------------- | ------------- | ------------- |
| `/`  | GET  | City selection  |
| `/`  | POST  | Send city data  |
| `/bookclubs`  | GET  | Upcoming bookclubs list  |
| `/bookclubs/:genre`   | POST | Upcoming bookclubs list filtered by genre |
| `/bookclubs/details/:_id`  | GET  | Selected upcoming bookclub details |
| `/auth/register`  | GET  | Render sign up form  |
| `/auth/register`  | POST  | Register new client  |
| `/auth/login`  | GET  | Render Log in form |
| `/auth/login`  | POST  | Log user  |
| `/auth/logout`  | GET  | Log out user |  
| `user/profile`  | GET  | Render profile page & artist events |
| `user/edit/:user_id`  | POST  | Edit profile |
| `user/create-bookclub`  | GET  | Render create bookclub form |
| `user/create-bookclub`  | POST  | Create bookclub |
| `user/create-bookclub/edit/:id` | GET  | Render edit bookclub form |
| `user/create-bookclub/edit/:id` | POST  | Update event |
| `user/create-bookclub/delete/:id` | POST  | Delete event |
| `user/admin-page` | GET  | Render admin page |

