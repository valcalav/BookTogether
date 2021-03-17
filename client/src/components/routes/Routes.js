import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import BookClubs from '../pages/Clubs-list-all/BookClubsPage'
import BookClubDetails from '../pages/Club-details/BookClubDetails'
import CreateBookClubsPage from '../pages/Create-book-clubs/CreateBookClubsPage'
import BookClubEditForm from "../pages/Edit-book-clubs/BookClubEditForm"
import Profile from '../pages/Profile/Profile'
import EditProfile from '../pages/Profile/EditProfile'
import ClubDashboard from '../pages/ClubDashboard/ClubDashboard'
import EditMeetingPage from '../pages/EditMeetings/EditMeetingPage'
import EditQuotePost from '../pages/QuotesPosts/EditQuotePostPage'
import BestsellersPage from '../pages/BestsellersPage/BestsellersPage'


const Routes = ({ storeUser, loggedUser, fetchUser }) => {

            return (
                <Switch>
        
                    <Route path="/" exact render={() => <Home loggedUser={loggedUser} />} />
        
                    <Route path="/login" render={props => <Login storeUser={storeUser} {...props} />} />
        
                    <Route path="/signup" render={props => <Signup storeUser={storeUser}  {...props} />} />

                    <Route path="/bestsellers" render={props => <BestsellersPage {...props} />} />
        
                    <Route path="/bookclubs-list" render={() => <BookClubs loggedUser={loggedUser} />} />
        
                    <Route path="/club-details/:bookClub_id" render={props => <BookClubDetails fetchUser={fetchUser} loggedUser={loggedUser} {...props} /> } />
        
                    <Route path="/edit-club/:bookClub_id" render={props => <BookClubEditForm fetchUser={fetchUser} loggedUser={loggedUser} {...props} /> } />
        
                    <Route path="/create-club" render={props => loggedUser ? <CreateBookClubsPage fetchUser={fetchUser} loggedUser={loggedUser} {...props} /> : <Redirect to="/login" />} />
        
                    <Route path="/profile" exact render={(props) => loggedUser ? <Profile fetchUser={fetchUser} loggedUser={loggedUser} {...props}/> : <Redirect to="/" />}/>

                    <Route path="/edit-profile/:reader_id" render={(props) => loggedUser ? <EditProfile fetchUser={fetchUser} loggedUser={loggedUser} {...props}/> : <Redirect to="/" />}/>
        
                    <Route path="/club-dashboard/:bookClub_id" exact render= {props => loggedUser ? <ClubDashboard fetchUser={fetchUser} loggedUser={loggedUser}  {...props}/> : <Redirect to="/login" /> } />

                    <Route path="/edit-meeting/:_id" exact render={props => loggedUser ? <EditMeetingPage loggedUser={loggedUser} {...props} /> : <Redirect to="/login" /> } />

                    <Route path="/edit-quote/:_id" exact render={props => loggedUser ? <EditQuotePost fetchUser={fetchUser} loggedUser={loggedUser} {...props} /> : <Redirect to="/login" /> } />
        
                </Switch>
        
            )
    
}

export default Routes