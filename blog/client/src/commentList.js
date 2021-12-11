import React from 'react';

const CommentList = ({commentList}) => {

    const getCommentContent = (comment) => {
        const {status, content} = comment;
        if (status === 'approved') {
            return `.  ${content}`;
        }
        if (status === 'rejected') {
            return '. This comment is rejected';
        }
        return '. This comment is pending moderation';
    };

    const renderCommentsList = () => {
        return commentList.map((comment) => {
            return (
                <div key={comment.id}>{getCommentContent(comment)}</div>
            );
        }); 
    };

    return (
        <div>
            {renderCommentsList()}
        </div>
    );
};

export default CommentList;