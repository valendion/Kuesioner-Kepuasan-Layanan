"use client";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

const Question = ({ error }) => {
  return (
    <FormControl isInvalid={validation.errors.gender}>
      <FormLabel>{question}</FormLabel>

      <Stack direction={"column"} spacing="12px">
        <Box>
          <input
            value="Tidak sesuai"
            type="radio"
            name="question_1"
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
  );
};

export default Question;
