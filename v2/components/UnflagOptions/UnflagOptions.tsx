import {
  Box,
  Heading,
  useRadioGroup,
  Text,
  useRadio,
  UseRadioProps,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { CollectIcon, InfoIcon, MaintainIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

const RadioItemContent: React.FC<{
  radioProps: UseRadioProps;
  option: 'unflag' | 'swap' | 'self-liquidate';
  recommended: boolean;
  disabled: boolean;
}> = ({ radioProps, option, disabled, recommended }) => {
  const { t } = useTranslation();

  const { getCheckboxProps, getInputProps, state } = useRadio(radioProps);
  const checkbox = getCheckboxProps();
  const input = getInputProps();

  return (
    <Box
      border="1px"
      as="label"
      borderRadius="5px"
      paddingY="4"
      paddingX="4"
      borderColor={state.isChecked ? 'success' : 'gray.900'}
      marginBottom="4"
      background={disabled ? 'gray.900' : 'none'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      <input {...input} disabled={disabled} />
      <Box {...checkbox}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            {option === 'unflag' ? (
              <MaintainIcon color={state.isChecked ? 'success' : 'white'} />
            ) : (
              <CollectIcon color={state.isChecked ? 'success' : 'white'} />
            )}
            <Box marginLeft="4">
              {recommended && (
                <Badge
                  paddingY="0"
                  paddingX="1"
                  color="success"
                  bg="green.900"
                  border="1px"
                  borderColor="success"
                  display="flex"
                  alignItems="center"
                  width="fit-content"
                  fontSize="x-small"
                  borderRadius="base"
                  fontWeight="700"
                  marginBottom="2"
                >
                  <InfoIcon color="success" width="10px" height="10px" />
                  <Text ml="0.5">{t('staking-v2.unflag-options.recommended')}</Text>
                </Badge>
              )}
              <Heading size="sm" color={disabled ? 'gray.9600' : 'white'}>
                {t(`staking-v2.unflag-options.${option}.heading`, { selfLiquidationPenalty: 20 })}
              </Heading>
              <Text fontSize="xs" color={disabled ? 'gray.600' : 'whiteAlpha.800'}>
                {t(`staking-v2.unflag-options.${option}.text`, { selfLiquidationPenalty: 20 })}
              </Text>
            </Box>
          </Flex>
          <Box
            boxSize="5"
            borderRadius="100%"
            borderColor={disabled ? 'gray.800' : 'cyan.400'}
            borderWidth={state.isChecked ? '6px' : '2px'}
          />
        </Flex>
      </Box>
    </Box>
  );
};
export const UnflagOptionsUi: React.FC<{
  sUSDBalance: number;
  sUSDToGetBackToTarget: number;
}> = ({ sUSDBalance, sUSDToGetBackToTarget }) => {
  const options = ['unflag', 'swap', 'self-liquidate'] as const;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'UnflagOptions',
    defaultValue: 'unflag',

    onChange: (x) => {
      console.log(x);
    },
  });

  const group = getRootProps();
  const enoughSUsd = sUSDBalance >= sUSDToGetBackToTarget;
  const recommended = enoughSUsd ? 'unflag' : 'swap';
  return (
    <Flex flexDirection="column" {...group}>
      {options.map((option) => {
        return (
          <RadioItemContent
            recommended={recommended === option}
            disabled={option === 'unflag' && !enoughSUsd}
            key={option}
            option={option}
            radioProps={getRadioProps({ value: option })}
          />
        );
      })}
    </Flex>
  );
};
