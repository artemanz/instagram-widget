import { auth, db } from "@/lib/firebase";
import { authApi } from "@/stores/auth";
import { TFirebaseWidget } from "@/stores/feed";
import { TWidget } from "@/stores/widget";
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
        const userData = user.data();
        if (userData) {
          const feed: TWidget[] = [];
          if (userData.feed) {
            const result = await Promise.all(
              userData.feed.map(async (w: any) => {
                const snap = await getDoc(w);
                console.log(snap.exists())
                if (snap.exists()) {
                  const data = snap.data() as TFirebaseWidget;
                  return {
                    id: snap.id,
                    ...data,
                    created: data.created.toDate(),
                  };
                }
              })
            );
            feed.push(...result);
          }
          setUser({
            id: user.id,
            ...user.data(),
            feed,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { loading, setLoading };
};
