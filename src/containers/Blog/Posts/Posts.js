import React from 'react';
import axios from 'axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends React.Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        console.log(this.props);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Dam'
                    };
                });

                this.setState({ posts: updatedPosts });
            }).catch(err => {
                console.log(err);
                // this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/' + id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;