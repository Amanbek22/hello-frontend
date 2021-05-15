import firebase from "firebase";
import config from "./firebase.config";

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth;

export function signInFirebase(number: string, verify: any) {
  return auth().signInWithPhoneNumber(number, verify);
}

export function Logout() {
  return auth().signOut();
}
