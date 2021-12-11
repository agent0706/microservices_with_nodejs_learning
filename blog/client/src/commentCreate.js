import React, {useState} from 'react';
import axios from 'axios';

const CommentCreate = ({postId}) => {

    const [commentContent, updateCommentContent] = useState('');

    const submitComment = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content: commentContent
        });
        updateCommentContent('');
    };

    return (
        <div>
            <form>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        className="form-control"
                        value={commentContent}
                        onChange={(e)=> updateCommentContent(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={submitComment}>Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;