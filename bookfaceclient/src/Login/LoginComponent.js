import React from 'react';
import loginLogo from '../loginLogo.png';

import './LoginComponent.css';

import uuidv4 from 'uuid/v4';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {onLogin: props.onLogin, join: props.join, name: null, picture: "Dahl", showNameError: false}
    }

    render() {
        return (
            <div className="loginHolder">
                <form className="form-signin">
                  <img className="mb-4" src={loginLogo} alt="" style={{paddingRight: 50}} onDragStart={(e) => e.preventDefault()} />

                  {this.state.showNameError ? <p className="text-danger" style={{fontWeight: 'bold'}}>You must type a name.</p> : null}
                  <input type="name" id="inputName" className="form-control" placeholder="Type your name" autoComplete="off" onChange={(e) => this.onValueChanged(e)}/>

                  <br/>

                  <p style={{fontWeight: 'bold', marginBottom: 0}}>Select a profile picture</p>
                  <p style={{marginBottom: 25}}>{this.state.picture}</p>

                  <div className="pictureHolder">
                    <img id="Dahl" className="selected" src="../Dahl.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Zuckerberg" src="../Zuckerberg.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Thanos" src="../Thanos.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Trump" src="../Trump.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Doge" src="../Doge.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Obama" src="../Obama.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Squidward" src="../Squidward.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Pam" src="../Pam.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Queen Elizabeth" src="../Queen Elizabeth.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />
                    <img id="Hillary" src="../Hillary.png" onClick={this.onPictureChanged.bind(this)} onDragStart={(e) => e.preventDefault()} />

                  </div>

                  <br/>
                  <br/>

                  <button className="btn btn-lg btn-block" type="submit" onClick={this.onLogin.bind(this)}>Sign in</button>
                </form>
            </div>
        )
    }

    onPictureChanged(e) {
        const parent = e.target.parentElement;

        parent.childNodes.forEach((child) => {
            child.classList.remove("selected");
        })

        e.target.classList.add("selected");

        const currentState = this.state
        currentState.picture = e.target.id
        this.setState(currentState)
    }

    onValueChanged(e) {
        if (e.target.id === "inputName") {
            const currentState = this.state
            currentState.name = e.target.value
            currentState.showNameError = false
            this.setState(currentState)
        }
    }

    onLogin(e) {
        e.preventDefault();

        if (this.state.name === null) {
            const currentState = this.state
            currentState.showNameError = true
            this.setState(currentState)
            return;
        }

        e.target.disabled = true;
        e.target.innerHTML = "Signing in...";

        this.state.join(uuidv4(), this.state.name, this.state.picture, (user, posts, adsEnabled, dataEnabled) => {
            this.state.onLogin(user, posts, adsEnabled, dataEnabled)
        });
    }

}

export default LoginComponent;
