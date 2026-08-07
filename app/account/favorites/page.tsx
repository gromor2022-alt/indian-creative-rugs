"use client";

import { useEffect, useState } from "react";

interface FavoriteProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
  collection: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadFavorites();
  }, []);

async function loadFavorites() {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.email) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `/api/favorites?email=${user.email}`
    );

    const data = await res.json();

    if (data.success) {
      setFavorites(data.favorites);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Loading Favorites...
      </div>
    );
  }
async function removeFavorite(productId: number) {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (!user.email) return;

  const res = await fetch("/api/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      productId,
    }),
  });

  const data = await res.json();

  if (data.success) {
    setFavorites((prev) =>
      prev.filter((rug) => rug.id !== productId)
    );
  }
}
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-2">
        My Favorites
      </h1>

      <p className="text-gray-500 mb-10">
        Your saved rugs.
      </p>

      {favorites.length === 0 ? (

  <div className="border rounded-2xl p-10 text-center bg-white">

    <h2 className="text-2xl font-semibold text-[#22304A]">
      No Favorites Yet
    </h2>

    <p className="mt-3 text-gray-500">
      Click the ❤️ icon on any rug to save it here.
    </p>

  </div>

) : (

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {favorites.map((rug) => (

      <div
        key={rug.id}
        className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
      >

        <img
          src={rug.image}
          alt={rug.name}
          className="w-full h-[320px] object-cover"
        />

        <div className="p-6">

          <p className="text-sm uppercase tracking-[2px] text-[#B89B5E] mb-2">
            {rug.collection}
          </p>

          <h2 className="font-instrument text-2xl text-[#22304A] leading-tight">
            {rug.name}
          </h2>

          <p className="text-2xl font-semibold text-[#22304A] mt-4">
            ${rug.price}
          </p>

          <div className="mt-6 flex items-center justify-between">

  <button
    onClick={() => removeFavorite(rug.id)}
    className="w-11 h-11 rounded-full border border-red-200 hover:bg-red-50 transition flex items-center justify-center"
    aria-label="Remove Favorite"
  >
    ❤️
  </button>

  <a
    href={`/rugs/${rug.slug}`}
    className="bg-[#22304A] text-white px-6 py-3 rounded-full hover:bg-[#355E3B] transition"
  >
    View Rug
  </a>

</div>

        </div>

      </div>

    ))}

  </div>

)}
        </div>

      )}

   