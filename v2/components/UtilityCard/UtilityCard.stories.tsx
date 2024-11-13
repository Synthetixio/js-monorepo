import { UtilityCard } from './UtilityCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DHedgeIcon,
  KwentaIcon,
  LyraIcon,
  ThalesIcon,
  OvertimeIcon,
  PolynomialIcon,
} from '@snx-v2/icons';
import { Image } from '@chakra-ui/react';
import CurveLogo from '../../ui/assets/svg/app/curve.svg';

export default {
  title: 'UtilityCard',
  component: UtilityCard,
} as ComponentMeta<typeof UtilityCard>;

const Template: ComponentStory<typeof UtilityCard> = (props) => <UtilityCard {...props} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});
export const Quaternary = Template.bind({});
export const Quinary = Template.bind({});
export const Senary = Template.bind({});
export const Septenary = Template.bind({});

Primary.args = {
  title: 'Kwenta',
  description:
    'Trade commodities, forex, crypto, and more with up to 25x leverage and deep liquidity.',
  Icon: KwentaIcon,
  link: 'https://kwenta.io',
};

Secondary.args = {
  title: 'dHedge',
  description:
    'Use your sUSD to find the best investment managers and automated strategies in DeFi.',
  Icon: DHedgeIcon,
  link: 'https://www.dhedge.org/',
};

Tertiary.args = {
  title: 'Lyra',
  description:
    'Lyra’s decentralized exchange is the easiest place to buy and sell options on cryptocurrencies.',
  Icon: LyraIcon,
  link: 'https://www.lyra.finance/',
};

Quaternary.args = {
  title: 'Thales',
  description:
    'Trade various parimutuel markets like price up or down, sports markets, and others.',
  Icon: ThalesIcon,
  link: 'https://thalesmarket.io/',
};

Quinary.args = {
  title: 'Curve',
  description:
    'Deposit your synths into curve pools for yield on synth pairs and help provide liquidity to the ecosystem.',
  Icon: () => <Image src={CurveLogo} />,
  link: 'https://curve.fi/',
};

Senary.args = {
  title: 'Overtime Markets',
  description: 'Sports positional markets, built on Thales.',
  Icon: OvertimeIcon,
  link: 'https://overtimemarkets.xyz/',
};

Septenary.args = {
  title: 'Polynomial',
  description:
    "Polynomial is an automated DeFi options vault that generates yield by selling directly to Lyra's options AMM",
  Icon: PolynomialIcon,
  link: 'https://www.polynomial.fi/',
};
