import { Th } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
}

export const TableHeaderCell = ({ children }: TableHeaderCellProps) => (
  <Th
    textTransform="unset"
    color="gray.600"
    border="none"
    fontFamily="heading"
    fontSize="12px"
    lineHeight="16px"
  >
    {children}
  </Th>
);
