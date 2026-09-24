import { routes } from "@/routes/routes";
import useCan from "@/shared/hooks/useCan";
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
import { useEffect, useMemo, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

type TableStatus = "Occupied" | "Reserved" | "Dirty" | "Open" | "Selected";

type Table = {
  number: string;
  status: TableStatus;
  detailLabel: string;
  detail: string;
  guests?: string;
  duration?: string;
  action?: string;
  tone: "blue" | "indigo" | "red" | "gray";
};

const tables: Table[] = [
  {
    number: "12",
    status: "Occupied",
    detailLabel: "Server",
    detail: "Marcus R.",
    guests: "4/4",
    duration: "42m",
    tone: "blue",
  },
  {
    number: "08",
    status: "Reserved",
    detailLabel: "Guest",
    detail: "Harrington Party",
    guests: "6",
    duration: "19:30",
    tone: "indigo",
  },
  {
    number: "22",
    status: "Dirty",
    detailLabel: "Status",
    detail: "Needs Busser",
    action: "Priority",
    tone: "red",
  },
  {
    number: "15",
    status: "Open",
    detailLabel: "Capacity",
    detail: "2 Persons",
    action: "Ready for seating",
    tone: "gray",
  },
  {
    number: "04",
    status: "Occupied",
    detailLabel: "Server",
    detail: "Elena K.",
    guests: "2/4",
    duration: "18m",
    tone: "blue",
  },
  {
    number: "21",
    status: "Selected",
    detailLabel: "Server",
    detail: "Marcus R.",
    guests: "8/8",
    duration: "1h 12m",
    tone: "indigo",
  },
];

const statusColors: Record<TableStatus, { bg: string; color: string }> = {
  Occupied: { bg: "#eef1ff", color: "#445ac4" },
  Reserved: { bg: "#f1f2f8", color: "#5c6380" },
  Dirty: { bg: "#fff1f0", color: "#c22020" },
  Open: { bg: "#eef0f3", color: "#676d79" },
  Selected: { bg: "#e3e8ff", color: "#334bb3" },
};

const accentColors = {
  blue: { border: "#445bc6", numberBg: "#e0e6ff", numberColor: "#3c55bf" },
  indigo: { border: "#4d5d93", numberBg: "#bbc8ff", numberColor: "#344dba" },
  red: { border: "#c91d1d", numberBg: "#ffd9d6", numberColor: "#c51e1e" },
  gray: { border: "#e8e8e8", numberBg: "#f0f0f2", numberColor: "#686d77" },
};

const RestaurantTables = (): JSX.Element => {
  const canViewRestaurantTable = useCan("page:restaurantTables");
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<"All" | TableStatus>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!canViewRestaurantTable) {
      navigate(`${routes.dashboard}`);
    }
  }, [navigate, canViewRestaurantTable]);

  const visibleTables = useMemo(
    () =>
      tables.filter((table) => {
        const matchesStatus =
          activeStatus === "All" || table.status === activeStatus;
        const query = search.toLowerCase();
        return (
          matchesStatus &&
          (table.number.includes(query) ||
            table.detail.toLowerCase().includes(query))
        );
      }),
    [activeStatus, search],
  );

  return (
    <Box
      minH="100%"
      bg="#f8f9fc"
      px={{ base: 4, md: 8 }}
      py={{ base: 5, md: 8 }}
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
          {(["All", "Occupied", "Reserved", "Open", "Dirty"] as const).map(
            (status) => (
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
            ),
          )}
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
            {visibleTables.length} tables shown · Updated just now
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
        {visibleTables.map((table) => {
          const accent = accentColors[table.tone];
          const status = statusColors[table.status];
          const isOpen = table.status === "Open";
          const isDirty = table.status === "Dirty";
          return (
            <Box
              key={table.number}
              minH="208px"
              bg="white"
              borderRadius="2xl"
              borderBottom="4px solid"
              borderColor={accent.border}
              boxShadow="0 10px 25px rgba(44, 54, 94, 0.05)"
              px={{ base: 5, md: 6 }}
              py={5}>
              <Flex
                justify="space-between"
                align="flex-start">
                <Flex
                  align="center"
                  gap={2.5}>
                  <Flex
                    w="45px"
                    h="45px"
                    align="center"
                    justify="center"
                    borderRadius="9px"
                    bg={accent.numberBg}
                    color={accent.numberColor}
                    fontSize="lg"
                    fontWeight="700">
                    {table.number}
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
                  aria-label={`Actions for table ${table.number}`}
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
                  {table.detailLabel}
                </Text>
                <Text
                  mt={1}
                  fontSize="md"
                  fontWeight="600"
                  color={isOpen ? "#5f6570" : "#151927"}>
                  {table.detail}
                </Text>
              </Stack>

              <Box
                mt={4}
                pt={4}
                borderTop="1px solid #f0f1f5">
                {table.guests ? (
                  <Flex
                    align="center"
                    gap={5}
                    color={isDirty ? "#c22020" : accent.numberColor}
                    fontSize="sm"
                    fontWeight="600">
                    <Flex
                      align="center"
                      gap={2}>
                      <UsersRound
                        size={19}
                        strokeWidth={1.8}
                      />
                      {table.guests}
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}>
                      <Clock3
                        size={19}
                        strokeWidth={1.8}
                      />
                      {table.duration}
                    </Flex>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    gap={2}
                    color={isDirty ? "#c22020" : "#9297a2"}
                    fontSize="sm"
                    fontStyle={isOpen ? "italic" : "normal"}>
                    {isDirty ? <Utensils size={18} /> : null}
                    <Text>{table.action}</Text>
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
