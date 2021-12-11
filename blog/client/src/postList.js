import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './commentList';

const PostList = () => {

    const [posts, updatePosts] = useState({});

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:4003/posts');
        updatePosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = () => {
        return Object.values(posts).map((post) => {
            return (
                <div key={post.id} className="card" style={{width: '20%', marginBottom: '20px'}}>
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentList commentList={post.comments}/>
                        <CommentCreate postId={post.id} />
                    </div>
                </div>
            )
        });
    }

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">{renderPosts()}</div>
    );
}

export default PostList;