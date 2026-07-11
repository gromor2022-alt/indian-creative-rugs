"use client";

import { useState } from "react";
import Image from "next/image";
export default function ContactPage() {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setSuccess("");
  setError("");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess("Thank you! Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setError(data.message || "Something went wrong.");
    }
  } catch (err) {
    setError("Unable to send your message. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="bg-[#F7EADF] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        {/* Header */}

        <div className="text-center mb-14">
          <p className="uppercase tracking-[5px] text-[#B68A35] text-sm mb-3">
  CONTACT US
</p>

<h1 className="font-instrument text-[46px] md:text-[68px] text-[#556B2F] mb-6">
  We'd Love To Hear From You
</h1>

<p className="max-w-3xl mx-auto text-lg leading-8 text-[#7B7468]">
  Whether you're looking for a bespoke rug, need design guidance,
  or have a question about an existing order,
  our team is here to help.
</p>
        </div>
{/* Contact Content */}

<div className="grid lg:grid-cols-2 gap-16 items-center">

  {/* Left Image */}

  <div className="overflow-hidden rounded-[30px] shadow-lg">

    <Image
      src="/images/contact/contact-hero.jpg"
      alt="Indian Creative Rugs"
      width={900}
      height={900}
      className="w-full h-[700px] object-cover transition duration-700 hover:scale-105"
    />

  </div>

  {/* Right Form */}

  <div className="bg-white rounded-[30px] p-10 shadow-lg">

    <h2 className="font-instrument text-4xl text-[#556B2F] mb-8">
  Send Us a Message
</h2>

<form onSubmit={handleSubmit} className="space-y-6">

  <div>
    <label className="block text-sm font-medium text-[#556B2F] mb-2">
      Full Name
    </label>

    <input
  type="text"
  placeholder="John Smith"
  value={formData.name}
  onChange={(e) =>
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }
  className="w-full rounded-xl border border-[#DDD6CC] bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-[#B68A35]"
/>
  </div>

  <div>
    <label className="block text-sm font-medium text-[#556B2F] mb-2">
      Email Address
    </label>

    <input
  type="email"
  placeholder="john@example.com"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
  className="w-full rounded-xl border border-[#DDD6CC] bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-[#B68A35]"
/>
  </div>

  <div>
    <label className="block text-sm font-medium text-[#556B2F] mb-2">
      Phone Number
    </label>

    <input
  type="tel"
  placeholder="+91 98765 43210"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value,
    })
  }
  className="w-full rounded-xl border border-[#DDD6CC] bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-[#B68A35]"
/>
  </div>

  <div>
    <label className="block text-sm font-medium text-[#556B2F] mb-2">
      Subject
    </label>

    <input
  type="text"
  placeholder="How can we help you?"
  value={formData.subject}
  onChange={(e) =>
    setFormData({
      ...formData,
      subject: e.target.value,
    })
  }
  className="w-full rounded-xl border border-[#DDD6CC] bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-[#B68A35]"
/>
  </div>

  <div>
    <label className="block text-sm font-medium text-[#556B2F] mb-2">
      Message
    </label>

    <textarea
  rows={6}
  placeholder="Tell us about your requirements..."
  value={formData.message}
  onChange={(e) =>
    setFormData({
      ...formData,
      message: e.target.value,
    })
  }
  className="w-full rounded-xl border border-[#DDD6CC] bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-[#B68A35]"
/>
  </div>

  <button
  type="submit"
  disabled={loading}
  className="w-full rounded-full bg-[#556B2F] py-4 text-white font-medium transition-all duration-300 hover:bg-[#B68A35] disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Sending..." : "Send Message"}
</button>

</form>
{success && (
  <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
    {success}
  </div>
)}

{error && (
  <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
    {error}
  </div>
)}
<div className="mt-10 border-t border-[#E8E2D9] pt-8">

  <h3 className="font-instrument text-2xl text-[#556B2F] mb-6">
    We're Here To Help
  </h3>

  <div className="space-y-5">

    {/* Email */}

    <div>

      <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
        Email
      </p>

      <a
        href="mailto:hello@indiancreativerugs.com"
        className="text-[#556B2F] hover:text-[#B68A35] transition-colors"
      >
        hello@indiancreativerugs.com
      </a>

    </div>

    {/* Phone */}

    <div>

      <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
        Phone
      </p>

      <a
        href="tel:+919984109883"
        className="text-[#556B2F] hover:text-[#B68A35] transition-colors"
      >
        +91 9984109883
      </a>

    </div>

    {/* WhatsApp */}

    <div>

      <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
        WhatsApp
      </p>

      <a
        href="https://wa.me/919984109883"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#556B2F] hover:text-[#B68A35] transition-colors"
      >
        Chat with us on WhatsApp
      </a>

    
    </div>

  </div>

</div>
  </div>

</div>
        
    </section>
</main>
);
}