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
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch {
    alert("Invalid email or password");
    throw new Error("Invalid email or password");
  }
}

export async function signOutUser() {
  return signOut(auth);
}