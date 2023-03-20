import { Td, Th, Tr, Skeleton, TableCellProps } from '@chakra-ui/react';

export const TbodyLoading = ({ numberOfCols }: { numberOfCols: number }) => (
  <Tr w="full">
    {Array.from({ length: numberOfCols }, (_x, i) => (
      <Td key={'skeleton=' + i} border="none">
        <Skeleton w="full" height={6} />
      </Td>
    ))}
  </Tr>
);

export const StyledTh: React.FC<TableCellProps> = (props) => (
  <Th
    sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900', borderTop: 'none' }}
    {...props}
  />
);

export const StyledTd: React.FC<TableCellProps> = (props) => (
  <Td sx={{ borderBottomColor: 'gray.900' }} {...props} />
);
