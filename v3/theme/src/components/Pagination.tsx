import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

interface PaginationProps {
  text: string;
  dropdownOptions: number[];
  maxLength: number;
  onChange: (activeIndexes: [number, number]) => void;
}

export default function Pagination({
  text = 'Show rows per page',
  dropdownOptions,
  maxLength,
  onChange,
}: PaginationProps) {
  const [pageSize, setPageSite] = useState(dropdownOptions[0]);
  const [currentPages, setCurrentPages] = useState<[number, number]>([1, pageSize]);
  const handleButtonClick = (ltr: boolean) => {
    if (ltr) {
      const biggerAsMaxLength = currentPages[1] + pageSize > maxLength;
      if (biggerAsMaxLength) {
        setCurrentPages([maxLength - pageSize, maxLength]);
      } else {
        setCurrentPages([currentPages[0] + pageSize, currentPages[1] + pageSize]);
      }
    } else {
      const isSmallerAsZero = currentPages[0] - pageSize <= 0;
      if (isSmallerAsZero) {
        setCurrentPages([1, pageSize]);
      } else {
        setCurrentPages([currentPages[0] - pageSize, currentPages[1] - pageSize]);
      }
    }
  };
  useEffect(() => {
    if (currentPages[0] + pageSize >= maxLength) {
      setCurrentPages([maxLength - pageSize, maxLength]);
    } else {
      setCurrentPages([currentPages[0], currentPages[0] + pageSize]);
    }
  }, [pageSize]);

  useEffect(() => onChange(currentPages), [currentPages]);
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
        {currentPages[0]}-{currentPages[1]} of {maxLength}
      </Text>
      <IconButton
        icon={<ChevronLeftIcon />}
        disabled={currentPages[0] === 1}
        variant="unstyled"
        aria-label="left icon"
        onClick={() => handleButtonClick(false)}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        disabled={maxLength === currentPages[1]}
        variant="unstyled"
        aria-label="right icon"
        onClick={() => handleButtonClick(true)}
      />
    </Flex>
  );
}
