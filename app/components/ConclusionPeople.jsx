import { Text } from "@chakra-ui/react";
import { totalPoint } from "../utils/count_point";
import { Card, CardBody } from "@chakra-ui/react";

const ConclusionPeople = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          {" "}
          <Text>Total : {data.length} orang</Text>
          <Text>
            Tidak Puas :{" "}
            {
              data.filter(
                (item) =>
                  totalPoint(item.answers) / 9 >= 1 &&
                  totalPoint(item.answers) / 9 <= 1.9
              ).length
            }{" "}
            orang
          </Text>
          <Text>
            Kurang Puas :{" "}
            {
              data.filter(
                (item) =>
                  totalPoint(item.answers) / 9 >= 2 &&
                  totalPoint(item.answers) / 9 <= 2.9
              ).length
            }{" "}
            orang
          </Text>
          <Text>
            Puas :{" "}
            {
              data.filter(
                (item) =>
                  totalPoint(item.answers) / 9 >= 3 &&
                  totalPoint(item.answers) / 9 <= 3.9
              ).length
            }{" "}
            orang
          </Text>
          <Text>
            Sangat Puas :{" "}
            {data.filter((item) => totalPoint(item.answers) / 9 === 4).length}{" "}
            orang
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default ConclusionPeople;
