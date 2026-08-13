import { ProductLookup } from "./product-repository";

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  image: string;
  slug: string;
  size: string | null;
  shape: string | null;
}

export interface CustomerOrder {
  id: number;
  number: string;
  status: string;
  total: string;
  currency: string;
  orderDate: string;
  expectedShipDate: string | null;
  trackingNumber: string | null;
  carrier: string | null;
  pickupDate: string | null;
  items: OrderItem[];
}

function getAttribute(meta: any[] = [], keys: string[]) {
  for (const item of meta) {

    const metaKey = String(
      item.key ?? item.display_key ?? ""
    ).toLowerCase();

    const wanted = keys.map((k) => k.toLowerCase());

    if (wanted.includes(metaKey)) {
      return (
        item.display_value ??
        item.value ??
        null
      );
    }
  }

  return null;
}

function getMetaValue(meta: any[] = [], key: string) {
  const item = meta.find(
    (m) =>
      m.key === key ||
      m.display_key === key
  );

  return (
    item?.display_value ??
    item?.value ??
    null
  );
}
 

export function transformOrder(
  order: any,
  productMap: Map<number, ProductLookup>
): CustomerOrder {
  return {
    id: order.id,
    number: order.number,
    status: order.status,
    total: order.total,
    currency: order.currency,
    orderDate: order.date_created,

    expectedShipDate: getMetaValue(order.meta_data, "_icr_ship_date"),
    trackingNumber: getMetaValue(order.meta_data, "_icr_tracking_number"),
    carrier: getMetaValue(order.meta_data, "_icr_carrier"),
    pickupDate: getMetaValue(order.meta_data, "_icr_pickup_date"),

    items: (order.line_items || []).map((item: any) => {
      const product = productMap.get(item.product_id);

      return {
        productId: item.product_id,
        name: item.name,
        quantity: item.quantity,

        image:
          product?.image ??
          "/images/persian/rugs1.jpg",

        slug:
          product?.slug ??
          "",

        size: getAttribute(item.meta_data, [
          "Size",
          "size",
          "attribute_pa_size",
          "pa_size",
        ]),

        shape: getAttribute(item.meta_data, [
          "Shape",
          "shape",
          "attribute_pa_shape",
          "pa_shape",
        ]),
      };
    }),
  };
}