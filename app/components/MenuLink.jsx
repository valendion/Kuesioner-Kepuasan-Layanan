import { Link } from "@chakra-ui/next-js";
import { useColorModeValue } from "@chakra-ui/react";

const MenuLink = ({ menu }) => {
  const color = useColorModeValue("gray.200", "gray.700");
  return (
    <Link
      mr={5}
      p={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: color,
      }}
      href={"#"}
    >
      {menu}
    </Link>
  );
};

export default MenuLink;
