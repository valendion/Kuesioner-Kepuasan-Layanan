"use client";
import { Container, Heading, Box, Spacer, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../swr/fetcher";
import ListCardSkeleton from "../components/ListCardSkeleton";
import ErrorPage from "../components/ErrorPage";
import ListCard from "../components/ListCard";
import CardSkeleton from "../components/CardSkeleton";
import ConclusionPeople from "../components/ConclusionPeople";

export const Conclusion = () => {
  const { data, error, isLoading } = useSWR(`/api/satisfaction`, fetcher, {
    refreshInterval: 3000,
  });

  return (
    <Container mt={20}>
      <Flex direction={"column"} h={"80vh"}>
        <Heading as="h4" size="md" mb={5} mt={5}>
          Daftar data kuisioner
        </Heading>

        <Box overflowY="auto" maxHeight="300px">
          {(isLoading && <ListCardSkeleton />) || (error && <ErrorPage />) || (
            <ListCard data={data} />
          )}
        </Box>

        <Heading as="h4" size="md" mb={5} mt={5}>
          Jumlah orang yang telah mengisi kuesioner
        </Heading>

        <Box mb={5}>
          {(isLoading && <CardSkeleton />) || (error && <ErrorPage />) || (
            <ConclusionPeople data={data} />
          )}
        </Box>
        <Spacer />
      </Flex>
    </Container>
  );
};

export default Conclusion;
