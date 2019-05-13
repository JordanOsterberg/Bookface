import React from 'react';

import LoginComponent from './Login/LoginComponent.js'

import InterestsManagerComponent from './Interests/InterestsManagerComponent.js'
import DataComponent from './Data/DataComponent.js'
import PostManagerComponent from './Posts/PostManagerComponent.js'

import FadeIn from './FadeIn.js'

import navLogo from './navLogo.png';

import { join, post, subscribeToPosts, subscribeToAds, sendInterestData, subscribeToAdminIntervention } from './SocketIO.js';

import './ContainerComponent.css';

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class ContainerComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {isLoggedIn: false, posts: [], interests: {}, showData: false, adsEnabled: false, showUsername: false}
    }

    render() {
        if (!this.state.isLoggedIn) {
            return <LoginComponent onLogin={this.onLogin.bind(this)} join={join} />
        }

        const adOne = this.calculateAdSource(1)
        const adTwo = this.calculateAdSource(2)

        return (
            <FadeIn>
                <nav className="navbar sticky-top navbar-expand-lg navbar-light center">
                    <a className="navbar-brand" href="#brand" style={{marginRight: 6}}>
                        <img src={navLogo} width="30" height="30" className="d-inline-block align-top" alt="" style={{marginRight: 10}}/>
                        Bookface
                    </a>
                    <span className="navbar-text">
                        {this.state.user.name}
                    </span>
                </nav>

                {this.state.showUsername ? <h1 style={{padding: 12, fontWeight: 'bold', color: 'red'}}>{this.state.user.name}</h1> : null}

                {this.state.adsEnabled && !isEmpty(this.state.interests) ? <FadeIn><div id="ad-holder">
                    <img className="ad ad-left" src={adOne} />
                    <img className="ad ad-right" src={adTwo} />
                </div></FadeIn> : null}

                <div className="small-container">
                  <InterestsManagerComponent post={post} onInterestClicked={this.onInterestClicked.bind(this)} />
                  {this.state.showData ?
                      <FadeIn>
                        <DataComponent interests={this.state.interests} deleteData={this.deleteData.bind(this)} />
                      </FadeIn> : null}
                  <PostManagerComponent posts={this.state.posts} subscribeToPosts={subscribeToPosts} />
                </div>
          </FadeIn>
        )
    }

    calculateAdSource(column) {
        const interests = this.state.interests;

        if (isEmpty(interests)) {
            return ""
        }

        var items = Object.keys(interests).map(function(key) {
          return [key, interests[key]];
        });

        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        if (items.length === 0) {
            return ""
        }

        if (items.length === 1) {
            return "../" + items[0][0] + "Ad.png"
        }

        const index = column === 1 ? 0 : 1;
        const item = items[index][0];

        return "../" + item + "Ad.png"
    }

    onInterestClicked(interest) {
        const currentState = this.state

        let interests = currentState.interests

        if (interests[interest] !== undefined) {
            interests[interest] = interests[interest] + 1
        } else {
            interests[interest] = 1
        }

        this.setState(currentState)

        sendInterestData(interest, interests[interest])
    }

    onLogin(user, posts, adsEnabled, dataEnabled) {
        const currentState = this.state
        currentState.posts = posts
        currentState.user = user
        currentState.isLoggedIn = true
        currentState.showData = dataEnabled
        currentState.adsEnabled = adsEnabled
        this.setState(currentState)

        subscribeToAdminIntervention((uuid) => {
            if (uuid !== user.uuid) {
                return
            }

            // Show Username
            const currentState = this.state
            currentState.showUsername = true
            this.setState(currentState)
        }, (uuid) => {
            // Delete User
            if (uuid !== user.uuid) {
                return
            }

            window.location.reload()
        });

        subscribeToAds(() => {
            // Show ads
            const currentState = this.state
            currentState.adsEnabled = true
            this.setState(currentState)
        }, () => {
            // Hide ads
            const currentState = this.state
            currentState.adsEnabled = false
            this.setState(currentState)
        }, () => {
            // Show data
            const currentState = this.state
            currentState.showData = true
            this.setState(currentState)
        }, () => {
            // Hide data
            const currentState = this.state
            currentState.showData = false
            this.setState(currentState)
        })
    }

    deleteData(interest) {
        const currentState = this.state

        let interests = currentState.interests
        delete interests[interest]
        this.setState(currentState)

        console.log(this.state)
    }

}

export default ContainerComponent;
