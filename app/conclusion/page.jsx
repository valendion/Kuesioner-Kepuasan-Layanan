"use client";
import { Container, Heading, Box, Spacer, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../swr/fetcher";
import ListCardSkeleton from "../components/ListCardSkeleton";
import ErrorPage from "../components/ErrorPage";
import ListCard from "../components/ListCard";
import CardSkeleton from "../components/CardSkeleton";
import ConclusionPeople from "../components/ConclusionPeople";
import { roomPublicHealth } from "../utils/contans";

export const Conclusion = () => {
  const { data, error, isLoading } = useSWR(`/api/satisfaction`, fetcher, {
    refreshInterval: 3000,
  });

  let poliUmum = [];
  let poliKIA = [];
  let poliGigi = [];
  let laboratorium = [];
  let mTBS = [];
  let ruangImunisasi = [];
  let loketPendaftaran = [];
  let apotek = [];
  let uGD = [];
  let oldAnswers = [];
  let allRoom = [];

  if (!isLoading && !error) {
    oldAnswers = [...data];
    poliUmum = oldAnswers.filter(
      (service) => service.services_received === "Poli Umum"
    );
    poliKIA = oldAnswers.filter(
      (service) => service.services_received === "Poli KIA"
    );
    poliGigi = oldAnswers.filter(
      (service) => service.services_received === "Poli Gigi"
    );

    laboratorium = oldAnswers.filter(
      (service) => service.services_received === "Laboratorium"
    );
    mTBS = oldAnswers.filter((service) => service.services_received === "MTBS");
    ruangImunisasi = oldAnswers.filter(
      (service) => service.services_received === "Ruang Imunisasi"
    );
    loketPendaftaran = oldAnswers.filter(
      (service) =>
        service.services_received === "Loket pendaftaran / Rekam Medis"
    );

    loketPendaftaran = oldAnswers.filter(
      (service) => service.services_received === "Apotek"
    );

    loketPendaftaran = oldAnswers.filter(
      (service) => service.services_received === "UGD"
    );
    allRoom = [
      poliUmum,
      poliGigi,
      poliKIA,
      laboratorium,
      mTBS,
      ruangImunisasi,
      loketPendaftaran,
      apotek,
      uGD,
    ];
  }

  return (
    <Container h={"100%"} w={"100%"} mt={20} zIndex={1}>
      <Heading as="h4" size="md" mb={5} mt={5}>
        Daftar data kuisioner
      </Heading>

      <Box overflowY="auto" maxHeight="300px">
        {(isLoading && <ListCardSkeleton />) || (error && <ErrorPage />) || (
          <ListCard data={data} />
        )}
      </Box>

      {roomPublicHealth.map((element, index) => {
        return (
          <div key={index}>
            <Heading as="h4" size="md" mb={5} mt={5}>
              Penilaian Pada {element}
            </Heading>

            <Box mb={5}>
              {(isLoading && <CardSkeleton />) || (error && <ErrorPage />) || (
                <ConclusionPeople data={allRoom[index]} />
              )}
            </Box>
          </div>
        );
      })}
    </Container>
  );
};

export default Conclusion;
