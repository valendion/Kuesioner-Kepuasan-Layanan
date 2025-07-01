import { Text } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";

const TotalPeople = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <Text>Poli Umum : {data.data["Poli Umum"]} orang</Text>
          <Text>Poli Gigi : {data.data["Poli Gigi"]} orang</Text>
          <Text>Poli KIA : {data.data["Poli KIA"]} orang</Text>
          <Text>Laboratorium : {data.data["Laboratorium"]} orang</Text>
          <Text>MTBS : {data.data["MTBS"]} orang</Text>
          <Text>Ruang Imunisasi : {data.data["Ruang Imunisasi"]} orang</Text>
          <Text>
            Loket pendaftaran / Rekam Medis :{" "}
            {data.data["Loket pendaftaran / Rekam Medis"]} orang
          </Text>
          <Text>Apotek : {data.data["Apotek"]} orang</Text>
          <Text>UGD : {data.data["UGD"]} orang</Text>
          <Text>Akupresur : {data.data["Akupresur"]} orang</Text>

          <Text>Total : {data.total} orang</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default TotalPeople;
