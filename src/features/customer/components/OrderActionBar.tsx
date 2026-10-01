import { Button, Textarea } from "@chakra-ui/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useOrderStore } from "@/features/customer/store/order-store";
import styles from "../pages/table-menu.module.scss";

interface OrderActionBarProps {
  tableName?: string;
  onConfirm: () => void;
}

const formatPrice = (price: number) => `Rs: ${price.toFixed(2)}`;

const OrderActionBar = ({ tableName, onConfirm }: OrderActionBarProps) => {
  const orderItems = useOrderStore((state) => state.orderItems);
  const kitchenRequest = useOrderStore((state) => state.kitchenRequest);
  const isReviewOpen = useOrderStore((state) => state.isReviewOpen);
  const changeQuantity = useOrderStore((state) => state.changeQuantity);
  const setItemQuantity = useOrderStore((state) => state.setItemQuantity);
  const setKitchenRequest = useOrderStore((state) => state.setKitchenRequest);
  const setReviewOpen = useOrderStore((state) => state.setReviewOpen);
  const itemCount = orderItems.reduce((total, item) => total + item.qty, 0);
  const subtotal = orderItems.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0,
  );
  const tax = subtotal * 0.08875;
  const serviceCharge = subtotal * 0.1;

  return (
    <div className={styles.orderActionBar}>
      <section
        id="order-review"
        className={`${styles.orderPanel} ${styles.orderReview}`}
        aria-label="Your table order"
        hidden={!isReviewOpen}>
        <div className={styles.orderHeading}>
          <div>
            <h2>
              Your Table Order <span className={styles.liveDot} />
            </h2>
            <p>Dining In · {tableName} · Guest Terminal</p>
          </div>
          <span className={styles.itemBadge}>
            {itemCount} {itemCount === 1 ? "Item" : "Items"} Active
          </span>
          <Button
            variant="plain"
            type="button"
            aria-label="Close order review"
            onClick={() => setReviewOpen(false)}>
            <X size={16} />
          </Button>
        </div>
        <div className={styles.orderLines}>
          {orderItems.length === 0 ? (
            <div className={styles.cartEmpty}>
              <ShoppingBag size={22} />
              <span>Your order is ready to begin.</span>
              <small>Add a dish to see it here.</small>
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
  );
};

export default OrderActionBar;
