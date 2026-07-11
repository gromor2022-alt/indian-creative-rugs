import WooCommerce from "./woocommerce";

export async function getDashboardStats() {
  try {

    const [ordersResponse] = await Promise.all([
      WooCommerce.get("orders?per_page=5"),
    ]);

    const orders = ordersResponse.data;

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order: any) =>
        order.status === "pending" ||
        order.status === "processing"
    ).length;
const completedOrders = orders.filter(
  (order: any) => order.status === "completed"
).length;
    const revenue = orders.reduce(
      (sum: number, order: any) =>
        sum + Number(order.total),
      0
    );

    return {
  totalOrders,
  pendingOrders,
  completedOrders,
  revenue,
  recentOrders: orders,
};

  } catch (error) {

    console.error("Dashboard Error:", error);

    return {
      totalOrders: 0,
      pendingOrders: 0,
      revenue: 0,
      recentOrders: [],
    };
  }
}
export async function getOrderById(id: string) {
  try {
    const response = await WooCommerce.get(`orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return null;
  }
}
export async function getAllOrders() {
  try {

    const response = await WooCommerce.get("orders?per_page=100");

    return response.data;

  } catch (error) {

    console.error("Orders Fetch Error:", error);

    return [];

  }
}

export async function getCustomers() {
  try {
    const response = await WooCommerce.get("customers?per_page=100");

    return response.data;
  } catch (error) {
    console.error("Customers Fetch Error:", error);
    return [];
  }
}


export async function getCustomerById(id: string) {
  try {
    const response = await WooCommerce.get(`customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Customer Fetch Error:", error);
    return null;
  }
}
