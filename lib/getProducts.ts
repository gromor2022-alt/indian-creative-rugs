export async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
}