import { routes } from "@/routes/routes";
import useCan from "@/shared/hooks/useCan";
import { useSharedStorage } from "@/shared/store/shared-store";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Clock3,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  UsersRound,
  Utensils,
} from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useResTables } from "../../services/res-table";

type TableStatus = "occupied" | "reserved" | "available" | "needs_cleaning";

const statusColors = {
  available: {
    bg: "#e6f9f4",
    color: "#0b5e4f",
    border: "#00b37e",
    numberBg: "#00b37e",
    numberColor: "#ffffff",
  },
  occupied: {
    bg: "#e7eaff",
    color: "#4d42d8",
    border: "#5548ed",
    numberBg: "#5145e5",
    numberColor: "#ffffff",
  },
  reserved: {
    bg: "#fff5d9",
    color: "#a35400",
    border: "#f59b00",
    numberBg: "#f6a000",
    numberColor: "#ffffff",
  },
  needs_cleaning: {
    bg: "#ffe4e9",
    color: "#c5294b",
    border: "#ff4667",
    numberBg: "#f63d60",
    numberColor: "#ffffff",
  },
};

const RestaurantTables = (): JSX.Element => {
  const canViewRestaurantTable = useCan("page:restaurantTables");
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<"all" | TableStatus>("all");
  const [search, setSearch] = useState("");
  const resId = useSharedStorage((state) => state.restaurantId) as number;
  const { data: resTables } = useResTables(resId.toString());

  useEffect(() => {
    if (!canViewRestaurantTable) {
      navigate(`${routes.dashboard}`);
    }
  }, [navigate, canViewRestaurantTable]);

  // const visibleTables = useMemo(
  //   () =>
  //     resTables.filter((table) => {
  //       const matchesStatus =
  //         activeStatus === "All" || table.status === activeStatus;
  //       const query = search.toLowerCase();
  //       return (
  //         matchesStatus &&
  //         (table.number.includes(query) ||
  //           table.detail.toLowerCase().includes(query))
  //       );
  //     }),
  //   [activeStatus, search],
  // );

  return (
    <Box
      minH="100%"
      color="#171b2d">
      <Flex
        align="flex-start"
        justify="space-between"
        gap={4}
        wrap="wrap"
        mb={8}>
        <Box>
          <Text
            color="#77809a"
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.14em"
            textTransform="uppercase">
            Floor plan / service
          </Text>
          <Heading
            mt={2}
            fontSize={{ base: "2xl", md: "3xl" }}
            letterSpacing="-0.03em">
            Table management
          </Heading>
          <Text
            mt={2}
            color="#7b8296"
            fontSize="sm">
            Keep an eye on every table, from first seating to final reset.
          </Text>
        </Box>
        <Button
          bg="#4056bd"
          color="white"
          _hover={{ bg: "#32469f" }}
          borderRadius="lg"
          px={5}>
          <Plus size={17} />
          Add table
        </Button>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1.35fr" }}
        gap={4}
        mb={7}>
        <Flex
          align="center"
          gap={3}
          bg="white"
          border="1px solid #edf0f6"
          borderRadius="xl"
          px={4}
          py={3}>
          <Search
            size={18}
            color="#8b92a7"
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search table or server"
            variant="flushed"
            border="0"
            fontSize="sm"
            _focus={{ boxShadow: "none" }}
          />
        </Flex>
        <Flex
          gap={2}
          justify={{ base: "flex-start", lg: "flex-end" }}
          align="center"
          overflowX="auto">
          {(
            [
              "all",
              "occupied",
              "reserved",
              "available",
              "needs_cleaning",
            ] as const
          ).map((status) => (
            <Button
              key={status}
              size="sm"
              flexShrink={0}
              borderRadius="full"
              bg={activeStatus === status ? "#4056bd" : "white"}
              color={activeStatus === status ? "white" : "#69718a"}
              border="1px solid"
              borderColor={activeStatus === status ? "#4056bd" : "#e8ebf2"}
              onClick={() => setActiveStatus(status)}>
              {status}
            </Button>
          ))}
          <IconButton
            aria-label="Table settings"
            variant="outline"
            bg="white"
            borderColor="#e8ebf2"
            borderRadius="full"
            size="sm">
            <Settings2 size={16} />
          </IconButton>
        </Flex>
      </Grid>

      <Flex
        align="center"
        justify="space-between"
        mb={4}>
        <Box>
          <Heading fontSize="lg">Service floor</Heading>
          <Text
            mt={1}
            color="#8a91a5"
            fontSize="sm">
            {resTables?.length} tables shown · Updated just now
          </Text>
        </Box>
        <IconButton
          aria-label="More table actions"
          variant="ghost"
          color="#7d8498">
          <MoreHorizontal size={20} />
        </IconButton>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, sm: 2, xl: 3 }}
        gap={{ base: 4, md: 5 }}>
        {resTables?.map((table, index) => {
          const status = statusColors[table.status];
          const isAvailable = table.status === "available";
          const isDirty = table.status === "needs_cleaning";
          return (
            <Box
              key={table.id}
              minH="208px"
              bg="white"
              borderRadius="2xl"
              border="2px solid"
              borderColor={status.border}
              boxShadow="0 8px 20px rgba(44, 54, 94, 0.06)"
              transition="transform 180ms ease, box-shadow 180ms ease"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: `0 14px 30px ${status.border}40`,
              }}
              px={{ base: 5, md: 6 }}
              py={5}>
              <Flex
                justify="space-between"
                align="flex-start">
                <Flex
                  align="center"
                  gap={2.5}>
                  <Flex
                    w="150px"
                    h="45px"
                    align="center"
                    justify="center"
                    borderRadius="9px"
                    bg={status.numberBg}
                    color={status.numberColor}
                    fontSize="lg"
                    fontWeight="700">
                    {table.display_name}
                  </Flex>
                  <Badge
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    bg={status.bg}
                    color={status.color}
                    fontSize="9px"
                    letterSpacing="0.1em"
                    textTransform="uppercase">
                    {table.status}
                  </Badge>
                </Flex>
                <IconButton
                  aria-label={`Actions for table ${table.display_name}`}
                  size="xs"
                  variant="ghost"
                  color="#9aa0b0">
                  <MoreHorizontal size={17} />
                </IconButton>
              </Flex>

              <Stack
                gap={0}
                mt={6}>
                <Text
                  color="#8d93a4"
                  fontSize="10px"
                  letterSpacing="0.08em"
                  textTransform="uppercase">
                  Detail Label
                </Text>
                <Text
                  mt={1}
                  fontSize="md"
                  fontWeight="600"
                  color={isAvailable ? "#075343" : "#151927"}>
                  Details
                </Text>
              </Stack>

              <Box
                mt={4}
                pt={4}
                borderTop="1px solid #f0f1f5">
                {index !== 1 ? (
                  <Flex
                    align="center"
                    gap={5}
                    color={isDirty ? status.color : status.border}
                    fontSize="sm"
                    fontWeight="600">
                    <Flex
                      align="center"
                      gap={2}>
                      <UsersRound
                        size={19}
                        strokeWidth={1.8}
                      />
                      Guests
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}>
                      <Clock3
                        size={19}
                        strokeWidth={1.8}
                      />
                      20 mins
                    </Flex>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    gap={2}
                    color={isDirty ? status.color : status.border}
                    fontSize="sm"
                    fontStyle={isAvailable ? "italic" : "normal"}>
                    <Utensils size={18} />
                    {table.status === "available" ? (
                      "Ready for sitting"
                    ) : (
                      <Text>Action</Text>
                    )}
                  </Flex>
                )}
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RestaurantTables;
