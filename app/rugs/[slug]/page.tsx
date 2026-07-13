import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import { productSchema } from "@/lib/schema";
import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return generateSEO({
    title: product.name,
    description:
      product.short_description?.replace(/<[^>]+>/g, "") ||
      product.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      "Luxury Handmade Rug from Indian Creative Rugs.",

    url: `/rugs/${product.slug}`,

    image:
      product.images?.[0]?.src ||
      "/og-image.jpg",

    keywords: [
      product.name,
      "Handmade Rug",
      "Luxury Rug",
      "Indian Rug",
      "Area Rug",
      "Persian Rug",
      "Oushak Rug",
      "Vintage Rug",
      "Home Decor",
    ],
  });
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }
const schema = productSchema(product);
  return (
    <main className="bg-[#FFFFFF] min-h-screen">
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema),
  }}
/>
      <div className="max-w-[1500px] mx-auto px-8 py-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <ProductGallery
            images={product.images}
            name={product.name}
          />

          <ProductDetails
            product={product}
          />
        </div>
      </div>
    </main>
  );
}