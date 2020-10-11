import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


class NotesDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note: {}
        };
    }

    deleteNote(id) {
        console.log(id);
        axios.delete('http://localhost:3001/notes/' + id)
        .then(result => {
            console.log("Note deleted with ID: " + id);
            this.props.history.push('/notes')
        })
        .catch(error => console.log("There is some error: ", error));
    }

    componentDidMount() {
        axios.get('http://localhost:3001/notes/' + this.props.match.params.id)
        .then(result => {
            this.setState({note: result.data});
            console.log(this.state.note);
        })
        .catch(error => console.log("There is some error: ", error));
    }

    render() {
        return (
            <div>
                <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.note.title}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Notes Title</th>
                                    <td>{this.state.note.title}</td>
                                </tr>
                                <tr>
                                    <th>Notes Content</th>
                                    <td>{this.state.note.content}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link className="btn btn-info" to='/notes'>Back to List</Link>
                                        &nbsp;&nbsp;
                                        <Link className="btn btn-secondary" to={`/notes-edit/${this.state.note._id}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                        <button onClick={this.deleteNote.bind(this, this.state.note._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default NotesDetail;