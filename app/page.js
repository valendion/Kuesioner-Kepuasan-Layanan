"use client";
import { Container, Heading, Button, useToast } from "@chakra-ui/react";
import FormInput from "./components/FormInput";
import FormQuestion from "./components/FormQuestion";
import { useValidation } from "./lib/formik/validation";
import { changeArrayInt } from "./utils/count_point";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if (isSubmitting) return; // Jika sedang proses, abaikan
    setIsSubmitting(true);
    if (values) {
      const {
        occupation,
        otherOccupation,
        age,
        gender,
        education,
        services_received,
        answers,
        suggestion,
      } = values;
      let occupationChoice =
        occupation !== "Lainnya" ? occupation : otherOccupation;
      const data = {
        age,
        gender,
        education,
        occupation: occupationChoice,
        services_received,
        answers: changeArrayInt(answers),
        suggestion,
      };

      try {
        const res = await axios.post("/api/satisfaction", data);
        if (res.status === 200) {
          validation.resetForm();
          toast({
            title: "Berhasil ditambahkan",
            status: "success",
            isClosable: true,
          });
        } else {
          toast({
            title: "Gagal ditambahkan",
            status: "warning",
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Terjadi kesalahan",
          status: "error",
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false); // Reset state setelah selesai
      }
    }
  };

  const validation = useValidation({ handleSubmit });

  const handleForm = (event) => {
    const { target } = event;

    validation.setFieldValue(target.name, target.value);
  };

  return (
    <Container h={"100%"} w={"100%"} mt={20} zIndex={1}>
      <form onSubmit={validation.handleSubmit}>
        <Heading as="h4" size="md" mb={5} mt={5}>
          Profil
        </Heading>
        <FormInput
          isLoading={isSubmitting}
          handleForm={handleForm}
          validation={validation}
        />

        <Heading as="h4" size="md" mb={5} mt={5}>
          Pendapat Responden tentang Pelayanan
        </Heading>
        <FormQuestion
          isLoading={isSubmitting}
          handleForm={handleForm}
          validation={validation}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          w={"100%"}
          my={5}
        >
          Kirim
        </Button>
      </form>
    </Container>
  );
}
