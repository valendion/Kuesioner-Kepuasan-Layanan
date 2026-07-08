import { Divider, useColorModeValue } from "@chakra-ui/react";

const DividerCustom = () => {
  return (
    <Divider
      borderColor={useColorModeValue("gray.900", "gray.400")}
      mt={6}
      mb={6}
    />
  );
};

export default DividerCustom;
