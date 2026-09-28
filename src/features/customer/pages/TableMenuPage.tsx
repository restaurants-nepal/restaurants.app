import { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import { Box, Button, Flex, Grid, Input, Textarea } from "@chakra-ui/react";
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import styles from "./table-menu.module.scss";
import { useSharedStorage } from "@/shared/store/shared-store";
import type { RestaurantContext } from "@/shared/models/restaurant-context-model";
import { useShallow } from "zustand/react/shallow";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  calories: number;
  prepTime: string;
  photos: string[];
  badges: string[];
  dietary: string[];
  serving?: string[];
};

export const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Atlantic Salmon & Quinoa Bowl",
    description:
      "Crispy skin Scottish salmon, organic quinoa, steamed tenderstem broccoli, roasted Meyer lemon emulsion, and cold-pressed olive oil.",
    category: "Main Courses",
    price: 28.5,
    calories: 540,
    prepTime: "15–18 min",
    photos: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["Chef's pick", "Gluten-free"],
    dietary: ["Gluten-free", "Halal certified", "Sustainable seafood"],
    serving: ["Regular (220g)", "Captain's Cut (320g)"],
  },
  {
    id: 2,
    name: "Truffle Wild Mushroom Pizza",
    description:
      "48-hour slow fermented sourdough, black truffle fonduta, foraged forest mushrooms, Fior di Latte, aged parmesan crisps, and thyme.",
    category: "Woodfired Pizzas",
    price: 24,
    calories: 780,
    prepTime: "12–14 min",
    photos: [
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["Woodfired", "Vegetarian"],
    dietary: ["Vegetarian"],
    serving: ["10” Personal", "14” Sharing"],
  },
  {
    id: 3,
    name: "Slow-Braised Angus Short Ribs",
    description:
      "Twenty-hour braised Angus short rib, silky pomme purée, charred cipollini, and a rich red-wine jus.",
    category: "Main Courses",
    price: 36,
    calories: 890,
    prepTime: "18–22 min",
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["House signature"],
    dietary: ["Gluten-free", "Halal certified"],
  },
  {
    id: 4,
    name: "Smoked Burrata Salad",
    description:
      "A cloud of smoked burrata with heirloom tomatoes, basil oil, crisp garden leaves, and toasted sourdough.",
    category: "Starters & Appetizers",
    price: 19,
    calories: 410,
    prepTime: "8–10 min",
    photos: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["Vegetarian", "Fresh raw"],
    dietary: ["Vegetarian", "Gluten-free"],
  },
  {
    id: 5,
    name: "Crispy Artichoke Hearts",
    description:
      "Golden fried artichoke hearts, whipped lemon ricotta, garden herbs, and a bright preserved lemon dressing.",
    category: "Starters & Appetizers",
    price: 16,
    calories: 320,
    prepTime: "9–12 min",
    photos: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["Chef's pick", "Vegetarian"],
    dietary: ["Vegetarian"],
  },
  {
    id: 6,
    name: "Yuzu Botanical Spritz",
    description:
      "Bright yuzu, rosemary, sparkling water, and a little garden-grown sweetness. Available alcohol-free.",
    category: "Cellar & Mocktails",
    price: 12,
    calories: 120,
    prepTime: "2–3 min",
    photos: [
      "https://images.unsplash.com/photo-1513558161293-cacf765edfd7?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1536935338788846bb9981813?auto=format&fit=crop&w=1000&q=85",
    ],
    badges: ["House favorite"],
    dietary: ["Vegetarian", "Gluten-free"],
  },
];

const filterOptions = [
  "All offerings",
  "Vegetarian",
  "Gluten-free",
  "Chef's pick",
  "Halal certified",
  "Sustainable seafood",
];

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const TableMenuPage = () => {
  // Real Code
  const data = useLoaderData() as RestaurantContext;
  const menuItems = mockMenuItems;

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
    ...new Set(menuItems.map((i) => i.category)),
  ];

  const navigation = useNavigation();
  console.log("LOGG", restaurant, table);
  // Mock Code
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All offerings");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [photoIndexes, setPhotoIndexes] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = `${item.name} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All offerings" ||
      item.dietary.includes(activeFilter) ||
      item.badges.includes(activeFilter);
    const matchesCategory =
      activeCategory === "All Items" ||
      (activeCategory === "Chef's Specials"
        ? item.badges.includes("Chef's pick") ||
          item.badges.includes("House signature")
        : item.category === activeCategory);
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const orderItems = menuItems.filter((item) => (quantities[item.id] ?? 0) > 0);
  const itemCount = orderItems.reduce(
    (total, item) => total + (quantities[item.id] ?? 0),
    0,
  );
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * (quantities[item.id] ?? 0),
    0,
  );
  const tax = subtotal * 0.0875;
  const serviceCharge = subtotal * 0.1;

  const changeQuantity = (itemId: number, amount: number) => {
    setQuantities((current) => {
      const next = Math.max(0, (current[itemId] ?? 0) + amount);
      return { ...current, [itemId]: next };
    });
  };

  const changePhoto = (item: MenuItem, direction: number) => {
    setPhotoIndexes((current) => ({
      ...current,
      [item.id]:
        ((current[item.id] ?? 0) + direction + item.photos.length) %
        item.photos.length,
    }));
  };

  if (navigation.state === "loading") {
    return <div>Loading menu...</div>;
  }

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
            onClick={() =>
              setFeedback(
                "A waiter has been notified and will be with you shortly.",
              )
            }>
            <BellRing size={15} />
            <span>Call waiter</span>
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
              {category === "All Items" && <span>({menuItems.length})</span>}
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
        templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) 330px" }}
        gap={{ base: 4, lg: 5 }}
        alignItems="start">
        <Box
          as="section"
          className={styles.menuColumn}>
          <Flex className={styles.introBanner}>
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
          </Flex>

          <Grid
            className={styles.itemGrid}
            templateColumns={{
              base: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            }}>
            {filteredItems.map((item) => {
              const photoIndex = photoIndexes[item.id] ?? 0;
              return (
                <article
                  className={styles.menuCard}
                  key={item.id}>
                  <div className={styles.photoFrame}>
                    <img
                      src={item.photos[photoIndex]}
                      alt={item.name}
                    />
                    <div className={styles.badges}>
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
                    </div>
                    {item.photos.length > 1 && (
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
                        <span className={styles.photoCount}>
                          {photoIndex + 1} / {item.photos.length} photos
                        </span>
                      </>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>
                      <span>
                        <Clock3 size={12} /> {item.prepTime} prep
                      </span>
                      <span className={styles.calories}>
                        {item.calories} kcal
                      </span>
                    </div>
                    <h2>{item.name}</h2>
                    <p className={styles.description}>{item.description}</p>
                    {item.serving && (
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
                    )}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceBlock}>
                        <small>Price</small>
                        <strong>{formatPrice(item.price)}</strong>
                      </div>
                      <Button
                        variant="plain"
                        className={styles.addButton}
                        type="button"
                        onClick={() => changeQuantity(item.id, 1)}>
                        {quantities[item.id] ? (
                          <Check size={15} />
                        ) : (
                          <Plus size={15} />
                        )}
                        {quantities[item.id] ? "Add another" : "Add to order"}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
            {filteredItems.length === 0 && (
              <Box className={styles.emptyState}>
                <Search size={22} />
                <strong>No dishes found</strong>
                <span>Try another search or filter.</span>
              </Box>
            )}
          </Grid>
        </Box>

        <Box
          as="aside"
          className={styles.orderPanel}
          position={{ base: "static", lg: "sticky" }}
          top="174px"
          maxHeight={{ base: "none", lg: "calc(100vh - 190px)" }}
          overflowY={{ base: "visible", lg: "auto" }}
          aria-label="Your table order">
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
                  <div className={styles.orderItemInfo}>
                    <strong>{item.name}</strong>
                    <small>
                      {item.name === "Yuzu Botanical Spritz"
                        ? "Citrus · Standard-clear ice"
                        : item.badges.join(" · ")}
                    </small>
                  </div>
                  <strong className={styles.linePrice}>
                    {formatPrice(item.price * (quantities[item.id] ?? 0))}
                  </strong>
                  <div className={styles.quantityControl}>
                    <Button
                      variant="plain"
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => changeQuantity(item.id, -1)}>
                      <Minus size={12} />
                    </Button>
                    <span>{quantities[item.id]}</span>
                    <Button
                      variant="plain"
                      type="button"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => changeQuantity(item.id, 1)}>
                      <Plus size={12} />
                    </Button>
                    <Button
                      variant="plain"
                      className={styles.removeButton}
                      type="button"
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [item.id]: 0,
                        }))
                      }>
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <label
            className={styles.requestLabel}
            htmlFor="kitchen-request">
            <Sparkles size={13} /> Dietary & Kitchen Requests
          </label>
          <Textarea
            variant="outline"
            id="kitchen-request"
            className={styles.requestInput}
            placeholder="e.g. No chives on salmon, serve pizza when drinks arrive..."
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
            onClick={() =>
              setFeedback("Your order has been sent to the kitchen.")
            }>
            Review & Send Order to Kitchen <ArrowRight size={16} />
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
              {/* <small>Table {token.toUpperCase()} priority ticket ready</small> */}
            </div>
            <b>~14 min</b>
          </div>
        </Box>
      </Grid>
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
