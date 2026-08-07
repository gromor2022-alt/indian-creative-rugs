"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({
  productId,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.email) {
      alert("Please login to save favorites.");
      return;
    }

    setLoading(true);

    try {
      if (!favorite) {
        await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            productId,
          }),
        });

        setFavorite(true);
      } else {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            productId,
          }),
        });

        setFavorite(false);
      }
    } catch (error) {
      console.error("Favorite Error:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  loadFavorite();
}, []);

async function loadFavorite() {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.email) return;

    const res = await fetch(
      `/api/favorites?email=${user.email}`
    );

    const data = await res.json();

    if (!data.success) return;

    const exists = data.favorites.some(
      (rug: any) => rug.id === productId
    );

    setFavorite(exists);

  } catch (error) {
    console.error(error);
  }
}
  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label="Add to Favorites"
    >
      <Heart
        size={20}
        className={`${styles.heart} ${
          favorite ? styles.active : ""
        }`}
        fill={favorite ? "#ef4444" : "transparent"}
      />
    </button>
  );
}