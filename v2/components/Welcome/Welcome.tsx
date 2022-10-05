import { Text, Link, Flex, Box, Button, BoxProps } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from 'constants/links';
import { Trans, useTranslation } from 'react-i18next';

export const Welcome = ({ ...props }: BoxProps) => {
  const { t } = useTranslation();
  return (
    <Box {...props}>
      <Text color="whiteAlpha.900" variant="heading" fontWeight="700" fontSize="4xl">
        {t('staking-v2.home.title')}
      </Text>
      <Flex alignItems="center">
        <Text color="gray.600" variant="heading" fontSize="small">
          <Trans
            i18nKey="staking-v2.home.description"
            components={[
              <Link color="cyan.400" target="_blank" href={EXTERNAL_LINKS.Synthetix.Litepaper} />,
            ]}
          />
        </Text>
        <Button
          bg="transparent"
          bgImage="none"
          color="cyan.400"
          borderWidth={1}
          borderColor="cyan.400"
          onClick={() => console.log('To introduction')}
        >
          {t('staking-v2.home.action')}
        </Button>
      </Flex>
    </Box>
  );
};
