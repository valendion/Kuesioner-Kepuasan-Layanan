import React from "react";
import CardPatientSatisfaction from "./CardPatientSatisfaction";
import { VStack } from "@chakra-ui/react";

const ListCard = ({ data }) => {
  return (
    <>
      <VStack spacing={4} align="stretch" mb={5}>
        {data.map((element, index) => (
          <CardPatientSatisfaction
            index={index}
            key={element.id}
            patient={element}
          />
        ))}
      </VStack>
    </>
  );
};

export default ListCard;
