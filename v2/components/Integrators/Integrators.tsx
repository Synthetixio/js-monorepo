import React, { FC } from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  DHedgeIcon,
  KwentaIcon,
  LyraIcon,
  ThalesIcon,
  OvertimeIcon,
  PolynomialIcon,
  TorosIcon,
} from '@snx-v2/icons';
import CurveLogo from '../../ui/assets/svg/app/curve.svg';
import { UtilityCard } from '@snx-v2/UtilityCard';
import { useIntegratorSorting } from '../../lib/useIntegratorSorting';

type Integrator = {
  key: string;
  mt?: number | number[];
  title: string;
  description: string;
  link: string;
  Icon: FC;
};

const sortIntegrators = (integrators: Integrator[], order: string[]) => {
  return [...integrators].sort((a, b) => {
    const indexA = order.indexOf(a.key);
    const indexB = order.indexOf(b.key);

    // If a's key is not in order, but b's is, put a after b
    if (indexA === -1 && indexB !== -1) return 1;

    // If b's key is not in order, but a's is, put b after a
    if (indexB === -1 && indexA !== -1) return -1;

    // If neither are in order, keep their relative order unchanged
    if (indexA === -1 && indexB === -1) return 0;

    // Otherwise, sort according to order
    return indexA - indexB;
  });
};

const IntegratorsUi = ({ integratorOrder }: { integratorOrder?: string[] }) => {
  const { t } = useTranslation();

  if (!integratorOrder) return null;

  const integrators = [
    {
      key: 'kwenta',
      mt: 6,
      title: 'Kwenta',
      description: t('staking-v2.home.utilities.kwentaDescription'),
      link: 'https://kwenta.io',
      Icon: KwentaIcon,
    },
    {
      key: 'dhedge',
      title: 'dHedge',
      description: t('staking-v2.home.utilities.dHedgeDescription'),
      link: 'https://www.dhedge.org/',
      Icon: DHedgeIcon,
      mt: [4, 6, 6],
    },
    {
      key: 'lyra',
      title: 'Lyra',
      description: t('staking-v2.home.utilities.lyraDescription'),
      link: 'https://www.lyra.finance/',
      Icon: LyraIcon,
      mt: [4, 6, 6],
    },
    {
      key: 'thales',
      title: 'Thales',
      description: t('staking-v2.home.utilities.thalesDescription'),
      link: 'https://thalesmarket.io/',
      Icon: ThalesIcon,
      mt: [4, 6, 6],
    },
    {
      key: 'curve',
      title: 'Curve',
      description: t('staking-v2.home.utilities.curveDescription'),
      link: 'https://curve.fi/',
      Icon: () => <CurveLogo />,
      mt: [4, 6, 6],
    },
    {
      key: 'overtime markets',
      title: 'Overtime Markets',
      description: t('staking-v2.home.utilities.overtimeDescription'),
      link: 'https://overtimemarkets.xyz/',
      Icon: OvertimeIcon,
      mt: [4, 6, 6],
    },
    {
      key: 'polynomial',
      title: 'Polynomial',
      description: t('staking-v2.home.utilities.polynomialDescription'),
      link: 'https://www.polynomial.fi/',
      Icon: PolynomialIcon,
      mt: [4, 6, 6],
    },
    {
      key: 'toros',
      title: 'Toros',
      description: t('staking-v2.home.utilities.torosDescription'),
      link: 'https://toros.finance/',
      Icon: () => <TorosIcon height="40px" />,
      mt: [4, 6, 6],
    },
  ];

  const sortedIntegrators = sortIntegrators(integrators, integratorOrder);

  return (
    <Container maxW="1200px" bg="transparent" mt={0}>
      <SimpleGrid width="100%" minChildWidth="260px" spacingX="4">
        {sortedIntegrators.map((integrator) => (
          <UtilityCard {...integrator} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const Integrators = () => {
  const { data: integratorOrder } = useIntegratorSorting();

  return <IntegratorsUi integratorOrder={integratorOrder} />;
};
