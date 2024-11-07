// src/pages/api/create-account.ts
import type { APIRoute } from 'astro';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { projectAuth } from '@/firebase/config';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await createUserWithEmailAndPassword(projectAuth, email, password);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Account creation error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
  }
};
