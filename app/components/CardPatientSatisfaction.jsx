import { Card, Heading, CardBody, Text } from "@chakra-ui/react";
import { countSatisfaction } from "../utils/count_satisfaction";

const CardPatientSatisfaction = ({
  index,
  patient: { age, gender, education, occupation, services_received, answers },
}) => {
  return (
    <Card>
      <CardBody>
        <Heading size={"md"} mb={2}>
          Orang ke - {index + 1}
        </Heading>
        <Text>Umur : {age}</Text>
        <Text>Jenis Kelamin : {gender}</Text>
        <Text>Pendidikan : {education}</Text>
        <Text>Pekerjaan : {occupation}</Text>
        <Text>Layanan yang diterima : {services_received}</Text>
        <Text>Tingkat kepuasan : {countSatisfaction(answers)}</Text>
      </CardBody>
    </Card>
  );
};

export default CardPatientSatisfaction;
