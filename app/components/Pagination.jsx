"use client";
import {
  Button,
  HStack,
  Stack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      start = 2;
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    const pages = [1];
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const PaginationButton = ({ page, ...props }) => (
    <Button
      colorScheme={currentPage === page ? "blue" : "gray"}
      variant={currentPage === page ? "solid" : "outline"}
      size="sm"
      minW="8"
      h="8"
      p="1"
      {...props}
    >
      {page}
    </Button>
  );

  const NavigationButton = ({ icon, children, ...props }) => {
    // Destructure to remove any custom props we don't want to pass to Button
    const { isNext, ...rest } = props;

    return (
      <Button
        colorScheme="gray"
        variant="outline"
        size="sm"
        leftIcon={!isNext && icon}
        rightIcon={isNext && icon}
        {...rest}
      >
        {children}
      </Button>
    );
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      align="center"
      justify="center"
      my={4}
    >
      <NavigationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Sebelumnya
      </NavigationButton>

      <HStack spacing={1} wrap="wrap" justify="center">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <Box key={`ellipsis-${index}`} px={2} py={1}>
              ...
            </Box>
          ) : (
            <PaginationButton
              key={page}
              page={page}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
            />
          )
        )}
      </HStack>

      <NavigationButton
        isNext
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Selanjutnya
      </NavigationButton>
    </Stack>
  );
};

export default Pagination;
