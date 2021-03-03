import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { NavLink, Link } from 'react-router-dom'

import AuthService from './../../service/auth.service'

const NavBar = ({ storeUser, loggedUser }) => {
    const authService = new AuthService()

    const logoutUser = () => {

        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }

    return (
        <Navbar bg="light" expand="lg">
            <Link to="/">
                <Navbar.Brand>BookTogether</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <NavLink to="/bookclubs-list">
                    <Nav.Link as="span">Book Clubs</Nav.Link>
                </NavLink>
                <NavLink to="/">
                    <Nav.Link as="span">About us</Nav.Link>
                </NavLink>

                {
                    loggedUser ?
                    <>
                        <NavDropdown alignRight title={loggedUser.firstName} id="basic-nav-dropdown">
                            <NavLink to="/profile">
                                <NavDropdown.Item as="span">Profile</NavDropdown.Item>
                            </NavLink>
                            <NavLink to="/">
                                <NavDropdown.Item as="span">My Book Clubs</NavDropdown.Item>
                            </NavLink>
                            <NavLink to="/create-club">
                                <NavDropdown.Item as="span">Create Book Club</NavDropdown.Item>
                            </NavLink>
                        </NavDropdown>

                            <Nav.Link as="span" onClick={() => logoutUser()}>Log out</Nav.Link>
                    </>
                    :
                    <>
                        <NavLink to="/login">
                            <Nav.Link as="span">Log in</Nav.Link>
                        </NavLink>
                        <NavLink to="/signup">
                            <Nav.Link as="span">Register</Nav.Link>
                        </NavLink>
                    </>
                }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar