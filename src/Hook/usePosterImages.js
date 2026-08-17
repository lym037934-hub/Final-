// src/Hook/usePosterImages.js
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function usePosterImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const docRef = doc(db, "PC123", "wYOQcaT9VJvrqP1V8Ime");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // grab every field's value (IMG, IMG1, IMG2, IMG3...) as an array
          const urls = Object.values(data).filter(Boolean);
          setImages(urls);
        } else {
          setError(new Error("Poster document not found"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  return { images, loading, error };
}