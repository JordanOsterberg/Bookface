import React from 'react';

import './PostComponent.css';

class PostComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {post: props.post}
    }

    render() {
        const picture = "../../../" + this.state.post.author.picture + ".png";

        if (this.state.post.type === "join" || this.state.post.type === "leave") {
            return <div className="post media">
                <img src={picture} className="mr-3" alt="..." onDragStart={(e) => e.preventDefault()} />
                <div className="media-body">
                    <p style={{fontWeight: 'bold', marginTop: 23}}>{this.state.post.author.name} {this.state.post.type === "join" ? "joined" : "left"} Bookface.</p>
                </div>
            </div>
        }

        return <div className="post media">
            <img src={picture} className="mr-3" alt="..." onDragStart={(e) => e.preventDefault()} />
            <div className="media-body">
                <h4>{this.state.post.author.name}</h4>

                {this.renderBody()}
            </div>
        </div>
    }

    renderBody() {
        if (this.state.post.type === "video") {
            return this.renderVideo()
        } else if (this.state.post.type === "text"){
            return this.renderText()
        } else if (this.state.post.type === "image") {
            return this.renderImage()
        }

        return this.renderText()
    }

    renderVideo() {
        let newText = (this.state.post.text || "").split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });

        return (
            <div>
                <div>{newText}</div>
                <br/>
                <iframe alt="Video for the post" width="560" height="315" src={this.state.post.mediaUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <br/>
                <br/>
            </div>
        )
    }

    renderText() {
        let newText = (this.state.post.text || "").split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });

        return (
            <div>{newText}</div>
        )
    }

    renderImage() {
        let newText = (this.state.post.text || "").split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });

        return (
            <div>
                <div>{newText}</div>
                <img className="meme" src={this.state.post.mediaUrl} alt="Meme!" style={{marginTop: 10, marginBottom: 15}} onDragStart={(e) => e.preventDefault()} />
            </div>
        )
    }

}

export default PostComponent;
