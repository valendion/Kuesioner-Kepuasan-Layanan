import { Text } from "@chakra-ui/react";

const ConclusionPeople = ({ data }) => {
  return (
    <>
      {" "}
      <Text>Total : {data.length} orang</Text>
      <Text>
        Tidak Puas :{" "}
        {
          data.filter(
            (item) => item.answers / 9 >= 1 && item.answers / 9 <= 1.9
          ).length
        }{" "}
        orang
      </Text>
      <Text>
        Kurang Puas :{" "}
        {
          data.filter(
            (item) => item.answers / 9 >= 2 && item.answers / 9 <= 2.9
          ).length
        }{" "}
        orang
      </Text>
      <Text>
        Puas :{" "}
        {
          data.filter(
            (item) => item.answers / 9 >= 3 && item.answers / 9 <= 3.9
          ).length
        }{" "}
        orang
      </Text>
      <Text>
        Sangat Puas : {data.filter((item) => item.answers / 9 === 4).length}{" "}
        orang
      </Text>
    </>
  );
};

export default ConclusionPeople;
