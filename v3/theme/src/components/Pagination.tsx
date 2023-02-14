import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface PaginationProps {
  text: string;
  dropdownOptions: number[];
  maxLength: number;
  /**
   * @returns the two indexes that the array needs to be sliced.
   */
  onChange: (activeIndexes: [number, number]) => void;
}

const getCurrentPage = ({
  ltr,
  currentPage,
  pageSize,
  maxLength,
}: {
  ltr: boolean;
  pageSize: number;
  maxLength: number;
  currentPage: [number, number];
}): [number, number] => {
  if (ltr) {
    const biggerAsMaxLength = currentPage[1] + pageSize > maxLength;
    if (biggerAsMaxLength) {
      return [maxLength - pageSize, maxLength];
    } else {
      return [currentPage[0] + pageSize, currentPage[1] + pageSize];
    }
  } else {
    const isSmallerOrEvenToZero = currentPage[0] - pageSize <= 0;
    if (isSmallerOrEvenToZero) {
      return [1, pageSize];
    } else {
      return [currentPage[0] - pageSize, currentPage[1] - pageSize];
    }
  }
};

export default function Pagination({
  text = 'Show rows per page',
  dropdownOptions = [8, 16, 24],
  maxLength,
  onChange,
}: PaginationProps) {
  const [pageSize, setPageSite] = useState(dropdownOptions[0]);
  const [currentPage, setCurrentPage] = useState<[number, number]>([1, pageSize]);
  const handleButtonClick = (ltr: boolean) => {
    const newCurrentPage = getCurrentPage({
      ltr,
      currentPage,
      pageSize,
      maxLength,
    });
    setCurrentPage(newCurrentPage);
    onChange([newCurrentPage[0] - 1, newCurrentPage[1] - 1]);
  };

  return (
    <Flex alignItems="center" gap="2">
      <Text fontSize="sm" fontFamily="body" color="gray.700">
        {text}
      </Text>
      <Box borderWidth="1px" borderStyle="solid" borderColor="gray.900" borderRadius="6px">
        <Select
          onChange={(value) => {
            const newPageSize = Number(value.target.value);
            setPageSite(newPageSize);
            setCurrentPage([1, newPageSize]);
          }}
          iconColor="cyan.500"
          size="sm"
        >
          {dropdownOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
      </Box>
      <Text fontFamily="body" color="white" fontSize="sm">
        {currentPage[0]}-{currentPage[1]} of {maxLength}
      </Text>
      <IconButton
        icon={<ChevronLeftIcon />}
        isDisabled={currentPage[0] === 1}
        variant="unstyled"
        aria-label="left icon"
        onClick={() => handleButtonClick(false)}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        isDisabled={maxLength === currentPage[1]}
        variant="unstyled"
        aria-label="right icon"
        onClick={() => handleButtonClick(true)}
      />
    </Flex>
  );
}
