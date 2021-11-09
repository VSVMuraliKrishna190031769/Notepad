import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    state = {
        users: [],
        username: ''
    }

    getUsers = async () => {
        const response = await axios.get('http://localhost:4000/api/users');
        this.setState({users: response.data}); 
    }

    async componentDidMount(){
        this.getUsers();
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post("http://localhost:4000/api/users", { 
            username: this.state.username
        });
        this.setState({ username: '' })
        this.getUsers();
    }

    deleteUser = async (id) => {
        const response = await axios.delete("http://localhost:4000/api/users/" + id);
        this.getUsers();
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" value={this.state.username} className="form-control" onChange={this.onChangeUsername} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" >
                                    <div className="btn-group w-100" role="group">
                                        <button type="button" className="btn text-left text-black">{user.username}</button>
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                        </div>
                                    </div>
                                    
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
