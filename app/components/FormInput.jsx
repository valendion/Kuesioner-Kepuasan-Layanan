"use client";
import {
  Box,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

const FormInput = ({ isLoading, handleForm, validation }) => {
  return (
    <VStack spacing={5}>
      <FormControl isInvalid={validation.errors.age}>
        <FormLabel>Usia Anda</FormLabel>
        <Input
          placeholder="Masukkan usia anda"
          size="md"
          type="number"
          name="age"
          onChange={handleForm}
          value={validation.values.age}
          isDisabled={isLoading}
        />

        <FormErrorMessage>{validation.errors.age}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={validation.errors.gender}>
        <FormLabel>Jenis Kelamin</FormLabel>

        <Stack direction={"column"} spacing="12px">
          <Box>
            <input
              value="Laki - laki"
              type="radio"
              name="gender"
              checked={validation.values.gender === "Laki - laki"}
              onChange={handleForm}
              disabled={isLoading}
            />
            {" Laki - laki"}
          </Box>
          <Box>
            <input
              value="Perempuan"
              type="radio"
              name="gender"
              checked={validation.values.gender === "Perempuan"}
              onChange={handleForm}
              disabled={isLoading}
            />
            {" Perempuan"}
          </Box>
        </Stack>
        <FormErrorMessage>{validation.errors.gender}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={validation.errors.education}>
        <FormLabel>Pendidikan Anda</FormLabel>
        <Select
          placeholder="Pilih Pendidikan  Anda"
          value={validation.values.education}
          onChange={handleForm}
          name="education"
          disabled={isLoading}
        >
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA">SMA</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
        </Select>

        <FormErrorMessage>{validation.errors.education}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={validation.errors.occupation}>
        <FormLabel>Pekerjaan Anda</FormLabel>
        <Select
          placeholder="Pilih Pekerjaan  Anda"
          value={validation.values.occupation}
          onChange={handleForm}
          name="occupation"
          disabled={isLoading}
        >
          <option value="PNS">PNS</option>
          <option value="TNI">TNI</option>
          <option value="POLRI">POLRI</option>
          <option value="SWASTA">SWASTA</option>
          <option value="WIRAUSAHA">WIRAUSAHA</option>
          <option value="Lainnya">Lainnya</option>
        </Select>

        <FormErrorMessage>{validation.errors.occupation}</FormErrorMessage>
      </FormControl>

      {validation.values.occupation === "Lainnya" ? (
        <FormControl isInvalid={validation.errors.otherOccupation}>
          <FormLabel>Pekerjaan Lainnya</FormLabel>
          <Input
            placeholder="Pekerjaan Lainnya"
            size="md"
            type="text"
            name="otherOccupation"
            onChange={handleForm}
            value={validation.values.otherOccupation}
            isDisabled={isLoading}
          />

          <FormErrorMessage>
            {validation.errors.otherOccupation}
          </FormErrorMessage>
        </FormControl>
      ) : null}

      <FormControl isInvalid={validation.errors.services_received}>
        <FormLabel>Layanan yang diterima</FormLabel>
        <Input
          placeholder="Layanan yang diterima (KTP,Akta,Sertifikat,Poli Umum dll)"
          size="md"
          type="text"
          name="services_received"
          onChange={handleForm}
          value={validation.values.services_received}
          isDisabled={isLoading}
        />

        <FormErrorMessage>
          {validation.errors.services_received}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default FormInput;
