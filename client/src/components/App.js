import { Component } from 'react'
import './App.css';

import Routes from './routes/Routes'
import NavBar from './layout/Navbar'
import Footer from './layout/Footer'
import AuthService from '../service/auth.service'

class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedUser: undefined,
    }
    this.authService = new AuthService()
  }

  storeUser(loggedUser) {
    console.log(loggedUser)
    this.setState({ loggedUser }, () => console.log("User:", this.state.loggedUser))
  }

  fetchUser() {
    this.authService
      .isLoggedIn()
      .then(response => this.storeUser(response.data))
      .catch(() => this.storeUser(undefined))
  }

  componentDidMount() {
    this.fetchUser()
  }


  render() {
    return(
      <>
        <NavBar className="nav-bar" storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
        <main>
          <Routes fetchUser={()=> this.fetchUser()} storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
        </main>
        <Footer />
      </>
    )
  }

}

export default App;
