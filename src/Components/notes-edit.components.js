import React, { Component } from 'react';
import axios from "axios";


class NotesEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            title: null,
            content: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/notes/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    note: result.data,
                    title: result.data.title,
                    content: result.data.content
                });
                console.log(this.state.note);
            })
            .catch(error => console.log("There is some error: ", error));

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            id: this.props.match.params.id,
            title: this.state.title,
            content: this.state.content
        };
        axios.put('http://localhost:3001/notes/' + note.id, note)
            .then(result => {
                console.log("Successfully updated existing note");
                this.props.history.push('/notes')
            })
            .catch(error => console.log("There is some error: ", error));
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h3>Notes Edit Component</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Note Title</label>
                        <input type="text"
                            className="form-control"
                            name="title"
                            value = {this.state.title || ''}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Note Content</label>
                        <input type="text"
                            className="form-control"
                            name="content"
                            value = {this.state.content || ''}
                            onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-secondary">Add</button>
                </form>
            </div>
        )
    }
}

export default NotesEdit;