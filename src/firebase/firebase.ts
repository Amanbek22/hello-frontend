import firebase from "firebase";
import config from "./firebase.config";

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth;

export function signInFirebase(number: string, verify: any) {
  return auth().signInWithPhoneNumber(number, verify);
}
export async function signInFirebaseWithEmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
export function Logout() {
  return auth().signOut();
}
