"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import Select from "react-select";
import countryList from "react-select-country-list";

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

  const countryOptions = useMemo(
    () => countryList().getData(),
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,

          items: cart.map((item) => ({
            productId: Number(item.id),
            quantity: Number(item.quantity),

            // Custom rug configuration
            size: item.size,
            shape: item.shape,

            // Custom price selected by customer
            price: Number(item.price),
          })),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Order creation failed");
        return;
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      alert(`Order Created #${data.orderId}`);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
      alert("Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#F7EADF] min-h-screen">
      <section className="max-w-[1500px] mx-auto px-6 py-16">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-3">
            Secure Checkout
          </p>

          {/* Payment Logos */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/paypal.webp"
                alt="PayPal"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/visa.jpg"
                alt="Visa"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/mastercard.webp"
                alt="Mastercard"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/discover.jpg"
                alt="Discover"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/apple-pay.webp"
                alt="Apple Pay"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 min-w-[64px] items-center justify-center rounded-md border border-[#E3DBD0] bg-white px-3 shadow-sm">
              <Image
                src="/images/payment-logos/klarna.webp"
                alt="Klarna"
                width={70}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>

          <h1 className="font-instrument text-[52px] text-[#22304A]">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">

          {/* Billing Details */}
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
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none md:col-span-2"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none md:col-span-2"
              />

              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (option: { value: string; label: string }) =>
                    option.value === formData.country
                )}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    country: selected?.value || "",
                  })
                }
                placeholder="Select Country"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "58px",
                    borderRadius: "12px",
                    borderColor: "#D9D1C7",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#556B2F",
                    },
                  }),

                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#F7EADF"
                      : "#FFFFFF",
                    color: "#556B2F",
                    cursor: "pointer",
                  }),

                  singleValue: (base) => ({
                    ...base,
                    color: "#556B2F",
                    fontWeight: 500,
                  }),

                  placeholder: (base) => ({
                    ...base,
                    color: "#8B8B8B",
                  }),

                  menu: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    overflow: "hidden",
                    zIndex: 9999,
                  }),
                }}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#556B2F] mb-2">
                  Address
                </label>

                <AddressAutocomplete
                  onSelect={(address) =>
                    setFormData({
                      ...formData,
                      address: address.address,
                      city: address.city,
                      state: address.state,
                      zipCode: address.zipCode,
                      country: address.country,
                    })
                  }
                />
              </div>

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none"
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none"
              />

              <input
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="border border-[#D9D1C7] bg-[#FFFCF8] px-5 py-4 rounded-xl text-[#556B2F] placeholder:text-[#9B9488] transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37]/30 focus:outline-none md:col-span-2"
              />

            </div>
          </div>

          {/* Order Summary */}
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
                        item.price * item.quantity
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

              <div className="mt-6 space-y-3 rounded-xl bg-[#FDFBF7] border border-[#ECE5DA] p-5">

                <div className="flex items-center gap-3 text-[#556B2F]">
                  <span>🔒</span>

                  <span className="text-sm font-medium">
                    256-bit SSL Secure Checkout
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#556B2F]">
                  <span>🚚</span>

                  <span className="text-sm font-medium">
                    No Custom Fees or Duties-- You Pay What You See
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#556B2F]">
                  <span>💳</span>

                  <span className="text-sm font-medium">
                    Secure Payment via PayPal
                  </span>
                </div>

              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="
                  w-full
                  mt-8
                  bg-[#556B2F]
                  hover:bg-[#435522]
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  tracking-[1px]
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:scale-[1.02]
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Creating Secure Checkout..."
                  : "Secure Checkout with PayPal"}
              </button>

              <p className="mt-4 text-center text-sm text-[#7A7468] leading-relaxed">
                Your payment is securely processed through{" "}
                <strong>PayPal</strong>.
                We never store your card or banking information.
              </p>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}