import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const formatComments = docs =>
    docs.map(item => ({
        id: item.id,
        ...item.data()
    }));

export const getAllComments = async eventId => {
    const snapshot = await getDocs(collection(db, `events/${eventId}/comments`));

    return formatComments(snapshot.docs);
};
