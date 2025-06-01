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
import { useState, useEffect } from "react";
import { respondentAssessment } from "../utils/count_point";
import Pagination from "../components/Pagination";

import { useRouter, useSearchParams } from "next/navigation";
import TotalPeople from "../components/TotalPeople";
import DividerCustom from "../components/DividerCustom";

export const Conclusion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const [selectedValuePoli, setSelectedValuePoli] = useState("Poli Umum");

  const {
    data: satisfactionData,
    error: satisfactionError,
    isLoading: isSatisfactionLoading,
  } = useSWR(`/api/satisfaction`, fetcher, {
    refreshInterval: 10000,
  });

  const {
    data: totalData,
    error: totalError,
    isLoading: isTotalLoading,
  } = useSWR(`/api/satisfaction/total`, fetcher, {
    refreshInterval: 10000,
  });

  const {
    data: surveysData,
    error: surveysError,
    isLoading: isSurveysLoading,
  } = useSWR(`/api/satisfaction/surveys?page=${pageParam || 1}`, fetcher);

  const {
    data: satisfactionRateData,
    error: satisfactionRateError,
    isLoading: isSatisfactionRateLoading,
  } = useSWR(
    `/api/satisfaction/${encodeURIComponent(selectedValuePoli)}`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  const [page, setPage] = useState(1);

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

  return (
    <Container h={"100%"} w={"100%"} mt={20} zIndex={1}>
      <Box textAlign={"center"}>
        <Heading as="h4" size="md" mb={5} mt={5}>
          Daftar Responden di Semua Poli
        </Heading>
      </Box>
      <Box mb={5}>
        {(isTotalLoading && (
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
          (totalError && <ErrorPage />) || (
            <Box>
              <Center mb={5}>
                <Doughnut
                  data={{
                    labels: roomPublicHealth,
                    datasets: [
                      {
                        label: "Jumlah orang yang memberikan penilaian",
                        // data: allRoom.map((data) => data.length),
                        data: Object.values(totalData?.data || {}),
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
              <TotalPeople data={totalData} />
            </Box>
          )}
      </Box>

      <DividerCustom />

      <Box textAlign={"center"}>
        <Heading as="h4" size="md" mb={5} mt={5}>
          Responden Terakhir
        </Heading>
      </Box>
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

      <DividerCustom />

      <Box textAlign={"center"}>
        <Heading as="h4" size="md" mb={5} mt={5}>
          Tingkat Kepuasan di Puskesmas Lapadde
        </Heading>
      </Box>

      <Select value={selectedValuePoli} onChange={handleChangePoli}>
        {roomPublicHealth.map((dataHealth, index) => (
          <option value={dataHealth} key={index}>
            {dataHealth}
          </option>
        ))}
      </Select>

      <Box mb={5}>
        {(isSatisfactionRateLoading && (
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
          (satisfactionRateError && <ErrorPage />) || (
            <Box>
              <Center>
                <Pie
                  data={{
                    labels: valuePoint,
                    datasets: [
                      {
                        label: "Penilaian responden",
                        data: [
                          satisfactionRateData.sangatPuas,
                          satisfactionRateData.puas,
                          satisfactionRateData.kurangPuas,
                          satisfactionRateData.tidakPuas,
                        ],

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
              <Box mt={6}>
                <ConclusionPeople data={satisfactionRateData} />
              </Box>
            </Box>
          )}
      </Box>
    </Container>
  );
};

export default Conclusion;
