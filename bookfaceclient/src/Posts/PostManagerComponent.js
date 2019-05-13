import React from 'react';
import PostComponent from './PostComponent.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './PostManagerComponent.css';

class PostManagerComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {posts: props.posts || []}
        // this.state = {posts: [{type: "image", topic: "meme", author: {name: "Jordan Osterberg"}}]}

        props.subscribeToPosts((post) => {
            const currentState = this.state
            currentState.posts.unshift(post)
            this.setState(currentState)
        });
    }

    render() {
        return <div className="posts-container" style={{marginBottom: 15}}>
            <ReactCSSTransitionGroup
              transitionName="postTransition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>

              {this.state.posts.map((post, index) => {
                  return (
                      <PostComponent key={post.id} post={post} />
                  )
              })}

            </ReactCSSTransitionGroup>
        </div>
    }

}

export default PostManagerComponent;
