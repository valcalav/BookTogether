import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import BookClubs from '../pages/Clubs-list-all/BookClubsPage'
import BookClubsByGenre from '../pages/Clubs-list-by-genre/ClubsListByGenre'
import BookClubDetails from '../pages/Club-details/BookClubDetails'
import CreateBookClubsPage from '../pages/Create-book-clubs/CreateBookClubsPage'
import BookClubEditForm from "../pages/Edit-book-clubs/BookClubEditForm"
import Profile from '../pages/Profile/Profile'
import EditProfile from '../pages/Profile/EditProfile'
import ClubDashboard from '../pages/ClubDashboard/ClubDashboard'

const Routes = ({ storeUser, loggedUser, fetchUser }) => {

            return (
                <Switch>
        
                    <Route path="/" exact render={() => <Home loggedUser={loggedUser} />} />
        
                    <Route path="/login" render={props => <Login storeUser={storeUser} {...props} />} />
        
                    <Route path="/signup" render={props => <Signup storeUser={storeUser}  {...props} />} />
        
                    <Route path="/bookclubs-list" render={() => <BookClubs loggedUser={loggedUser} />} />
        
                    <Route path="/bookclubs-genre-list/:genre" render={props => <BookClubsByGenre loggedUser={loggedUser} {...props} /> } />
        
                    <Route path="/club-details/:bookClub_id" render={props => <BookClubDetails fetchUser={fetchUser} loggedUser={loggedUser} {...props} /> } />
        
                    <Route path="/edit-club/:bookClub_id" render={props => <BookClubEditForm loggedUser={loggedUser} {...props} /> } />
        
                    <Route path="/create-club" render={props => loggedUser ? <CreateBookClubsPage loggedUser={loggedUser} {...props} /> : <Redirect to="/login" />} />
        
                    <Route path="/profile" exact render={(props) => loggedUser ? <Profile fetchUser={fetchUser} loggedUser={loggedUser} {...props}/> : <Redirect to="/login" />}/>

                    <Route path="/edit-profile/:user_id" render={(props) => loggedUser ? <EditProfile loggedUser={loggedUser} {...props}/> : <Redirect to="/login" />}/>
        
                    <Route path="/club-dashboard/:bookClub_id" render= {props => loggedUser ? <ClubDashboard loggedUser={loggedUser}  {...props}/> : <Redirect to="/login" /> } />
        
                </Switch>
        
            )
    
}

export default Routes