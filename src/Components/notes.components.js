import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    getNotes() {
        axios.get(`http://localhost:3001/notes`)
            .then(result => {
                const notesList = result.data;
                this.setState({ notes: notesList })
                console.log(this.state.notes)
            })
            .catch(error => console.log("There is some error: ", error));
    } 

    componentDidMount() {
        this.getNotes();
    }

    render() {
        return (
            <div>
                <h4>Manage Notes</h4>
                <br/>
                <Link to='/notes-add' className="btn btn-secondary">Add New Note</Link>
                <br/><br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Notes Tilte</th>
                            <th>Notes Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.notes.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue._id}</td>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.content}</td>
                                    <td>
                                        {/* <Link to={`/notes-detail/${listValue._id}`}>Show Details</Link> */}
                                        <Link to={'/notes-detail/' + listValue._id}>Show Details</Link>
                                    </td>
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}
