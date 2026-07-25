export function getTrackingUrl(
  carrier: string,
  trackingNumber: string
) {
  if (!carrier || !trackingNumber) return "#";

  switch (carrier.toLowerCase()) {
    case "fedex":
      return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;

    case "dhl express":
      return `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${trackingNumber}`;

    case "ups":
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;

    case "usps":
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;

    default:
      return "#";
  }
}