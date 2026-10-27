"use client";

import { useEffect, useRef } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface Props {
  /** Called when the customer picks a suggested address. */
  onSelect: (address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
  /** Called on every keystroke, so a typed address is kept even if no suggestion is picked. */
  onInputChange?: (text: string) => void;
}

export default function AddressAutocomplete({ onSelect, onInputChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // The Geoapify widget is created once, so its event listeners must not
  // capture the callbacks from the first render (that froze an empty copy of
  // the form and wiped fields typed before the address). Always call the
  // latest callbacks through refs instead.
  const onSelectRef = useRef(onSelect);
  const onInputChangeRef = useRef(onInputChange);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onInputChangeRef.current = onInputChange;
  }, [onSelect, onInputChange]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autocomplete.on("select", (location: any) => {
        const p = location?.properties;
        if (!p) return;

        onSelectRef.current({
          address: p.address_line1 || "",
          city: p.city || "",
          state: p.state || "",
          zipCode: p.postcode || "",
          country: p.country_code
            ? p.country_code.toUpperCase()
            : "",
        });
      });

      autocomplete.on("input", (text: string) => {
        onInputChangeRef.current?.(text ?? "");
      });
    }

    init();

    return () => {
      if (autocomplete?.destroy) {
        autocomplete.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
