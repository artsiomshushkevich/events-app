'use client';
import { useState } from 'react';

import { CommentList } from './CommentList';
import { NewComment } from './NewComment';
import classes from './Comments.module.css';

export const Comments = props => {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments(prevStatus => !prevStatus);
    }

    return (
        <section className={classes.comments}>
            <button className={classes.expandButton} onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment eventId={eventId} />}
            {showComments && <CommentList eventId={eventId} />}
        </section>
    );
};
