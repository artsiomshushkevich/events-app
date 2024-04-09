import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAQat4yLokpM_mE6c1xKwTj9SCsbSFr-WU',
    authDomain: 'events-39550.firebaseapp.com',
    projectId: 'events-39550',
    storageBucket: 'events-39550.appspot.com',
    messagingSenderId: '284962112757',
    appId: '1:284962112757:web:f38677ebb0e2bd71eff1bc'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
