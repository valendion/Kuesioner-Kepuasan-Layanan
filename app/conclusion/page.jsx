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
  Divider,
  useColorModeValue,
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
import { useState, useEffect } from "react";
import { respondentAssessment } from "../utils/count_point";
import Pagination from "../components/Pagination";

import { useRouter, useSearchParams } from "next/navigation";

export const Conclusion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const {
    data: satisfactionData,
    error: satisfactionError,
    isLoading: isSatisfactionLoading,
  } = useSWR(`/api/satisfaction`, fetcher, {
    refreshInterval: 10000,
  });

  const {
    data: surveysData,
    error: surveysError,
    isLoading: isSurveysLoading,
  } = useSWR(`/api/satisfaction/surveys?page=${pageParam || 1}`, fetcher);

  const [page, setPage] = useState(1);
  const [selectedValuePoli, setSelectedValuePoli] = useState("Poli Umum");

  useEffect(() => {
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setPage(initialPage);
  }, [pageParam]);

  const handlePageChange = (newPage) => {
    const totalPages = surveysData?.pagination?.totalPages || 1;
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleChangePoli = (event) => {
    setSelectedValuePoli(event.target.value);
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

  if (!isSatisfactionLoading && !satisfactionError) {
    oldAnswers = [...satisfactionData];
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
        {(isSatisfactionLoading && (
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
          (satisfactionError && <ErrorPage />) || (
            <Center>
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
            </Center>
          )}
      </Box>
      <Divider borderColor={useColorModeValue("gray.900", "gray.400")} />
      <Heading as="h4" size="md" mb={5} mt={5}>
        Responden Terakhir
      </Heading>
      <Box overflowY="auto" maxHeight="300px">
        {(isSurveysLoading && <ListCardSkeleton />) ||
          (surveysError && <ErrorPage />) || (
            <ListCard data={surveysData.data} />
          )}
      </Box>

      {/* Pagination */}
      {!isSurveysLoading && !surveysError && surveysData && (
        <Box mb={5} mt={5} w="100%">
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={surveysData.pagination.totalPages}
          />
        </Box>
      )}

      <Divider borderColor={useColorModeValue("gray.900", "gray.400")} />

      {roomPublicHealth.map((element, index) => {
        return (
          <div key={index}>
            <Heading as="h4" size="md" mb={5} mt={5}>
              Penilaian Pada {element}
            </Heading>

            <Box mb={5}>
              {(isSatisfactionLoading && <CardSkeleton />) ||
                (satisfactionError && <ErrorPage />) || (
                  <ConclusionPeople data={allRoom[index]} />
                )}
            </Box>
          </div>
        );
      })}
      <Divider borderColor={useColorModeValue("gray.900", "gray.400")} />
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
        {(isSatisfactionLoading && (
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
          (satisfactionError && <ErrorPage />) || (
            <Center>
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
            </Center>
          )}
      </Box>
    </Container>
  );
};

export default Conclusion;
