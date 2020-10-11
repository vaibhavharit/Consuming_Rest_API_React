import React, { Component } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';


class NotesAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null
            // notesError: {
            //     title: "",
            //     content: "",
            // },
        }
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (this.validateForm(this.state.notesError)) {
    //       const note = {
    //         title: this.state.title,
    //         content: this.state.content,
    //       };
    //       Axios.post(`http://localhost:3001/notes/`, note)
    //         .then((result) => {
    //           console.log("successfully added a new note");
    //           this.props.history.push("/notes");
    //         })
    //         .catch((error) => console.log("error occured"));
    //     } else {
    //       alert("Invalid entry. Both entries must be grater than 3 characters");
    //     }
    //   };

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            title: this.state.title,
            content: this.state.content
        };
        Axios.post('http://localhost:3001/notes/', note)
            .then(result => {
                console.log("Successfully added a new note");
                this.props.history.push('/notes')
            })
            .catch(error => console.log("There is some error: ", error));
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h3>NotesAdd Component</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Note Title</label>
                        <input type="text"
                            className="form-control"
                            name="title"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Note Content</label>
                        <input type="text"
                            className="form-control"
                            name="content"
                            onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-secondary">Add</button>
                    &nbsp;&nbsp; 
                    <Link className="btn btn-info" to='/notes'>Back to List</Link>
                </form>
            </div>
        )
    }
}

export default NotesAdd;