'use client';
import { useEffect, useState } from 'react';
import { getAllComments } from '@/models/comments';
import classes from './CommentList.module.css';

export const CommentList = ({ eventId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const init = async () => {
            setComments(await getAllComments(eventId));
        };

        init();
    }, [eventId]);

    useEffect(() => {
        const handler = async () => {
            setComments(await getAllComments(eventId));
        };

        window.addEventListener('CommentCreated', handler);

        return () => {
            window.removeEventListener('CommentCreated', handler);
        };
    }, [eventId]);

    return (
        <ul className={classes.comments}>
            {comments.map(item => (
                <li key={item.id}>
                    <p>{item.comment}</p>
                    <div>
                        By <address>{item.email}</address>
                    </div>
                </li>
            ))}
        </ul>
    );
};
