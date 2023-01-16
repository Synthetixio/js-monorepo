import { Text, TextProps } from '@chakra-ui/react';
import Wei, { wei } from '@synthetixio/wei';

export const TrendText = (props: TextProps & { value: Wei | number }) => (
  <Text color={wei(props.value).gte(0) ? 'success' : 'error'} {...props} />
);
