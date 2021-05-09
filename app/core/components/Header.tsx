import { Box, Flex, Stack, Text } from "@chakra-ui/layout"
import Link from "next/link"

export const Header = () => {
  return (
    <Box w="100%" p={4} color="white" boxShadow="lg" mb={8}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p={2}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
      >
        <Box w="100px">
          <Text fontSize="lg" fontWeight="bold">
            Flicks
          </Text>
        </Box>
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
        >
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Header
