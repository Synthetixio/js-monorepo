import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";

export function Stats() {
  return (
    <StatGroup display="flex" flex="1">
      <Stat
        flex="1"
        p="2"
        borderLeft="1px solid rgba(255,255,255,0.2)"
        height="100%"
      >
        <StatLabel>Market Price</StatLabel>
        <StatNumber fontSize="lg" fontFamily="mono" fontWeight="thin">
          $123,123
        </StatNumber>
      </Stat>
      <Stat
        flex="1"
        p="2"
        borderLeft="1px solid rgba(255,255,255,0.2)"
        height="100%"
      >
        <StatLabel>Index Price</StatLabel>
        <StatNumber fontSize="lg" fontFamily="mono" fontWeight="thin">
          $123,123
        </StatNumber>
      </Stat>
      <Stat
        flex="1"
        p="2"
        borderLeft="1px solid rgba(255,255,255,0.2)"
        height="100%"
      >
        <StatLabel>1H Funding Rate</StatLabel>
        <StatNumber fontSize="lg" fontFamily="mono" fontWeight="thin">
          -34%
        </StatNumber>
      </Stat>
      <Stat
        flex="1"
        p="2"
        borderLeft="1px solid rgba(255,255,255,0.2)"
        height="100%"
      >
        <StatLabel>Open Interest (Long)</StatLabel>
        <StatNumber fontSize="lg" fontFamily="mono" fontWeight="thin">
          $1.3M/$8.7M
        </StatNumber>
      </Stat>
      <Stat
        flex="1"
        p="2"
        borderLeft="1px solid rgba(255,255,255,0.2)"
        height="100%"
      >
        <StatLabel>Open Interest (Short)</StatLabel>
        <StatNumber fontSize="lg" fontFamily="mono" fontWeight="thin">
          $3.3M/$8.7M
        </StatNumber>
      </Stat>
    </StatGroup>
  );
}
