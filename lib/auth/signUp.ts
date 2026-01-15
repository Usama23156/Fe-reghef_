import { supabase } from "@/api/client";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const signUp = async ({
  name,
  email,
  password,
  phone,
}: SignUpData) => {
  // 1️⃣ إنشاء حساب Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // 2️⃣ حفظ البيانات الإضافية
  const userId = data.user?.id;

  if (!userId) throw new Error("User not created");

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      name,
      phone,
    });

  if (profileError) throw profileError;
};