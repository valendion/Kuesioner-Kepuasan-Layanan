"use client";
import {
  Container,
  Heading,
  Box,
  Center,
  Stack,
  Skeleton,
  SkeletonCircle,
  Select,
} from "@chakra-ui/react";

import useSWR from "swr";
import { fetcher } from "../swr/fetcher";
import ListCardSkeleton from "../components/ListCardSkeleton";
import ErrorPage from "../components/ErrorPage";
import ListCard from "../components/ListCard";
import CardSkeleton from "../components/CardSkeleton";
import ConclusionPeople from "../components/ConclusionPeople";
import { roomPublicHealth, valuePoint } from "../utils/contans";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useState } from "react";
import { respondentAssessment } from "../utils/count_point";

export const Conclusion = () => {
  const { data, error, isLoading } = useSWR(`/api/satisfaction`, fetcher, {
    refreshInterval: 3000,
  });

  const [selectedValuePoli, setSelectedValuePoli] = useState("Poli Umum");

  const handleChangePoli = (event) => {
    setSelectedValuePoli(event.target.value);
  };

  const getResponseRespondents = (namePoli) => {
    return;
  };

  ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

  let assignmentPolis = [];

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

    apotek = oldAnswers.filter(
      (service) => service.services_received === "Apotek"
    );

    uGD = oldAnswers.filter((service) => service.services_received === "UGD");
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

    assignmentPolis = respondentAssessment(
      oldAnswers.filter(
        (service) => service.services_received === `${selectedValuePoli}`
      )
    );
  }

  return (
    <Container h={"100%"} w={"100%"} mt={20} zIndex={1}>
      <Heading as="h4" size="md" mb={5} mt={5}>
        Daftar data kuisioner
      </Heading>

      <Box mb={5}>
        {(isLoading && (
          <Stack>
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
            <Center>
              <SkeletonCircle size="250" />
            </Center>
          </Stack>
        )) ||
          (error && <ErrorPage />) || (
            <Doughnut
              data={{
                labels: roomPublicHealth,
                datasets: [
                  {
                    label: "Jumlah orang yang memberikan penilaian",
                    data: allRoom.map((data) => data.length),
                    backgroundColor: [
                      "#03AED2",
                      "#CDE8E5",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                      "#FA7070",
                      "#F97300",
                      "#A3D8FF",
                      "#FFB1B1",
                      "#874CCC",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Responden di dapat dari November 2023 sampai sekarang",
                  },
                },
              }}
            />
          )}
      </Box>

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

      <Heading as="h4" size="md" mb={5} mt={5}>
        Tingkat kepuasan responden terhadap poli di Puskesmas Lapadde
      </Heading>

      <Select value={selectedValuePoli} onChange={handleChangePoli}>
        {roomPublicHealth.map((dataHealth, index) => (
          <option value={dataHealth} key={index}>
            {dataHealth}
          </option>
        ))}
      </Select>

      <Box mb={5}>
        {(isLoading && (
          <Stack>
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
            <Center>
              <SkeletonCircle size="250" />
            </Center>
          </Stack>
        )) ||
          (error && <ErrorPage />) || (
            <Pie
              data={{
                labels: valuePoint,
                datasets: [
                  {
                    label: "Penilaian responden",
                    data: assignmentPolis,

                    backgroundColor: [
                      "#50AF95",
                      "#2a71d0",
                      "#f3ba2f",
                      "#FA7070",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: `Penilaian Responden ${selectedValuePoli}`,
                  },
                },
              }}
            />
          )}
      </Box>
    </Container>
  );
};

export default Conclusion;
