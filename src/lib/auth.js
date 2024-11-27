import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
export async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export async function signOut() {
    try {
        await firebaseSignOut(auth);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
