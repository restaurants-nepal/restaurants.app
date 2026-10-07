import { Button, Input, Separator, Textarea } from "@chakra-ui/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  PencilLine,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useOrderStore } from "@/features/customer/store/order-store";
import styles from "../pages/table-menu.module.scss";
import { useEffect, useState } from "react";
import { GetCustomerOrderHistory } from "../services/order";
import type { CustomerOrderHistory } from "@/shared/models/customer/customer-model";

interface OrderActionBarProps {
  tableName?: string;
  onConfirm: () => void;
}

const formatPrice = (price: number) => `Rs: ${price.toFixed(2)}`;

const OrderActionBar = ({ tableName, onConfirm }: OrderActionBarProps) => {
  const orderItems = useOrderStore((state) => state.orderItems);
  const kitchenRequest = useOrderStore((state) => state.kitchenRequest);
  const customerName = useOrderStore((state) => state.customerName);
  const customerPhone = useOrderStore((state) => state.customerPhone);
  const isReviewOpen = useOrderStore((state) => state.isReviewOpen);
  const changeQuantity = useOrderStore((state) => state.changeQuantity);
  const setItemQuantity = useOrderStore((state) => state.setItemQuantity);
  const setKitchenRequest = useOrderStore((state) => state.setKitchenRequest);
  const setCustomerName = useOrderStore((state) => state.setCustomerName);
  const setCustomerPhone = useOrderStore((state) => state.setCustomerPhone);
  const setReviewOpen = useOrderStore((state) => state.setReviewOpen);
  const itemCount = orderItems.reduce((total, item) => total + item.qty, 0);
  const subtotal = orderItems.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0,
  );
  const tax = subtotal * 0.08875;
  const serviceCharge = subtotal * 0.1;
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPhoneEditing, setIsPhoneEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"order" | "history">("order");
  const [orderHistory, setOrderHistory] = useState<CustomerOrderHistory[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    if (!isReviewOpen || activeTab !== "history" || !customerPhone.trim()) {
      return;
    }

    let isCurrentRequest = true;
    setIsHistoryLoading(true);
    setHistoryError("");

    GetCustomerOrderHistory(customerPhone.trim())
      .then((history) => {
        if (isCurrentRequest) {
          setOrderHistory(history);
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to load previous orders:", error);
        if (isCurrentRequest) {
          setHistoryError("We couldn't load your previous orders. Please try again.");
        }
      })
      .finally(() => {
        if (isCurrentRequest) {
          setIsHistoryLoading(false);
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [activeTab, customerPhone, isReviewOpen]);

  useEffect(() => {
    if (!isReviewOpen) return;

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, [isReviewOpen]);

  const formatOrderDate = (date: string) => {
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? date
      : parsedDate.toLocaleString();
  };

  return (
    <>
      {isReviewOpen && (
        <button
          className={styles.orderBackdrop}
          type="button"
          aria-label="Close order review"
          onClick={() => setReviewOpen(false)}
        />
      )}
      <div className={styles.orderActionBar}>
        <section
          id="order-review"
          className={`${styles.orderPanel} ${styles.orderReview}`}
          aria-label="Your table order"
          hidden={!isReviewOpen}>
        <div className={styles.orderHeading}>
          <div>
            <h2>
              {activeTab === "order" ? "Your Table Order" : "Previous Orders"}{" "}
              <span className={styles.liveDot} />
            </h2>
            <p>Dining In · {tableName} · Guest Terminal</p>
          </div>
          <div>
            {activeTab === "order" && (
              <span className={styles.itemBadge}>
                {itemCount} {itemCount === 1 ? "Item" : "Items"} Active
              </span>
            )}
            <Button
              variant="plain"
              type="button"
              aria-label="Close order review"
              onClick={() => setReviewOpen(false)}>
              <X size={16} />
            </Button>
          </div>
        </div>
        <div
          className={styles.orderTabs}
          role="tablist"
          aria-label="Order views">
          <button
            className={activeTab === "order" ? styles.orderTabActive : ""}
            id="current-order-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "order"}
            aria-controls="current-order-panel"
            onClick={() => setActiveTab("order")}>
            Order
          </button>
          <button
            className={activeTab === "history" ? styles.orderTabActive : ""}
            id="previous-orders-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "history"}
            aria-controls="previous-orders-panel"
            onClick={() => setActiveTab("history")}>
            Previous Order
          </button>
        </div>
        <div
          id="current-order-panel"
          role="tabpanel"
          aria-labelledby="current-order-tab"
          hidden={activeTab !== "order"}>
          <div className={styles.orderLines}>
          {orderItems.length === 0 ? (
            <div className={styles.cartEmpty}>
              <ShoppingBag size={22} />
              <span>Your order is ready to begin.</span>
            </div>
          ) : (
            orderItems.map((item) => (
              <div
                className={styles.orderLine}
                key={item.id}>
                <div className={styles.orderItemImage}>
                  {item.images[0] ? (
                    <img
                      src={item.images[0]}
                      alt=""
                    />
                  ) : (
                    <ShoppingBag size={16} />
                  )}
                </div>
                <div className={styles.orderItemInfo}>
                  <strong>{item.name}</strong>
                  <div className={styles.quantityControl}>
                    <Button
                      variant="plain"
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => changeQuantity(item, -1)}>
                      <Minus size={12} />
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="plain"
                      type="button"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => changeQuantity(item, 1)}>
                      <Plus size={12} />
                    </Button>
                    <Button
                      variant="plain"
                      className={styles.removeButton}
                      type="button"
                      onClick={() => setItemQuantity(item.id, 0)}>
                      Remove
                    </Button>
                  </div>
                </div>
                <strong className={styles.linePrice}>
                  {formatPrice(Number(item.price) * item.qty)}
                </strong>
              </div>
            ))
          )}
          </div>
        <div style={{ marginTop: "10px" }} />
        <Separator
          variant="dotted"
          size="md"
        />
        <div className={styles.guestDetails}>
          <label className={styles.guestField}>
            <span>Name {isNameEditing ? "option" : ""}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              {isNameEditing || !customerName ? (
                <Input
                  className={styles.guestInput}
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={customerName}
                  onChange={(event) => {
                    if (!isNameEditing) {
                      setIsNameEditing(true);
                    }
                    setCustomerName(event.target.value);
                  }}
                  onBlur={() => setIsNameEditing(false)}
                />
              ) : (
                <span>{customerName}</span>
              )}
              {!isNameEditing && customerName && (
                <PencilLine
                  size="12px"
                  color="blue"
                  onClick={() => setIsNameEditing(true)}
                />
              )}
            </div>
          </label>
          <label className={styles.guestField}>
            <span>Phone number (optional)</span>
            <div style={{ display: "flex", gap: "10px" }}>
              {isPhoneEditing || !customerPhone ? (
                <Input
                  className={styles.guestInput}
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  value={customerPhone}
                  onChange={(event) => {
                    if (!isNameEditing) {
                      setIsPhoneEditing(true);
                    }
                    setCustomerPhone(event.target.value);
                  }}
                  onBlur={() => setIsPhoneEditing(false)}
                />
              ) : (
                <span>{customerPhone}</span>
              )}
              {!isPhoneEditing && customerPhone && (
                <PencilLine
                  size="12px"
                  color="blue"
                  onClick={() => setIsNameEditing(true)}
                />
              )}
            </div>
          </label>
        </div>
        <label
          className={styles.requestLabel}
          htmlFor="kitchen-request">
          <Sparkles size={13} /> Dietary &amp; Kitchen Requests
        </label>
        <Textarea
          variant="outline"
          id="kitchen-request"
          className={styles.requestInput}
          placeholder="e.g. No chives on salmon, serve pizza when drinks arrive..."
          value={kitchenRequest}
          onChange={(event) => setKitchenRequest(event.target.value)}
        />
        <div className={styles.totals}>
          <div>
            <span>Items Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div>
            <span>Estimated Sales Tax (8.875%)</span>
            <strong>{formatPrice(tax)}</strong>
          </div>
          <div>
            <span>Dining Room Service (Optional 10%)</span>
            <strong>{formatPrice(serviceCharge)}</strong>
          </div>
        </div>
        <div className={styles.totalDue}>
          <div>
            <strong>Total Due</strong>
            <small>Settled post meal digitally</small>
          </div>
          <strong>{formatPrice(subtotal + tax + serviceCharge)}</strong>
        </div>
        <Button
          variant="plain"
          className={styles.checkoutButton}
          type="button"
          disabled={itemCount === 0}
          onClick={onConfirm}>
          Review &amp; Send Order to Kitchen <ArrowRight size={16} />
        </Button>
        <p className={styles.paymentNote}>
          Pay at counter or with contactless card anytime after dining
        </p>
        <div className={styles.kitchenStatus}>
          <span>
            <Check size={15} />
          </span>
          <div>
            <strong>Kitchen Load: Normal</strong>
          </div>
          <b>~14 min</b>
        </div>
        </div>
        <div
          id="previous-orders-panel"
          className={styles.previousOrders}
          role="tabpanel"
          aria-labelledby="previous-orders-tab"
          hidden={activeTab !== "history"}>
          {!customerPhone.trim() ? (
            <div className={styles.cartEmpty}>
              <ShoppingBag size={22} />
              <span>Add your phone number in the Order tab to see past orders.</span>
            </div>
          ) : isHistoryLoading ? (
            <div
              className={styles.cartEmpty}
              role="status">
              <span>Loading previous orders...</span>
            </div>
          ) : historyError ? (
            <div
              className={styles.cartEmpty}
              role="alert">
              <span>{historyError}</span>
              <Button
                variant="plain"
                type="button"
                onClick={() => setActiveTab("order")}>
                Check phone number
              </Button>
            </div>
          ) : orderHistory.length === 0 ? (
            <div className={styles.cartEmpty}>
              <ShoppingBag size={22} />
              <span>No previous orders were found.</span>
            </div>
          ) : (
            orderHistory.map((order) => (
              <article
                className={styles.previousOrder}
                key={order.orderNumber}>
                <div className={styles.previousOrderHeading}>
                  <strong>Order {order.orderNumber}</strong>
                  <span>{formatOrderDate(order.orderDate)}</span>
                </div>
                <div className={styles.previousOrderItems}>
                  {order.menuItems.map((item, index) => (
                    <div
                      className={styles.previousOrderItem}
                      key={`${item.name}-${index}`}>
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <strong>{formatPrice(item.subTotal)}</strong>
                    </div>
                  ))}
                </div>
                {order.discountAmount > 0 && (
                  <div className={styles.previousOrderTotal}>
                    <span>Discount</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className={styles.previousOrderTotal}>
                  <span>Tax</span>
                  <span>{formatPrice(order.taxAmount)}</span>
                </div>
                <div className={styles.previousOrderTotal}>
                  <span>Total</span>
                  <strong>{formatPrice(order.totalAmount)}</strong>
                </div>
              </article>
            ))
          )}
        </div>
        </section>
        <Button
          variant="plain"
          className={styles.orderActionToggle}
          type="button"
          aria-expanded={isReviewOpen}
          aria-controls="order-review"
          onClick={() => setReviewOpen(!isReviewOpen)}>
          <span>
            <ShoppingBag size={17} />
            <strong>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </strong>
            <span>{formatPrice(subtotal)}</span>
          </span>
          <span>
            {isReviewOpen ? "Hide order" : "Review order"}
            {isReviewOpen ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
          </span>
        </Button>
      </div>
    </>
  );
};

export default OrderActionBar;
