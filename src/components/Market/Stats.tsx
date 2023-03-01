import {
  Box,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export function Stats() {
  return (
    <StatGroup display="flex" flex="1">
      <Stat flex="1" p="4" borderLeft="1px solid rgba(255,255,255,0.2)">
        <StatLabel>Market Price</StatLabel>
        <StatNumber>$123,123</StatNumber>
        <StatHelpText display="inline">
          <StatArrow type="decrease" />
          9.05% (24 hr.)
        </StatHelpText>
      </Stat>
      <Stat flex="1" p="4" borderLeft="1px solid rgba(255,255,255,0.2)">
        <StatLabel>Index Price</StatLabel>
        <StatNumber>$123,123</StatNumber>
      </Stat>
      <Stat flex="1" p="4" borderLeft="1px solid rgba(255,255,255,0.2)">
        <StatLabel>Funding Rate</StatLabel>
        <StatNumber>-34%</StatNumber>
        <StatHelpText display="inline">
          <StatArrow type="decrease" />
          9.05% (24 hr.)
        </StatHelpText>
      </Stat>

      <Stat flex="1" p="4" borderLeft="1px solid rgba(255,255,255,0.2)">
        <StatLabel>Open Interest (Long)</StatLabel>
        <StatNumber>$100,000</StatNumber>
        <StatHelpText>9.05% ($1,000,000 total)</StatHelpText>
      </Stat>

      <Stat flex="1" p="4" borderLeft="1px solid rgba(255,255,255,0.2)">
        <StatLabel>Open Interest (Short)</StatLabel>
        <StatNumber>$100,000</StatNumber>
        <StatHelpText>9.05% ($1,000,000 total)</StatHelpText>
      </Stat>
    </StatGroup>
  );
}
