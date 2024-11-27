import { auth } from './';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as SignOut
} from '/auth';

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  try {
    await SignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
}