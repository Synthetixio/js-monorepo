import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

interface PaginationProps {
  text: string;
  dropdownOptions: number[];
  maxLength: number;
  /**
   * @returns the two indexes that the array needs to be sliced.
   */
  onChange: (activeIndexes: [number, number]) => void;
}

export default function Pagination({
  text = 'Show rows per page',
  dropdownOptions = [8, 16, 24],
  maxLength,
  onChange,
}: PaginationProps) {
  const [pageSize, setPageSite] = useState(dropdownOptions[0]);
  const [currentPage, setCurrentPage] = useState<[number, number]>([1, pageSize]);
  const currentPageString = currentPage.toString();
  const handleButtonClick = (ltr: boolean) => {
    if (ltr) {
      const biggerAsMaxLength = currentPage[1] + pageSize > maxLength;
      if (biggerAsMaxLength) {
        setCurrentPage([maxLength - pageSize, maxLength]);
      } else {
        setCurrentPage([currentPage[0] + pageSize, currentPage[1] + pageSize]);
      }
    } else {
      const isSmallerOrEvenToZero = currentPage[0] - pageSize <= 0;
      if (isSmallerOrEvenToZero) {
        setCurrentPage([1, pageSize]);
      } else {
        setCurrentPage([currentPage[0] - pageSize, currentPage[1] - pageSize]);
      }
    }
  };

  useEffect(() => {
    setCurrentPage([1, pageSize]);
  }, [pageSize]);

  useEffect(() => {
    onChange(currentPageString.split(',').map((page) => Number(page) - 1) as [number, number]);
  }, [currentPageString]);
  return (
    <Flex alignItems={'center'} gap="2">
      <Text fontSize={'sm'} fontFamily="body" color="gray.700">
        {text}
      </Text>
      <Box borderWidth="1px" borderStyle="solid" borderColor="gray.900" borderRadius="6px">
        <Select
          onChange={(value) => setPageSite(Number(value.target.value))}
          iconColor="cyan.500"
          size={'sm'}
        >
          {dropdownOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
      </Box>
      <Text fontFamily="body" color="white" fontSize={'sm'}>
        {currentPage[0]}-{currentPage[1]} of {maxLength}
      </Text>
      <IconButton
        icon={<ChevronLeftIcon />}
        disabled={currentPage[0] === 1}
        variant="unstyled"
        aria-label="left icon"
        onClick={() => handleButtonClick(false)}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        disabled={maxLength === currentPage[1]}
        variant="unstyled"
        aria-label="right icon"
        onClick={() => handleButtonClick(true)}
      />
    </Flex>
  );
}
