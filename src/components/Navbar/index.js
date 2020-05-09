import React from "react";
import { Flex, Text, Box, Button, Icon, useColorMode } from "@chakra-ui/core";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      w="100%"
      h={50}
      justify="space-between"
      align="center"
      px={8}
      py={4}
      borderWidth="1px"
    >
      <Box flex={1}>
        <Text fontWeight="bold">Kaban Board</Text>
      </Box>
      <Flex flex={1} justify="flex-end">
        <Button onClick={toggleColorMode}>
          <Icon name={colorMode === "light" ? "moon" : "sun"} />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
