import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC68sXhhEVaiU8h8KATncqPL5UmQ_4sz9Q",
    authDomain: "crwn-db-6eee6.firebaseapp.com",
    databaseURL: "https://crwn-db-6eee6.firebaseio.com",
    projectId: "crwn-db-6eee6",
    storageBucket: "crwn-db-6eee6.appspot.com",
    messagingSenderId: "133340285472",
    appId: "1:133340285472:web:8f7fe98ba93b7bade70a45",
    measurementId: "G-RCSSSWC11F"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user: ', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;