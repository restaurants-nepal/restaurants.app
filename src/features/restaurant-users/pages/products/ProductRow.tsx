import { type JSX } from "react";
import {
  Badge,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Clock } from "lucide-react";
import type { MenuItemModel } from "@/shared/models/menu-item/menu-item-model";

export default function ProductRow({
  item,
}: {
  item: MenuItemModel;
}): JSX.Element {
  return (
    <Flex
      align="center"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="16px"
      boxShadow="0 2px 8px rgba(25, 35, 50, 0.04)"
      gap="5"
      key={item.id}
      minH="96px"
      p="4">
      <Image
        alt={item.name}
        borderRadius="12px"
        boxSize="64px"
        objectFit="cover"
        src={item.images[0]?.url ?? ""}
      />
      <Stack
        flex="1"
        gap="1"
        minW="0">
        <Flex
          align="center"
          gap="2"
          wrap="wrap">
          <Heading
            fontSize="md"
            fontWeight="600">
            {item.name}
          </Heading>
          {/* {item.signature && (
            <Badge
              colorPalette="blue"
              fontSize="9px"
              letterSpacing="0.02em"
              px="2"
              rounded="full">
              SIGNATURE
            </Badge>
          )} */}
        </Flex>
        <Text
          color="gray.500"
          fontSize="sm"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap">
          {item.description}
        </Text>
        <Flex
          align="center"
          gap="3">
          <Text
            color="blue.600"
            fontSize="sm"
            fontWeight="700">
            {`Rs: ${Number(item.price || 0)?.toFixed(2)}`}
          </Text>
          <Badge
            variant="surface"
            padding="1.5"
            gap="1">
            <Clock size={15} />
            <Text fontSize="small">
              {item.estimated_preparation_time_minutes} mins
            </Text>
          </Badge>
          {/* Will handle in future
          <Text
            color="gray.400"
            fontSize="xs">
            | Stock: {item.units} units
          </Text> */}
        </Flex>
      </Stack>
      <Flex
        align="center"
        gap="4">
        <Flex
          align="center"
          gap="2">
          <Text
            color="gray.600"
            fontSize="xs"
            fontWeight="500">
            Available
          </Text>
          <Switch.Root
            checked={item.is_available}
            colorPalette="blue"
            disabled
            size="sm">
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
        </Flex>
        <IconButton
          aria-label={`Edit ${item.name}`}
          color="blue.400"
          size="sm"
          variant="ghost">
          <PencilSquareIcon />
        </IconButton>
        <IconButton
          aria-label={`Delete ${item.name}`}
          color="gray.400"
          size="sm"
          variant="ghost">
          <TrashIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
}
