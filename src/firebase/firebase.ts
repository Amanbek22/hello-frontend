import firebase from "firebase";
import config from '../../configs/firebase.config'


firebase.initializeApp(config)

export const auth = firebase.auth;

export function signInFirebase(email:string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function Logout() {
    return auth().signOut()
}