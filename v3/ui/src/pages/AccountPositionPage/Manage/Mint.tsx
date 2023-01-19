import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { currency } from '@snx-v3/format';
import { NumberInput } from '@snx-v3/NumberInput';
import { Wei } from '@synthetixio/wei';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { formatPercent } from '@snx-v2/formatters';

export function Mint({
  collateral,
  value,
  onChange,
  maxDebt,
}: {
  collateral: CollateralType;
  value: Wei;
  onChange: (value: Wei) => void;
  maxDebt: Wei;
}) {
  const max = maxDebt;

  return (
    <>
      <Heading fontSize="md" mb="1">
        Mint snxUSD
      </Heading>
      <Text fontSize="sm" mb="2">
        Take an interest-free loan against your collateral. This increases your debt and decreases
        your C-Ratio.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={max} />
        </Flex>
        <Flex alignItems="center">
          <Box>
            <Text fontSize="xs">
              Max Mint: ${currency(maxDebt)}
              <Tooltip
                color="white"
                label={`You can't mint snxUSD that takes your C-Ratio below the issuance ratio of ${formatPercent(
                  collateral.issuanceRatioD18.toNumber()
                )}.`}
              >
                <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
              </Tooltip>
              {maxDebt.gt(0) ? (
                <Badge
                  transform="translateY(-1px)"
                  ml="2"
                  as="button"
                  type="button"
                  variant="outline"
                  onClick={() => onChange(maxDebt)}
                >
                  Use Max
                </Badge>
              ) : null}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
