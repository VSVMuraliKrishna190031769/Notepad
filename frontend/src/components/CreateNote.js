import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: response.data.map(user => user.username),
            userSelected: response.data[0].username
        });

        if(this.props.match.params.id) {
            const response = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);

            this.setState({
                title: response.data.title,
                content: response.data.content,
                date: new Date(response.data.date),
                userSelected: response.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: new Date(this.state.date),
            author: this.state.userSelected
        }

        if(this.state.editing){
            await axios.put("http://localhost:4000/api/notes/" + this.state._id, newNote);
        } else {
            await axios.post("http://localhost:4000/api/notes", newNote);
        }
        
        this.props.history.push('/');
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeDate = (date) => {
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create note</h4>
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={this.onInputChange} selected={this.state.userSelected}>
                            {
                                this.state.users.map(user => (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.onInputChange} className="form-control" placeholder="Title" name="title" required value={this.state.title}/>
                    </div>
                    <div className="form-group">
                            <textarea name="content" onChange={this.onInputChange} value={this.state.content} className="form-control" placeholder="Content" required></textarea>
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>

            </div>
        )
    }
}
