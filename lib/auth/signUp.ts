import { supabase } from "@/api/client";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const signUp = async ({ name, email, password, phone }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // لو user مش موجود (email confirmation)
  if (!data.user) return;

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      name,
      phone,
    });

  if (profileError) throw profileError;
};