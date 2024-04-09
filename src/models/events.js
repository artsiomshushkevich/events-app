import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

function formatEvents(events) {
    return events.map(item => ({
        id: item.id,
        ...item.data()
    }));
}

export async function getAllEvents() {
    const snapshot = await getDocs(collection(db, 'events'));

    return formatEvents(snapshot.docs);
}

export async function getFeaturedEvents() {
    const q = query(collection(db, 'events'), where('isFeatured', '==', true));

    const snapshot = await getDocs(q);

    return formatEvents(snapshot.docs);
}

export async function getEventById(id) {
    const docRef = doc(db, 'events', id);

    const snapshot = await getDoc(docRef);

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
}

export async function getFilteredEvents(year, month) {
    const q = query(
        collection(db, 'events'),
        where('date.year', '==', year),
        where('date.month', '==', month)
    );

    const snapshot = await getDocs(q);

    return formatEvents(snapshot.docs);
}
