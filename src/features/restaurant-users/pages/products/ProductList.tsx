import { SimpleGrid, Tabs } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useState, type JSX } from "react";

const Headers = ["all", "drinks", "others"];

const ProductList = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <SimpleGrid
      columns={2}
      gap="5"
      width="full">
      <Tabs.Root
        defaultValue={activeTab}
        variant="outline"
        onValueChange={(e) => setActiveTab(e.value)}>
        <Tabs.List>
          {Headers.map((header) => (
            <Tabs.Trigger
              _selected={{ bg: "brand.primary" }}
              key={header}
              value={header}>
              {capitalize(header)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="all">These are al item</Tabs.Content>
        <Tabs.Content value="drinks">These are drink item</Tabs.Content>
        <Tabs.Content value="others">These are other item</Tabs.Content>
      </Tabs.Root>
    </SimpleGrid>
  );
};

export { ProductList };
