import { auth, db } from "@/lib/firebase";
import { authApi } from "@/stores/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = authApi;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const user = await getDoc(doc(db, "users", currentUser.uid));
        if (user.data()) setUser(user.data());
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { loading, setLoading };
};
