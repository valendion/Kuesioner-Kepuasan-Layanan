"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Heading,
  Box,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  VStack,
  Text,
  useToast,
  Spinner,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { threeYearBefore } from "../utils/contans";

const months = [
  { value: "all", label: "Semua Bulan" },
  { value: "1", label: "Januari" },
  { value: "2", label: "Februari" },
  { value: "3", label: "Maret" },
  { value: "4", label: "April" },
  { value: "5", label: "Mei" },
  { value: "6", label: "Juni" },
  { value: "7", label: "Juli" },
  { value: "8", label: "Agustus" },
  { value: "9", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

export default function ReportPage() {
  const toast = useToast();
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue(
    "linear-gradient(135deg, #3182ce 0%, #319795 100%)",
    "linear-gradient(135deg, #2b6cb0 0%, #2c7a7b 100%)"
  );
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.750");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/satisfaction/report?month=${selectedMonth}&year=${selectedYear}`
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data survei.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePrint = () => {
    window.print();
  };

  const mapAnswersToNumbers = (answersStr) => {
    if (!answersStr) return "-";
    try {
      let arr = [];
      if (typeof answersStr === "string") {
        if (answersStr.startsWith("{") && answersStr.endsWith("}")) {
          const cleaned = answersStr.slice(1, -1);
          arr = cleaned.split(",").map((v) => v.trim());
        } else {
          arr = JSON.parse(answersStr);
        }
      } else if (Array.isArray(answersStr)) {
        arr = answersStr;
      }

      if (!Array.isArray(arr)) return "-";

      const mapping = {
        1: 1, 2: 2, 3: 3, 4: 4,
        "1": 1, "2": 2, "3": 3, "4": 4,
        "a": 1, "b": 2, "c": 3, "d": 4,
        "A": 1, "B": 2, "C": 3, "D": 4
      };
      return arr.map((val) => mapping[val] !== undefined ? mapping[val] : val).join(", ");
    } catch (e) {
      return "-";
    }
  };

  const getMonthLabel = (val) => {
    const found = months.find((m) => m.value === val);
    return found ? found.label : "";
  };

  return (
    <Container maxW="container.xl" mt={20} mb={10} className="print-container">
      {/* ====== CSS PRINT & SCREEN ====== */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* SCREEN: Border manis pada tabel */
          .print-table {
            border-collapse: collapse !important;
            width: 100%;
          }
          .print-table th,
          .print-table td {
            border: 1px solid #e2e8f0 !important;
          }
          .print-table th {
            border-bottom: 2px solid #3182ce !important;
          }
          .print-table tbody tr:last-child td {
            border-bottom: 1px solid #e2e8f0 !important;
          }

          /* PRINT */
          @media print {
            @page {
              margin: 1.5cm;
              size: A4 portrait;
            }

            .no-print, nav, footer, header {
              display: none !important;
            }

            html, body {
              height: auto !important;
              min-height: 0 !important;
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            div.chakra-flex, #__next, body > div {
              height: auto !important;
              min-height: 0 !important;
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .print-container {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: transparent !important;
            }

            .print-container .chakra-card {
              background: transparent !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .print-header {
              display: block !important;
              text-align: center !important;
              margin: 0 0 15px 0 !important;
              padding: 0 0 10px 0 !important;
              border-bottom: 2px solid #000 !important;
              page-break-after: avoid !important;
              break-after: avoid-page !important;
            }

            .print-header h1 {
              font-size: 16pt !important;
              font-weight: bold !important;
              margin: 0 !important;
              color: #000 !important;
            }

            .print-header h2 {
              font-size: 13pt !important;
              margin: 5px 0 0 0 !important;
              color: #000 !important;
            }

            .print-table-wrap {
              page-break-before: avoid !important;
              break-before: avoid-page !important;
              padding: 0 !important;
              margin: 0 !important;
              box-shadow: none !important;
              border: none !important;
              overflow: visible !important;
            }

            .chakra-table__container, div[class*="TableContainer"] {
              overflow: visible !important;
              overflow-x: visible !important;
              display: block !important;
            }

            /* ===== BORDER TABEL HITAM TEGAS SAAT PRINT ===== */
            .print-table {
              border-collapse: collapse !important;
              width: 100% !important;
              margin-top: 10px !important;
            }

            .print-table th,
            .print-table td {
              border: 1px solid #000 !important;
              padding: 5px 7px !important;
              font-size: 9pt !important;
              color: black !important;
              background-color: transparent !important;
            }

            .print-table thead {
              display: table-header-group !important;
            }

            .print-table th {
              background-color: #e2e8f0 !important;
              font-weight: bold !important;
              text-align: center !important;
            }

            .print-table td {
              text-align: left !important;
            }

            .text-center {
              text-align: center !important;
            }

            .cell-wrap {
              white-space: normal !important;
              word-wrap: break-word !important;
              max-width: 250px !important;
            }

            .cell-answers {
              white-space: normal !important;
              word-wrap: break-word !important;
              max-width: 150px !important;
              letter-spacing: 0.05em !important;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `
      }} />

      {/* ===== SCREEN: Kontrol & Header ===== */}
      <Card bg={cardBg} shadow="lg" borderRadius="xl" overflow="hidden" className="no-print" mb={8}>
        <Box bg={headerBg} p={6} color="white">
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={4}>
            <VStack align="start" spacing={1}>
              <Heading as="h1" size="lg">Laporan Kuesioner Kepuasan Layanan</Heading>
              <Text opacity={0.9} fontSize="sm">Unduh dan cetak laporan kepuasan responden berdasarkan bulan dan tahun</Text>
            </VStack>
            <Button
              leftIcon={<Icon as={FaFilePdf} />}
              colorScheme="red"
              onClick={handlePrint}
              isDisabled={loading || data.length === 0}
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
              size="md"
            >
              Cetak PDF
            </Button>
          </Flex>
        </Box>

        <CardBody p={6}>
          <HStack spacing={4} width="100%" direction={{ base: "column", sm: "row" }} align="end" wrap="wrap">
            <Box flex={1} minW="200px">
              <Text fontWeight="semibold" mb={2} fontSize="sm">Pilih Bulan</Text>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                focusBorderColor="blue.500"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </Select>
            </Box>

            <Box flex={1} minW="200px">
              <Text fontWeight="semibold" mb={2} fontSize="sm">Pilih Tahun</Text>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                focusBorderColor="blue.500"
              >
                {threeYearBefore().map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </Box>

            <Button
              colorScheme="blue"
              onClick={fetchData}
              isLoading={loading}
              minW="120px"
            >
              Filter
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {/* ===== PRINT: Header Resmi ===== */}
      <Box display="none" className="print-header" textAlign="center">
        <h1>LAPORAN HASIL KUESIONER KEPUASAN MASYARAKAT</h1>
        <h2>PUSKESMAS LAPADDE</h2>
        <Text fontSize="md" mt={2} fontWeight="medium">
          Periode: {selectedMonth === "all" ? "Semua Bulan" : getMonthLabel(selectedMonth)} Tahun {selectedYear}
        </Text>
      </Box>

      {/* ===== TABEL ===== */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" overflow="hidden" p={6} className="print-table-wrap">
        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Flex>
        ) : data.length === 0 ? (
          <Flex justify="center" align="center" direction="column" minH="200px" py={10}>
            <Text fontSize="lg" color="gray.500" fontWeight="medium">Tidak ada data untuk periode ini.</Text>
            <Text fontSize="sm" color="gray.400" mt={1}>Silakan pilih filter bulan atau tahun lainnya.</Text>
          </Flex>
        ) : (
          <Box>
            <TableContainer overflowX="auto">
              <Table variant="simple" size="md" className="print-table">
                <Thead bg={tableHeaderBg}>
                  <Tr>
                    <Th width="50px" className="text-center">No</Th>
                    <Th width="80px" className="text-center">Umur</Th>
                    <Th width="120px">Gender</Th>
                    <Th width="150px">Pekerjaan</Th>
                    <Th className="cell-wrap">Layanan yang Diterima</Th>
                    <Th className="cell-answers">Jawaban</Th>
                    <Th className="cell-wrap">Saran</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((patient, index) => (
                    <Tr key={patient.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                      <Td className="text-center" fontWeight="medium">{index + 1}</Td>
                      <Td className="text-center">{patient.age}</Td>
                      <Td>{patient.gender}</Td>
                      <Td>{patient.occupation}</Td>
                      <Td className="cell-wrap">{patient.services_received}</Td>
                      <Td className="cell-answers" fontWeight="semibold" color="teal.500">
                        {mapAnswersToNumbers(patient.answers)}
                      </Td>
                      <Td className="cell-wrap" fontSize="sm" color={patient.suggestion ? undefined : "gray.400"} fontStyle={patient.suggestion ? undefined : "italic"}>
                        {patient.suggestion || "Tidak ada saran"}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Box mt={4} className="no-print" textAlign="right">
              <Text fontWeight="semibold" fontSize="sm">Total Responden: {data.length} Orang</Text>
            </Box>
          </Box>
        )}
      </Card>
    </Container>
  );
}