import { ChakraTheme, ComponentMultiStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';
import { theme as chakraTheme } from '@synthetixio/v3-theme';
import merge from 'lodash/merge';

const Progress: ComponentMultiStyleConfig = {
  parts: ['filledTrack', 'track'],
  baseStyle: {
    track: {
      overflow: 'unset',
      bg: 'whiteAlpha.100',
    },
  },
  variants: {
    error: (props) => ({
      filledTrack: {
        boxShadow: `0px 0px 15px ${props.theme.colors.error}`,
        bg: 'error',
      },
    }),
    warning: (props) => ({
      filledTrack: {
        boxShadow: `0px 0px 15px ${props.theme.colors.warning}`,
        bg: 'warning',
      },
    }),
    success: (props) => ({
      filledTrack: {
        bg: 'success',
        boxShadow: `0px 0px 15px ${props.theme.colors.success}`,
      },
    }),
  },
};
const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 700,
    borderRadius: 'base',
    color: 'black',
    fontFamily: 'heading',
    lineHeight: '20px',
  },
  variants: {
    connect: {
      bgGradient: chakraTheme.gradients['green-cyan']['500'],
      _hover: {
        bgGradient: chakraTheme.gradients['green-cyan']['600'],
      },
      _active: {
        bgGradient: chakraTheme.gradients['green-cyan']['700'],
      },
    },
    error: {
      bg: 'error',
    },
    warning: {
      bg: 'warning',
    },

    success: {
      bg: 'success',
    },
    disabled: {
      bg: 'gray.900',
      color: 'gray.600',
      opacity: 0.5,
      _disabled: {
        opacity: 0.5,
      },
      _hover: {
        bg: 'gray.900',
        opacity: 0.5,
        _disabled: {
          bg: 'gray.900',
          opacity: 0.5,
        },
      },
    },
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    nav: {
      fontWeight: 600,
      color: 'whiteAlpha.800',
      fontSize: '14px',
      fontFamily: 'heading',
      lineHeight: '20px',
      letterSpacing: 0.55,
    },
  },
};

const Stat: ComponentMultiStyleConfig = {
  parts: ['container', 'label', 'helpText', 'number', 'icon'],
  baseStyle: {
    container: {
      bg: 'navy.900',
      minW: '215px',
      display: 'inline-block',
      px: 4,
      py: 2,
      border: `1px solid ${chakraTheme.colors.gray['900']}`,
      borderRadius: '5px',
      padding: '14px',
    },
    label: {
      color: 'white',
      my: 1,
      ml: 1,
    },
    number: {
      mt: 2,
      mb: 1,
      color: 'whiteAlpha.700',
      fontSize: '14px',
      fontFamily: 'heading',
      fontWeight: 400,
      lineHeight: '16.94px',
    },
  },
};

const Menu: ComponentMultiStyleConfig = {
  parts: ['button', 'list', 'item'],
  baseStyle: {
    button: {
      color: 'white',
      span: {
        display: 'flex',
        alignItems: 'center',
        px: 2,
      },
      height: '100%',
    },
    list: {
      mt: 2,
      bgColor: 'black',
      padding: 0,
      border: 'none',
    },
    item: {
      bgColor: 'black',
      color: 'white',
      py: 3,
      _active: {
        bgColor: 'navy.900',
      },
      _first: {
        borderTopLeftRadius: 'md',
        borderTopRightRadius: 'md',
      },
      _last: {
        borderBottomLeftRadius: 'md',
        borderBottomRightRadius: 'md',
      },
      _focus: {
        bgColor: 'black',
      },
      _even: {
        bgColor: 'whiteAlpha.300',
        _hover: {
          bgColor: 'whiteAlpha.400',
        },
      },
    },
  },
};

export const stakingTheme: Partial<ChakraTheme> = merge(chakraTheme, {
  colors: {
    ...chakraTheme.colors,
    error: chakraTheme.colors.red['400'],
    success: chakraTheme.colors.green['500'],
    warning: chakraTheme.colors.orange['500'],
  },
  components: {
    Progress,
    Button,
    Menu,
    Text,
    Stat,
  },
  styles: {
    global: {
      body: {
        bg: 'navy.900',
        color: 'white',
        backgroundImage: `repeating-linear-gradient(135deg, ${chakraTheme.colors.gray['900']} 0, ${chakraTheme.colors.navy['900']} 1px, transparent 0, transparent 50%)`,
        backgroundSize: '12px 12px',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '3px',
      },
      '::-webkit-scrollbar-thumb': {
        height: '50px',
        borderRadius: '3px',
        bg: 'cyan.500',
      },
      scrollbarFaceColor: 'pink.400',
      scrollbarBaseColor: 'pink.400',
      scrollbar3dlightColor: 'pink.400',
      scrollbarHighlightColor: 'pink.400',
      scrollbarShadowColor: 'pink.400',
      scrollbarDarkShadowColor: 'pink.400',
      scrollbarTrackColor: 'blue.900',
      scrollbarArrowColor: 'blue.900',
      '::-webkit-scrollbar-button': { bg: 'blue.900' },
      '::-webkit-scrollbar-track-piece': { bg: 'blue.900' },
      '::-webkit-resizer': { bg: 'cyan.500' },
      '::-webkit-scrollbar-track': { bg: 'pink.400' },
      '::-webkit-scrollbar-corner': { bg: 'pink.400' },

      // TODO: Update this once styled components removed
      '@media screen and (max-width: 768px)': {
        '.table-header-cell, .table-body-cell': {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
});
