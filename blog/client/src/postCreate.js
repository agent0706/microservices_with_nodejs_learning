import React, {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {

    const [postContent, updatePostContent] = useState('');

    const handlePostSubmission = async (event) => {
        event.preventDefault();
        if (postContent.length) {
            await axios.post("http://localhost:4000/posts", {
                title: postContent
            });
            updatePostContent('');
        }
    };
    
    return (
        <div>
            <form> 
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={postContent}
                        className="form-control"
                        onChange={(event) => updatePostContent(event.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handlePostSubmission}>Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;