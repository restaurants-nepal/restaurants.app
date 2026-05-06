import { Button, Heading } from "@chakra-ui/react";
import type { JSX } from "react";
import styles from "./PageHeader.module.scss";
import { Pages } from "@/shared/enums/pages";
import { capitalize } from "lodash";

const PageHeader = ({
  setOpenCreateModal,
  openCreateModal,
}: {
  setOpenCreateModal: (value: boolean) => void;
  openCreateModal: boolean;
}): JSX.Element => {
  return (
    <div className={styles.pageHeader}>
      <Heading
        mb="5px"
        size="2xl">
        {capitalize(Pages.PRODUCTS)}
      </Heading>
      <Button
        bg="brand.primaryDark"
        onClick={() => setOpenCreateModal(!openCreateModal)}>
        Add Product
      </Button>
    </div>
  );
};

export { PageHeader };
