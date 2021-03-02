import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'

const Routes = ({ storeUser, loggedUser }) => {

    return (
        <Switch>
            <Routes path="/" exact render={() => <Home />} />

        </Switch>
    )
}

export default Routes