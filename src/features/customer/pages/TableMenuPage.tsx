import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Box, Button, Flex, Grid, Input } from "@chakra-ui/react";
import {
  BellRing,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
  Search,
  Utensils,
  X,
} from "lucide-react";
import styles from "./table-menu.module.scss";
import { useSharedStorage } from "@/shared/store/shared-store";
import type { RestaurantContext } from "@/shared/models/restaurant-context-model";
import { useShallow } from "zustand/react/shallow";
import type { MenuItemModel } from "@/shared/models/menu-item/menu-item-model";
import { useOrderStore } from "@/features/customer/store/order-store";
import OrderActionBar from "@/features/customer/components/OrderActionBar";
import { socket } from "@/shared/api/socket";

const formatPrice = (price: number) => `Rs: ${price.toFixed(2)}`;

const TableMenuPage = () => {
  // Real Code
  const data = useLoaderData() as RestaurantContext;
  // const menuItems = mockMenuItems;

  const setSharedStorage = useSharedStorage((state) => state.setSharedStorage);
  const {
    restaurant,
    table,
    menuItems: resMenuItems,
  } = useSharedStorage(
    useShallow((state) => ({
      restaurant: state.restaurantContext?.restaurant,
      table: state.restaurantContext?.table,
      menuItems: state.restaurantContext?.menuItems,
    })),
  );

  // UseEffect

  useEffect(
    function fetchRestContext() {
      setSharedStorage((state) => {
        state.restaurantContext = data;
      });
    },
    [data, setSharedStorage],
  );
  const tableName = table?.display_name;
  const categories = [
    "All Items",
    ...new Set(resMenuItems?.map((i) => i.category)),
  ];

  const navigation = useNavigation();
  // Mock Code
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [photoIndexes, setPhotoIndexes] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState("");
  const [waiterCalled, setWaiterCalled] = useState(false);
  const orderItems = useOrderStore((state) => state.orderItems);
  const changeQuantity = useOrderStore((state) => state.changeQuantity);
  const setReviewOpen = useOrderStore((state) => state.setReviewOpen);
  const resId = restaurant?.id;

  useEffect(() => {
    if (!waiterCalled) return;

    const timeoutId = window.setTimeout(() => setWaiterCalled(false), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [waiterCalled]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit("waiter:join", {
      resId,
    });

    return () => {
      socket.off("waiter:called");
    };
  }, [resId]);

  const filteredItems = resMenuItems?.filter((item) => {
    const matchesSearch = `${item.name} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All Items" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const changePhoto = (item: MenuItemModel, direction: number) => {
    if (item.images.length === 0) return;

    setPhotoIndexes((current) => ({
      ...current,
      [item.id]:
        ((current[item.id] ?? 0) + direction + item.images.length) %
        item.images.length,
    }));
  };

  if (navigation.state === "loading") {
    return <div>Loading menu...</div>;
  }

  const handleCallWaiter = () => {
    // Send the event to the server with table info
    socket.emit("customer:call-waiter", {
      resId,
      tableId: table?.id,
      tableNumber: tableName,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <Box
      as="main"
      className={styles.page}>
      <Box
        as="header"
        className={styles.header}>
        <Flex className={styles.headerInner}>
          <a
            className={styles.brand}
            href="#menu"
            aria-label="The Grand Bistro menu">
            <span className={styles.brandMark}>
              <Utensils size={17} />
            </span>
            <span className={styles.brandCopy}>
              <strong>{restaurant?.name}</strong>
              <small>{restaurant?.description}</small>
            </span>
          </a>
          <div className={styles.tablePill}>
            <span />
            {tableName}
          </div>
          <label className={styles.searchBox}>
            <Search size={16} />
            <Input
              variant="outline"
              aria-label="Search dishes and ingredients"
              placeholder="Search dishes, ingredients"
              className={styles.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <Button
                variant="plain"
                className={styles.clearSearch}
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}>
                <X size={14} />
              </Button>
            )}
          </label>
          <Button
            variant="plain"
            className={styles.waiterButton}
            type="button"
            disabled={waiterCalled}
            onClick={() => {
              setWaiterCalled(true);
              handleCallWaiter();
            }}>
            <BellRing size={15} />
            <span>{waiterCalled ? "Waiter called" : "Call waiter"}</span>
          </Button>
        </Flex>
      </Box>

      {/* <Box className={styles.filterBar}>
        <Flex className={styles.filterInner}>
          {filterOptions.map((filter) => (
            <Button
              variant="plain"
              key={filter}
              type="button"
              className={`${styles.filterChip} ${activeFilter === filter ? styles.filterActive : ""}`}
              onClick={() => setActiveFilter(filter)}>
              {filter === "All offerings" && <Sparkles size={12} />}
              {filter}
            </Button>
          ))}
        </Flex>
      </Box> */}

      <Box
        as="nav"
        className={styles.categoryBar}
        aria-label="Menu categories">
        <Flex className={styles.categoryInner}>
          {categories.map((category) => (
            <Button
              variant="plain"
              key={category}
              type="button"
              className={`${styles.categoryTab} ${activeCategory === category ? styles.categoryActive : ""}`}
              onClick={() => setActiveCategory(category)}>
              {category}
              {category === "All Items" && (
                <span>({resMenuItems?.length})</span>
              )}
            </Button>
          ))}
          <span className={styles.averageTime}>
            <Clock3 size={12} /> Avg course interval: 14 min
          </span>
        </Flex>
      </Box>

      <Grid
        className={styles.content}
        id="menu"
        templateColumns="minmax(0, 1fr)"
        gap={{ base: 4, lg: 5 }}
        alignItems="start">
        <Box
          as="section"
          className={styles.menuColumn}>
          {/* <Flex className={styles.introBanner}>
            <div>
              <span className={styles.eyebrow}>Autumn degustation menu</span>
              <h1>Curated Seasonal Selections</h1>
              <p>
                Every dish is orchestrated synchronously with our hearth &
                garde-manger.
                <br className={styles.desktopBreak} /> Direct digital orders
                prioritize your ticket with Table position.
              </p>
            </div>
            <div className={styles.venueNote}>
              <span className={styles.venueIcon}>
                <Utensils size={17} />
              </span>
              <span>
                <strong>Patio & Dining Hall</strong>
                <small>Atmosphere: Jazz & Ambient</small>
              </span>
            </div>
          </Flex> */}

          <Grid
            className={styles.itemGrid}
            templateColumns={{
              base: "minmax(0, 1fr)",
              md: "repeat(3, minmax(0, 2fr))",
            }}>
            {filteredItems?.map((item) => {
              const photoIndex =
                item.images.length > 0
                  ? (photoIndexes[item.id] ?? 0) % item.images.length
                  : 0;
              const orderQuantity =
                orderItems.find((orderItem) => orderItem.id === item.id)?.qty ??
                0;
              return (
                <article
                  className={styles.menuCard}
                  key={item.id}>
                  <div className={styles.photoFrame}>
                    {item.images[photoIndex] && (
                      <img
                        src={item.images[photoIndex]}
                        alt={`${item.name} photo ${photoIndex + 1}`}
                      />
                    )}
                    {/* <div className={styles.badges}>
                      {item.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className={
                            badge === "Vegetarian"
                              ? styles.lightBadge
                              : styles.darkBadge
                          }>
                          {badge}
                        </span>
                      ))}
                    </div> */}
                    {item.images.length > 1 && (
                      <>
                        <Button
                          variant="plain"
                          className={`${styles.galleryArrow} ${styles.galleryPrev}`}
                          type="button"
                          aria-label={`Previous ${item.name} photo`}
                          onClick={() => changePhoto(item, -1)}>
                          <ChevronLeft size={17} />
                        </Button>
                        <Button
                          variant="plain"
                          className={`${styles.galleryArrow} ${styles.galleryNext}`}
                          type="button"
                          aria-label={`Next ${item.name} photo`}
                          onClick={() => changePhoto(item, 1)}>
                          <ChevronRight size={17} />
                        </Button>
                      </>
                    )}
                    {item.images.length > 0 && (
                      <span className={styles.photoCount}>
                        {photoIndex + 1} / {item.images.length} photos
                      </span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>
                      <span>
                        <Clock3 size={12} />{" "}
                        {item.estimated_preparation_time_minutes} prep
                      </span>
                      {/* <span className={styles.calories}>
                        {item.calories} kcal
                      </span> */}
                    </div>
                    <h2>{item.name}</h2>
                    <p className={styles.description}>{item.description}</p>
                    {/* {item.serving && (
                      <div className={styles.serving}>
                        <span>Serving:</span>
                        {item.serving.map((option, index) => (
                          <span
                            key={option}
                            className={
                              index === 0 ? styles.servingSelected : ""
                            }>
                            {option}
                          </span>
                        ))}
                      </div>
                    )} */}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceBlock}>
                        <small>Price</small>
                        <strong>{formatPrice(+item.price)}</strong>
                      </div>
                      <Button
                        variant="plain"
                        className={styles.addButton}
                        type="button"
                        onClick={() => changeQuantity(item, 1)}>
                        {orderQuantity ? (
                          <Check size={15} />
                        ) : (
                          <Plus size={15} />
                        )}
                        {orderQuantity ? "Add another" : "Add to order"}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
            {filteredItems?.length === 0 && (
              <Box className={styles.emptyState}>
                <Search size={22} />
                <strong>No dishes found</strong>
                <span>Try another search or filter.</span>
              </Box>
            )}
          </Grid>
        </Box>
      </Grid>
      <OrderActionBar
        tableName={tableName}
        onConfirm={() => {
          setFeedback("Your order has been sent to the kitchen.");
          setReviewOpen(false);
        }}
      />
      {feedback && (
        <Flex
          className={styles.toast}
          role="status"
          align="center">
          <Check size={16} />
          {feedback}
          <Button
            variant="plain"
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setFeedback("")}>
            <X size={15} />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableMenuPage;
