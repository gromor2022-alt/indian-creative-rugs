import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import Image from "next/image";
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

      {/* Related Rugs */}

      <section className="max-w-[1500px] mx-auto px-8 pb-24 mt-20">

        <h2 className="font-instrument text-[40px] text-[#22304A] text-center mb-12">
          You May Also Like
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white overflow-hidden">

            <Image
              src="/images/persian/rugs1.jpg"
              alt="Persian Collection"
              width={600}
              height={800}
              className="
                w-full
                h-[320px]
                object-cover
                hover:scale-105
                transition
                duration-700
              "
            />

            <div className="p-5">

              <h3 className="font-instrument text-[28px] text-[#22304A]">
                Persian Collection
              </h3>

              <p className="text-gray-500 mt-2">
                Traditional handcrafted elegance.
              </p>

            </div>

          </div>

          <div className="bg-white overflow-hidden">

            <Image
              src="/images/vintage/rugs1.jpg"
              alt="Vintage Collection"
              width={600}
              height={800}
              className="
                w-full
                h-[320px]
                object-cover
                hover:scale-105
                transition
                duration-700
              "
            />

            <div className="p-5">

              <h3 className="font-instrument text-[28px] text-[#22304A]">
                Vintage Collection
              </h3>

              <p className="text-gray-500 mt-2">
                Timeless character and charm.
              </p>

            </div>

          </div>

          <div className="bg-white overflow-hidden">

            <Image
              src="/images/modern/rugs1.jpg"
              alt="Modern Collection"
              width={600}
              height={800}
              className="
                w-full
                h-[320px]
                object-cover
                hover:scale-105
                transition
                duration-700
              "
            />

            <div className="p-5">

              <h3 className="font-instrument text-[28px] text-[#22304A]">
                Modern Collection
              </h3>

              <p className="text-gray-500 mt-2">
                Contemporary luxury for modern homes.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}