import { SimpleGrid, Tabs } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useState, type JSX } from "react";
import { useMenuItems } from "../../services/menu-items";
import { useSharedStorage } from "@/shared/store/shared-store";
import ProductRow from "./ProductRow";

const ProductList = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const resId = useSharedStorage((state) => state.restaurantId) as number;
  const menuItems = useMenuItems(resId.toString());

  const filteredMenuItems = menuItems.data?.filter((item) => {
    if (activeTab === "All") return true;
    return item?.category === activeTab;
  });

  const headers = [
    "All",
    ...new Set(menuItems.data?.map((item) => item.category) ?? []),
  ];

  return (
    <SimpleGrid width="full">
      <Tabs.Root
        defaultValue={activeTab}
        variant="outline"
        onValueChange={(e) => setActiveTab(e.value)}>
        <Tabs.List>
          {headers.map((header) => (
            <Tabs.Trigger
              _selected={{ bg: "brand.primary" }}
              key={header}
              value={header}>
              {capitalize(header)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}>
          {filteredMenuItems?.map((item) => (
            <ProductRow item={item} />
          ))}
        </div>
      </Tabs.Root>
    </SimpleGrid>
  );
};

export { ProductList };
