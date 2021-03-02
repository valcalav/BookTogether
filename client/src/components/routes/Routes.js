import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import BookClubs from '../pages/Book-clubs/Book-clubs'

const Routes = ({ storeUser, loggedUser }) => {

    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/login" render={props => <Login storeUser={storeUser} {...props} />} />
            <Route path="/signup" render={props => <Signup storeUser={storeUser}  {...props} />} />

            <Route path="/bookclubs-list" render={() => <BookClubs loggedUser={loggedUser} />} />

        </Switch>

    )
}

export default Routes