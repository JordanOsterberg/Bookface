import React from 'react'

import navLogo from '../navLogo.png'

import './AdminComponent.css'

import { adminEnableAds, adminDisableAds, adminEnableData, adminDisableData, subscribeToUsers, adminResetSystem, socket } from '../SocketIO.js'

class AdminComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: []
        }

        subscribeToUsers((users) => {
            this.setState({users: users})

            console.log(users)
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-light center">
                    <a className="navbar-brand" href="#brand" style={{marginRight: 6}}>
                        <img src={navLogo} width="30" height="30" className="d-inline-block align-top" alt="" style={{marginRight: 10}}/>
                        Bookface
                    </a>
                    <span className="navbar-text">
                        Admin
                    </span>
                </nav>

                <div className="small-container">
                    <div className="adminGrid">
                        <h1><button type="button" className="btn btn-outline-primary" onClick={(e) => this.enableAds() }>Enable Ads</button></h1>
                        <h1><button type="button" className="btn btn-outline-primary" onClick={(e) => this.disableAds() }>Disable Ads</button></h1>
                        <h1><button type="button" className="btn btn-outline-primary" onClick={(e) => this.enableGDPR() }>Enable GDPR</button></h1>
                        <h1><button type="button" className="btn btn-outline-primary" onClick={(e) => this.disableGDPR() }>Disable GDPR</button></h1>
                        <h1><button type="button" className="btn btn-outline-primary" onClick={(e) => this.resetSystem() }>Reset System</button></h1>
                    </div>
                    <br/>
                    <br/>
                    <h5 style={{marginBottom: 10, fontWeight: 'bold'}}>Users</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <td scope="col"><strong>Name</strong></td>
                                <td scope="col"><strong>Primary Interest</strong></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => {
                                let items = Object.keys(user.interests).map(function(key) {
                                  return [key, user.interests[key]];
                                });

                                items.sort(function(first, second) {
                                  return second[1] - first[1];
                                });

                                return (
                                    <tr key={user.uuid}>
                                        <th><img src={"../../" + user.picture + ".png"} style={{maxWidth: 50, marginRight: 10}}/> <p style={{marginTop: 10, display: 'inline'}}>{user.name}</p></th>
                                        <td>{items.length === 0 ? "" : items[0][0]}</td>
                                        <td><button type="button" className="btn btn-outline-primary" onClick={(e) => socket.emit("adminShowUsername", user.uuid)}>Display Username</button></td>
                                        <td><button type="button" className="btn btn-outline-primary" onClick={(e) => socket.emit("adminDeleteUser", user.uuid)}>Remove User</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    enableAds() {
        adminEnableAds();
    }

    disableAds() {
        adminDisableAds();
    }

    enableGDPR() {
        adminEnableData();
    }

    disableGDPR() {
        adminDisableData();
    }

    resetSystem() {
        adminResetSystem();
    }

}

export default AdminComponent;
