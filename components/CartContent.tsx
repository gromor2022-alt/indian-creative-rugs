"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartContent() {
  const {
  cart,
  removeFromCart,
  updateQuantity,
} = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <section className="max-w-[1500px] mx-auto px-6 py-16">

      <div className="mb-10">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-2">
          Shopping Bag
        </p>

        <h1 className="font-instrument text-[42px] text-[#22304A]">
          Your Cart
        </h1>

      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

        {/* Cart Items */}

        <div>

          {cart.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

              <h2 className="font-instrument text-[32px] text-[#22304A]">
                Your Cart Is Empty
              </h2>

              <Link
                href="/rugs"
                className="inline-block mt-6 text-[#5D5A3D] hover:text-[#B89B5E]"
              >
                Continue Shopping →
              </Link>

            </div>

          ) : (

            cart.map((item) => (

              <div
                key={`${item.id}-${item.size}-${item.shape}`}
                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-[#ECE5DA]
                  p-5
                  mb-5
                "
              >

                <div className="flex gap-5">

                  <div className="relative w-[130px] h-[170px] rounded-xl overflow-hidden flex-shrink-0">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="flex-1">

                    <h3
                      className="
                        font-instrument
                        text-[24px]
                        leading-tight
                        text-[#22304A]
                      "
                    >
                      {item.name}
                    </h3>

                    <div className="mt-3 space-y-1 text-[14px] text-gray-500">

                      <p>
                        Shape: <span className="text-[#22304A]">{item.shape}</span>
                      </p>

                      <p>
                        Size: <span className="text-[#22304A]">{item.size}</span>
                      </p>

                      <div className="flex items-center gap-3 pt-1">

  <button
    onClick={() =>
      updateQuantity(
        item.id,
        item.size,
        item.shape,
        Math.max(1, item.quantity - 1)
      )
    }
    className="
      w-8
      h-8
      rounded-lg
      border
      border-[#D9D1C7]
      hover:bg-[#F4F0E8]
      transition
    "
  >
    −
  </button>

  <span className="w-6 text-center text-[#22304A]">
    {item.quantity}
  </span>

  <button
    onClick={() =>
      updateQuantity(
        item.id,
        item.size,
        item.shape,
        item.quantity + 1
      )
    }
    className="
      w-8
      h-8
      rounded-lg
      border
      border-[#D9D1C7]
      hover:bg-[#F4F0E8]
      transition
    "
  >
    +
  </button>

</div>

                    </div>

                    <div className="mt-5">

                      <p
                        className="
                          text-[20px]
                          font-medium
                          text-[#5D5A3D]
                        "
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
  onClick={() =>
    removeFromCart(
      item.id,
      item.size,
      item.shape
    )
  }
  className="
    mt-3
    text-sm
    text-gray-400
    hover:text-red-500
    transition
  "
>
  Remove
</button>
                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Summary */}

        <div>

          <div
            className="
              sticky
              top-10
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-[#ECE5DA]
              p-7
            "
          >

            <p
              className="
                uppercase
                tracking-[3px]
                text-[12px]
                text-[#B89B5E]
                mb-6
              "
            >
              Order Summary
            </p>

            <div className="space-y-4 text-[15px]">

              <div className="flex justify-between text-gray-600">

                <span>Subtotal</span>

                <span>${subtotal.toFixed(2)}</span>

              </div>

              <div className="flex justify-between text-gray-600">

                <span>Tax (10%)</span>

                <span>${tax.toFixed(2)}</span>

              </div>

            </div>

            <div className="border-t border-[#ECE5DA] mt-6 pt-6">

              <div className="flex justify-between text-[20px] font-semibold text-[#22304A]">

                <span>Total</span>

                <span>${total.toFixed(2)}</span>

              </div>

            </div>

            <Link
  href="/checkout"
  className="
    block
    w-full
    mt-8
    bg-[#5D5A3D]
    hover:bg-[#4B482F]
    text-white
    py-4
    rounded-xl
    transition
    text-center
  "
>
  Proceed To Checkout
</Link>

            <Link
              href="/rugs"
              className="
                block
                text-center
                mt-5
                text-sm
                text-[#22304A]
                hover:text-[#B89B5E]
              "
            >
              Continue Shopping →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}