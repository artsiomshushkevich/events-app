'use server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const create = async (eventId, _prevState, formData) => {
    const email = formData.get('email');
    const name = formData.get('name');
    const comment = formData.get('comment');

    if (
        !email ||
        email.trim() === '' ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !comment ||
        comment.trim() === ''
    ) {
        return {
            errorMessage: 'Please enter a valid email address and comment!'
        };
    }

    await addDoc(collection(db, `events/${eventId}/comments`), {
        email,
        name,
        comment
    });
};
