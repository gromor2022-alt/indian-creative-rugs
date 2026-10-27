import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { generateSEO } from "@/lib/seo";
import PriceFrom from "@/components/PriceFrom";
import { notFound } from "next/navigation";

// SEO copy per WooCommerce category slug. Kept static so metadata does not
// need a second (slow) WooCommerce request.
const COLLECTION_SEO: Record<string, { title: string; description: string }> = {
  persian: {
    title: "Persian-Design Rugs, Handmade in India",
    description: "Persian-inspired rugs with intricate motifs and rich borders, handcrafted in India by Indian Creative Rugs.",
  },
  heritage: {
    title: "Heritage Rugs",
    description: "Heritage rugs with traditional motifs and soft, layered palettes, handcrafted by artisans in Bhadohi, India.",
  },
  vintage: {
    title: "Vintage-Inspired Rugs",
    description: "New handmade rugs with a softly aged, vintage look, including Oushak-style designs, made in India.",
  },
  modern: {
    title: "Modern Rugs",
    description: "Contemporary handmade rugs with clean lines and modern patterns, crafted in India for today's interiors.",
  },
  "hand-knotted": {
    title: "Hand-Knotted Rugs",
    description: "Hand-knotted rugs woven knot by knot by artisans in Bhadohi, India. Browse the full hand-knotted collection.",
  },
  tufted: {
    title: "Hand-Tufted Rugs",
    description: "Hand-tufted rugs crafted in India by Indian Creative Rugs, in a range of styles and sizes.",
  },
  "best-seller": {
    title: "Best-Selling Rugs",
    description: "Our most popular handmade rugs, chosen by customers for their design and craftsmanship.",
  },
  "quick-ship-28-35-days": {
    title: "Quick Ship Rugs, Made in 28–35 Days",
    description: "Made-to-order handmade rugs crafted and delivered within 28–35 days.",
  },
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const slug = collection.toLowerCase();
  const seo = COLLECTION_SEO[slug] ?? {
    title: `${titleFromSlug(slug)} Rugs`,
    description: `Explore ${titleFromSlug(slug)} rugs, handcrafted in India by Indian Creative Rugs.`,
  };

  return generateSEO({
    title: seo.title,
    description: seo.description,
    url: `/collections/${slug}`,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
const { collection } = await params;  
const allProducts = await getProducts();

const collectionProducts = allProducts.filter(
  (product: any) =>
    product.collections?.some(
      (category: any) =>
        category.slug?.toLowerCase() === collection.toLowerCase()
    )
);
  if (collectionProducts.length === 0) {
    notFound();
  }

  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="font-instrument text-[64px] text-[#22304A] text-center mb-4 capitalize">
  {collection.replace(/-/g, " ")}
</h1>

        <p className="text-center text-gray-600 mb-16">
          Explore our handcrafted luxury rug collection.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {collectionProducts.map((product: any) => (
            <Link
              key={product.slug}
              href={`/rugs/${product.slug}`}
              className="group"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={800}
                className="w-full h-[500px] object-cover group-hover:opacity-90 transition"
              />

              <h2 className="font-instrument text-[34px] text-[#22304A] mt-6">
                {product.name}
              </h2>

              <PriceFrom className="text-[#22304A] mt-2" />
            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}