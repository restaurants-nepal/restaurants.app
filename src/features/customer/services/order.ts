import apiInstance from "@/shared/api/baseApi";
import type { CustomerOrderModel } from "@/shared/models/customer/customer-model";

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
