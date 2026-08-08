"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  productId: number;
}

const STORAGE_KEY = "icr_guest_favorites";

function getGuestFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveGuestFavorites(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorite();
  }, [productId]);

  async function loadFavorite() {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.email) {
        setFavorite(getGuestFavorites().includes(productId));
        return;
      }

      const res = await fetch(
        `/api/favorites?email=${encodeURIComponent(user.email)}`
      );
      const data = await res.json();

      if (data.success) {
        const exists = data.favorites.some(
          (rug: any) => rug.id === productId
        );
        setFavorite(exists);
      }
    } catch (error) {
      console.error("Favorite load error:", error);
    }
  }

  async function toggleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Guests can save favorites locally without an account.
    if (!user.email) {
      const ids = getGuestFavorites();

      if (ids.includes(productId)) {
        saveGuestFavorites(ids.filter((id) => id !== productId));
        setFavorite(false);
      } else {
        saveGuestFavorites([...ids, productId]);
        setFavorite(true);
      }

      return;
    }

    setLoading(true);

    try {
      const endpoint = "/api/favorites";
      const method = favorite ? "DELETE" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          productId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Could not update favorites.");
        return;
      }

      setFavorite(!favorite);
    } catch (error) {
      console.error("Favorite Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={favorite ? "Remove from Favorites" : "Add to Favorites"}
      title={favorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      <Heart
        size={20}
        className={`${styles.heart} ${favorite ? styles.active : ""}`}
        fill={favorite ? "#ef4444" : "transparent"}
      />
    </button>
  );
}
