"use client";

import { Loader } from "@/components";
import { auth, db } from "@/lib/firebase";
import { authApi } from "@/stores/auth";
import { useInitialStores } from "@/stores/init";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  useInitialStores();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        const user = await getDoc(doc(db, "users", currentUser.uid));
        if (user.data()) authApi.setUser(user.data());
      } else authApi.setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading)
    return (
      <div className="h-screen grid place-content-center">
        <Loader />
      </div>
    );
  return <div>{children}</div>;
};

export { Layout };
