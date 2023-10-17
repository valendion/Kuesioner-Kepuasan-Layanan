"use client";
import {
  Box,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { questionData } from "../utils/contans";

const FormQuestion = ({ isLoading, handleForm, validation }) => {
  return (
    <VStack spacing={5}>
      {questionData.map((question, index) => (
        <FormControl
          key={index}
          isInvalid={
            validation.errors.answers && validation.errors.answers[index]
          }
        >
          <FormLabel>{`${index + 1}. ${question.question}`}</FormLabel>

          <Stack direction={"column"} spacing="12px">
            {question.choice.map((choice, choiceIndex) => (
              <Box key={choiceIndex}>
                <input
                  value={choice.answer}
                  type="radio"
                  name={`answers.${index}`}
                  checked={validation.values.answers[index] === choice.answer}
                  onChange={handleForm}
                  disabled={isLoading}
                />
                {` ${choice.answer}`}
              </Box>
            ))}
          </Stack>
          <FormErrorMessage>
            {validation.errors.answers && validation.errors.answers[index]}
          </FormErrorMessage>
        </FormControl>
      ))}
    </VStack>
  );
};

export default FormQuestion;
