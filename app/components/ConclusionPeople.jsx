import { Text } from "@chakra-ui/react";

import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

const ConclusionPeople = ({ data }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">{data.service}</Heading>
        </CardHeader>
        <CardBody>
          {" "}
          <Text>Tidak Puas : {data.tidakPuas} orang</Text>
          <Text>Kurang Puas :{data.kurangPuas} orang</Text>
          <Text>Puas : {data.puas} orang</Text>
          <Text>Sangat Puas : {data.sangatPuas} orang</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default ConclusionPeople;
