import React, { useEffect, useState } from 'react';
import './AddComment.scss';
import axios, { AxiosError } from "axios";
import SubmitButton from "../Input/SubmitButton";

const AddComment = () => {

////////////////////////////////////////////////////////==States==//////////////////////////////////////////////////////

    const [comment, setComment] = useState<string>();
    const [error, setError] = useState<AxiosError | null>();

////////////////////////////////////////////////////////==useEffects==///////////////////////////////////////////////////

    useEffect(() => {
        document.addEventListener('scroll', () => {
            setError(null)
        });

        return () => {
            document.removeEventListener('scroll',() => {setError(null)});
        }
    }, []);

////////////////////////////////////////////////////////==Handlers==////////////////////////////////////////////////////

    const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        error && setError(null);
        setComment(e.target.value);
    }

    const sendCommentHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `test.artlist.io/test/testAssignComment`,
            data: {comment: comment}
        })
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            });
        setComment('');
    }
////////////////////////////////////////////////////////==Render==//////////////////////////////////////////////////////

    return (
        <div className="add-comment-container">
            <form onSubmit={sendCommentHandler} onKeyDown={(e) => {
                if(e.key === 'Enter' || e.which === 13 || e.keyCode === 13) {
                    sendCommentHandler(e)
                }
            }}>
                <textarea className="add-comment-input"
                          placeholder="Write a comment..."
                          value={comment}
                          onChange={inputChangeHandler} />

                <SubmitButton
                    className={"submit-comment-btn"}
                    type={"submit"}
                    value={"Send"}
                    disable={!comment} />
            </form>
            {error && <h4>{error?.message}</h4>}
        </div>
    );
};

export default AddComment;