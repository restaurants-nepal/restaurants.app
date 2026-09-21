import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import type { JSX } from "react";

const ProductCreate = ({
  openCreateModal,
  setOpenCreateModal,
}: {
  openCreateModal: boolean;
  setOpenCreateModal: (value: boolean) => void;
}): JSX.Element => {
  return (
    <Drawer.Root
      open={openCreateModal}
      onOpenChange={() => setOpenCreateModal(false)}
      size="lg">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Create Product</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>Form Fields Here</Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.ActionTrigger>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export { ProductCreate };
