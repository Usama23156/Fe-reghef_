"use client";

import { useEffect } from "react";
import { supabase } from "@/api/client";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      dispatch(
        setUser(
          data.user
            ? { id: data.user.id, email: data.user.email! }
            : null
        )
      );
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(
          setUser(
            session?.user
              ? { id: session.user.id, email: session.user.email! }
              : null
          )
        );
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}