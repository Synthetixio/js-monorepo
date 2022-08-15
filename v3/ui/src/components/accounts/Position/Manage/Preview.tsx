import { Text, Box } from '@chakra-ui/react';

export default function Preview() {
  return (
    <Box mb="4" p="4">
      <Text
        fontSize="sm"
        pb="2"
        fontWeight="semibold"
        borderBottom="1px solid rgba(255,255,255,0.2)"
      >
        Preview Changes
      </Text>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>Collateral</strong>
        <Text color="green.400" float="right">
          100 SNX → 110 SNX
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>snxUSD Debt</strong>
        <Text color="green.400" float="right">
          $400 → $390
        </Text>
      </Box>
      <Box py="2" borderBottom="1px solid rgba(255,255,255,0.2)">
        <strong>C-Ratio</strong>
        <Text color="green.400" float="right">
          200% → 210%
        </Text>
      </Box>
    </Box>
  );
}
