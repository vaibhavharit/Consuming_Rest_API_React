import React, { Component } from 'react';
import { BrowserRouter as Router, Link, 
    NavLink, Route, Switch } from "react-router-dom";
import User from './user.component';
import Home from './Home';
import Notes from './notes.components';
import NotesDetail from './notes-detail.components';
import NotesAdd from './notes-add.component';
import NotesEdit from './notes-edit.components';

class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to={'/'} className="navbar-brand">Admin Portal</Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/users'} className="nav-link">Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/notes'} className="nav-link">Notes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/companies'} className="nav-link">Companies</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/products'} className="nav-link">Products</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav> <br />
                        <Switch> 
                            <Route exact path='/' component={Home} />
                            <Route path='/users' component={User} />
                            <Route path='/notes' component={Notes} />
                            <Route path='/notes-add' component={NotesAdd} />
                            <Route path='/notes-detail/:id' component={NotesDetail} />
                            <Route path='/notes-edit/:id' component={NotesEdit} />
                        </Switch>
                    </div>
                </Router>                
            </div>
        )
    }
}

export default Main;