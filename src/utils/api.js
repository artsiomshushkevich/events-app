import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAQat4yLokpM_mE6c1xKwTj9SCsbSFr-WU',
    authDomain: 'events-39550.firebaseapp.com',
    projectId: 'events-39550',
    storageBucket: 'events-39550.appspot.com',
    messagingSenderId: '284962112757',
    appId: '1:284962112757:web:f38677ebb0e2bd71eff1bc'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

    console.log(snapshot);

    return formatEvents(snapshot.docs);
}
// export async function getEventById(id) {
//     const allEvents = await getAllEvents();
//     return allEvents.find(event => event.id === id);
// }

// export async function getFilteredEvents(dateFilter) {
//     const { year, month } = dateFilter;

//     const allEvents = await getAllEvents();

//     let filteredEvents = allEvents.filter(event => {
//         const eventDate = new Date(event.date);
//         return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
//     });

//     return filteredEvents;
// }

export function getFilteredEvents(year, month) {
    let filteredEvents = DUMMY_EVENTS.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export function getEventById(id) {
    return DUMMY_EVENTS.find(event => event.id === id);
}
