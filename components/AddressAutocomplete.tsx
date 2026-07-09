"use client";

import { useEffect, useRef } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface Props {
  onSelect: (address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
}

export default function AddressAutocomplete({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
const initialized = useRef(false);

  useEffect(() => {
if (initialized.current) return;
initialized.current = true;
    let autocomplete: any;

    async function init() {
      const { GeocoderAutocomplete } = await import(
        "@geoapify/geocoder-autocomplete"
      );

      autocomplete = new GeocoderAutocomplete(
        containerRef.current!,
        process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!,
        {
          placeholder: "Start typing your address...",
        }
      );

      autocomplete.on("select", (location: any) => {
        const p = location.properties;

        onSelect({
          address: p.address_line1 || "",
          city: p.city || "",
          state: p.state || "",
          zipCode: p.postcode || "",
          country: p.country_code
            ? p.country_code.toUpperCase()
            : "",
        });
      });
    }

    init();

    return () => {
      if (autocomplete?.destroy) {
        autocomplete.destroy();
      }
    };
  }, [onSelect]);

  return <div ref={containerRef} />;
}