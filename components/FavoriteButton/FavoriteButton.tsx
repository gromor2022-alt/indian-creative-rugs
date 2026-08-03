"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

const toggleFavorite = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.preventDefault();
  e.stopPropagation();

  setFavorite((prev) => !prev);
};

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorite(!favorite);
      }}
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