import { UtilityCard } from './UtilityCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DHedgeIcon, KwentaIcon, LyraIcon, ThalesIcon } from '@snx-v2/icons';
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
    'Deposit your sUSD or sETH into Curve pools for consistent, secure yield on synth pairs.',
  Icon: () => <Image src={CurveLogo} />,
  link: 'https://curve.fi/',
};
