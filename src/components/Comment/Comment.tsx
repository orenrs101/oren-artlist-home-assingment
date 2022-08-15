import React from 'react';
import './Comment.scss';
import { IComment } from "../../entities/models";

const Comment: React.ForwardRefExoticComponent<ICommentProps> =
    React.forwardRef(({ comment }, ref: React.Ref<HTMLDivElement>) => (
        <div className="comment-container" ref={ref}>
            <h4 className="comment-email">{comment.email}:</h4>
            <p className="comment-body">{comment.body}</p>
        </div>
    ));

export default Comment;

export interface ICommentProps {
    comment: IComment
    ref?: React.Ref<HTMLDivElement>;
}