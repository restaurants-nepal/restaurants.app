import { useEffect, useState, type JSX } from "react";
import { Pages } from "@/shared/enums/pages";
import { PageHeader } from "./PageHeader";
import { ProductList } from "./ProductList";
import { ProductCreate } from "./product-create/ProductCreate";
import { capitalize } from "lodash";

const Product = (): JSX.Element => {
  // Use effect
  useEffect(function updatePageHeader() {
    document.title = capitalize(Pages.PRODUCTS);
  }, []);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  return (
    <>
      <PageHeader
        setOpenCreateModal={setOpenCreateModal}
        openCreateModal={openCreateModal}
      />
      <ProductList />
      <ProductCreate
        setOpenCreateModal={setOpenCreateModal}
        openCreateModal={openCreateModal}
      />
    </>
  );
};

export { Product };
