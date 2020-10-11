import React, { Component } from 'react';
import axios from "axios";

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    getUsers() {
        axios.get(`http://jsonplaceholder.typicode.com/users`)
            .then(result => {
                const userList = result.data;
                this.setState({ users: userList })
                console.log(this.state.users)
            })
            .catch(error => console.log("There is some error: ", error));
    } 

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div>
                <h3>User Component</h3>
                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>User Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue.id}</td>
                                    <td>{listValue.name}</td>
                                    <td>{listValue.email}</td>
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}
