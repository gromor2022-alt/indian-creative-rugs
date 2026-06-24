"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "IN",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,

            items: cart.map((item) => ({
              productId: Number(item.id),
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        alert(
          data.message ||
            "Order creation failed"
        );
        return;
      }

      if (data.paymentUrl) {
        window.location.href =
          data.paymentUrl;
        return;
      }

      alert(
        `Order Created #${data.orderId}`
      );
    } catch (error) {
      console.error(error);

      alert("Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <section className="max-w-[1500px] mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-2">
            Secure Checkout
          </p>

          <h1 className="font-instrument text-[52px] text-[#22304A]">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          <div className="bg-white rounded-2xl border border-[#ECE5DA] p-8">
            <h2 className="font-instrument text-[32px] text-[#22304A] mb-8">
              Billing Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg md:col-span-2"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg md:col-span-2"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg md:col-span-2"
              />

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg"
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg"
              />

              <input
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="border border-[#D9D1C7] p-4 rounded-lg md:col-span-2"
              />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-[#ECE5DA] p-7 sticky top-10">
              <h2 className="font-instrument text-[28px] text-[#22304A] mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.shape}`}
                    className="flex gap-4 border-b border-[#ECE5DA] pb-4"
                  >
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.shape} • {item.size}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div>
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="
                  w-full
                  mt-8
                  bg-[#5D5A3D]
                  hover:bg-[#4B482F]
                  text-white
                  py-4
                  rounded-xl
                  transition
                "
              >
                {loading
                  ? "Creating Order..."
                  : "Proceed To PayPal"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}