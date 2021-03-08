import { Component } from 'react'
import './App.css';

import Routes from './routes/Routes'
import NavBar from './layout/Navbar'
// import Footer from './layout/Footer'
import AuthService from '../service/auth.service'

class App extends Component {
  constructor(){
    super()
    this.state = {
      fetchUserStart: false,
      loggedUser: undefined,
    }
    this.authService = new AuthService()
  }

  storeUser(loggedUser) {
    this.setState({ loggedUser }, () => console.log("User:", this.state.loggedUser))
  }

  fetchUser() {

    this.authService
      .isLoggedIn()
      .then(response => {
        this.storeUser(response.data)
        this.setState({ fetchUserStart: true })
      })
      .catch(() => this.storeUser(undefined))
  }

  componentDidMount() {
    this.fetchUser()
  }

  reRender(){
    window.location.reload()
  }

  render() {
    return(
      <>
        <NavBar storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
        <main>
          <Routes fetchUserStart={this.state.fetchUserStart} reRender={this.reRender} storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
        </main>
        
      </>
    )
  }

}

export default App;
