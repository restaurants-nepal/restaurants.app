import apiInstance from "@/shared/api/baseApi";
import type {
  CustomerOrderHistory,
  CustomerOrderModel,
} from "@/shared/models/customer/customer-model";

export const CreateCustomerOrder = async (
  customerOrder: CustomerOrderModel,
) => {
  try {
    const response = await apiInstance.post(
      "/v1/customer-order",
      customerOrder,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer order:", error);
    throw error;
  }
};

export const GetCustomerOrderHistory = async (
  phoneNumber: string,
): Promise<CustomerOrderHistory[]> => {
  try {
    const response = await apiInstance.get<
      CustomerOrderHistory[] | { data: CustomerOrderHistory[] }
    >(`/v1/order-histry/${encodeURIComponent(phoneNumber)}`);

    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching customer order history:", error);
    throw error;
  }
};
