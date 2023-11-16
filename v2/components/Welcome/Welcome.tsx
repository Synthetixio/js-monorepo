import { Text, Link, Flex, Box, Button, BoxProps } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { Trans, useTranslation } from 'react-i18next';

export const Welcome = ({ ...props }: BoxProps) => {
  const { t } = useTranslation();
  return (
    <Box {...props}>
      <Text color="whiteAlpha.900" variant="heading" fontWeight="700" fontSize="4xl">
        {t('staking-v2.home.title')}
      </Text>
      <Flex
        gap={1}
        alignItems={['flex-start', 'flex-start', 'flex-start', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Text color="gray.600" variant="heading" fontSize="small">
          <Trans
            i18nKey="staking-v2.home.description"
            components={[
              <Link
                color="cyan.400"
                target="_blank"
                href={EXTERNAL_LINKS.Synthetix.StakingGuide}
              />,
            ]}
          />
        </Text>
        <Link href={EXTERNAL_LINKS.Synthetix.Docs} isExternal _hover={{ textDecoration: 'none' }}>
          <Button variant="outline" px={2} display="block" minW="120px" mt={[3, 3, 3, 0]}>
            {t('staking-v2.home.action')}
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
