"use client";

import {
  Box,
  chakra,
  Container,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";

import { FaInstagram } from "react-icons/fa";

import { Icon } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={"column"}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Text>© 2023 Valendion Pradana Pasalu. All rights reserved</Text>
        <Flex justify={"center"} align={"center"}>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/dionaja027/"}
          >
            <Icon as={FaInstagram} />
          </SocialButton>
        </Flex>
      </Container>
    </Box>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default Footer;
