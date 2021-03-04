import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import BookClubs from '../pages/Clubs-list-all/Book-clubs'
import BookClubsByGenre from '../pages/Clubs-list-by-genre/Book-clubs-by-genre'
import BookClubDetails from '../pages/Club-details/Book-club-details'
import BookClubForm from "../pages/Create-book-clubs/Book-club-create-form"
import BookClubEditForm from "../pages/Create-book-clubs/Book-club-edit-form"
import Profile from '../pages/Profile/Profile'

const Routes = ({ storeUser, loggedUser }) => {

    return (
        <Switch>

            <Route path="/" exact render={() => <Home loggedUser={loggedUser} />} />

            <Route path="/login" render={props => <Login storeUser={storeUser} {...props} />} />

            <Route path="/signup" render={props => <Signup storeUser={storeUser}  {...props} />} />

            <Route path="/bookclubs-list" render={() => <BookClubs loggedUser={loggedUser} />} />

            <Route path="/bookclubs-genre-list/:genre" render={props => <BookClubsByGenre loggedUser={loggedUser} {...props} /> } />

            <Route path="/club-details/:bookClub_id" render={props => <BookClubDetails loggedUser={loggedUser} {...props} /> } />

            <Route path="/edit-club/:bookClub_id" render={props => <BookClubEditForm loggedUser={loggedUser} {...props} /> } />

            <Route path="/create-club" render={props => loggedUser ? <BookClubForm loggedUser={loggedUser} {...props} /> : <Redirect to="/login" />} />


            <Route path="/profile" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/login" />} />

        </Switch>

    )
}

export default Routes