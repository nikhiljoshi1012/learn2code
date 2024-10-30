// src/actions/logoutAccount.ts
import { projectAuth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export async function logoutAccount() {
  try {
    await signOut(projectAuth);
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
}
