import { Card, Heading, CardBody, Text } from "@chakra-ui/react";
import { countSatisfaction } from "../utils/count_satisfaction";
import { totalPoint } from "../utils/count_point";
import { formatDate } from "../utils/convert";

const CardPatientSatisfaction = ({
  patient: {
    age,
    gender,
    education,
    occupation,
    services_received,
    answers,
    suggestion,
    createdAt,
  },
}) => {
  const totalPoints = totalPoint(answers);
  return (
    <Card>
      <CardBody>
        <Heading size={"sm"} mb={2}>
          {formatDate(createdAt)}
        </Heading>

        <Text>Umur : {age}</Text>
        <Text>Jenis Kelamin : {gender}</Text>
        <Text>Pendidikan : {education}</Text>
        <Text>Pekerjaan : {occupation}</Text>
        <Text>Layanan yang diterima : {services_received}</Text>
        <Text>Tingkat kepuasan : {countSatisfaction(totalPoints)}</Text>
        <Text>Saran : {suggestion}</Text>
      </CardBody>
    </Card>
  );
};

export default CardPatientSatisfaction;
