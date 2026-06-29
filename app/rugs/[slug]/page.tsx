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

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("PAGE SLUG =", slug);
  const product = await getProduct(slug);

console.log("PRODUCT =", product);

if (!product) {
  return <div>No Product Returned</div>;
}

if (product.code) {
  return (
    <div style={{ padding: "50px" }}>
      API ERROR:
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}

  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <div className="max-w-[1500px] mx-auto px-8 py-14">

        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-10">
          Home / Rugs / {product.name}
        </div>

        {/* Product */}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">

          {/* Images */}

          <div>
            <ProductGallery
              images={product.images}
              name={product.name}
            />
          </div>

          {/* Product Info */}

        <ProductDetails product={product} />

         </div>

      </div>

     </main>
  );
}