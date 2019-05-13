import React from 'react';

import './InterestsManagerComponent.css';

class InterestsManagerComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {post: props.post, allowedToPost: true, showWait: false, onInterestClicked: props.onInterestClicked}
    }

    render() {
        return <div className="interests-manager">
            <h5>Click on an interest to post about it</h5>
            {this.state.showWait ? <p className="text-danger" style={{fontWeight: 'bold'}}>Please wait just a few seconds to post...</p> : null}
            <div className="grid-container">
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Gardening</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Paper Towels</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Anti-Vaxx</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Anti-Anti-Vaxx</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>GDPR</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Kardashians</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Memes</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Zane and Evan</a></div>
              <div className="grid-item grow"><a href="#click" onClick={((e) => this.onClick(e))}>Fringed Carpets</a></div>
            </div>
            <br/>
        </div>;
    }

    onClick(e) {
        e.preventDefault()

        if (!this.state.allowedToPost) {
            const currentState = this.state
            currentState.showWait = true
            this.setState(currentState)
            return;
        }

        this.state.post(e.target.innerHTML)
        this.state.onInterestClicked(e.target.innerHTML) // report for "ad tracking"

        const currentState = this.state
        currentState.allowedToPost = false
        this.setState(currentState)

        setTimeout(() => {
            const currentState = this.state
            currentState.allowedToPost = true
            currentState.showWait = false
            this.setState(currentState)
        }, 5000)
    }

}

export default InterestsManagerComponent;
