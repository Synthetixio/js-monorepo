import { Text, TextProps } from '@chakra-ui/react';
import Wei, { wei } from '@synthetixio/wei';

export const GreenOrRedText = (props: TextProps & { value: Wei | number }) => (
  <Text color={wei(props.value).gte(0) ? 'green.500' : 'red.400'} {...props} />
);
