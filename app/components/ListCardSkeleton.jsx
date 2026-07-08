import { VStack, Heading } from "@chakra-ui/react";
import CardSkeleton from "./CardSkeleton";

const ListCardSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch" mb={5}>
      {[0, 1].map((element) => (
        <CardSkeleton key={element} />
      ))}
    </VStack>
  );
};

export default ListCardSkeleton;
