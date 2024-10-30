// src/actions/createAccount.ts
import { projectAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createAccount(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(projectAuth, email, password);
    return { success: true };
  } catch (error) {
    console.error("Create account error:", error);
    return { success: false, error };
  }
}
