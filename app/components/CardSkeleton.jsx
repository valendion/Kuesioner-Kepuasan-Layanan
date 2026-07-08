import { Skeleton, SkeletonText, Card, CardBody } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Card>
      <CardBody>
        <Skeleton height={"30px"} />
        <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="3" />
      </CardBody>
    </Card>
  );
};
export default CardSkeleton;
