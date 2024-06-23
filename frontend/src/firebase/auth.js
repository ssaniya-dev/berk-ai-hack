import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export async function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return signOut(auth);
}
