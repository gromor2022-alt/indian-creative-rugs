"use client";

import { useState } from "react";

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#D9D1C7] py-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-xl text-[#22304A] font-medium">
          {question}
        </h3>

        <span className="text-3xl text-[#22304A]">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-6 text-[#22304A]/80 leading-8 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}