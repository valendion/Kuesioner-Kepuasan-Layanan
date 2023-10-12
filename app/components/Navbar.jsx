"use client";
import React from "react";
import {
  Flex,
  Button,
  Box,
  Heading,
  Spacer,
  VStack,
  HStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { menuNavbar } from "../utils/contans";
import MenuLink from "./MenuLink";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      w={"100%"}
      position={"fixed"}
    >
      <Flex h={16} alignItems="center">
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          mr={5}
          onClick={isOpen ? onClose : onOpen}
        />
        <Heading as="h5" size="sm">
          Puskesmas Lapadde
        </Heading>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }}>
          {menuNavbar.map((menu) => (
            <MenuLink key={menu} menu={menu} />
          ))}
        </HStack>

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as={"nav"} spacing={4}>
            {menuNavbar.map((menu) => (
              <MenuLink key={menu} menu={menu} />
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
