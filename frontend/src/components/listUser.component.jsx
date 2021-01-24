import React, { Component } from "react";

import Service from "../services/service";

export default class ListUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        Service.getUser()
        .then(res => {
            let users = res.data;
            this.setState({ users });
        })
        .catch(error => console.log(error))
        }

    componentDidUpdate(prevProps) {
        if(this.props.status !== prevProps.status) {
            setTimeout( 
            Service.getUser()
            .then(res => {
                let users = res.data;
                this.setState({ users });
            })
            .catch(error => console.log(error)), 50)
        }
    }
    render() {
        return (
            <div className="component-2">
                <table className="user-table" >
                    <thead>
                        <tr>
                            <th scope="col">Profile Image</th>
                            <th scope="col">Email</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>
                                        <img
                                        src={user.profileImg}
                                        className="profile-img-card-sm"
                                        alt="profile"
                                        />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            );
                            }
                        )};
                    </tbody>
                </table>
            </div>
        );
    };
};