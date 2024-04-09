'use client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { create } from '@/app/actions/comments';
import { SubmitButton } from '../UI/SubmitButton';
import classes from './NewComment.module.css';

const initialState = {
    email: '',
    name: '',
    comment: ''
};

export const NewComment = ({ eventId }) => {
    const createCommentWithEventId = create.bind(null, eventId);
    const [state, formAction] = useFormState(createCommentWithEventId, initialState);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const commentRef = useRef(null);

    return (
        <form className={classes.form} action={formAction}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your email</label>
                    <input type='email' id='email' name='email' required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' name='name' required ref={nameRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor='comment'>Your comment</label>
                <textarea id='comment' rows='5' name='comment' required ref={commentRef}></textarea>
            </div>
            {state?.errorMessage && <p>{state.errorMessage}</p>}
            <SubmitButton
                onSubmitted={() => {
                    nameRef.current.value = '';
                    emailRef.current.value = '';
                    commentRef.current.value = '';

                    window.dispatchEvent(new CustomEvent('CommentCreated'));
                }}
            >
                Submit
            </SubmitButton>
        </form>
    );
};
