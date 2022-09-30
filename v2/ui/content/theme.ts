import { ChakraTheme, ComponentMultiStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';
import { theme as chakraTheme } from '@synthetixio/v3-theme';
import merge from 'lodash/merge';
import { singleColor, multipleColor } from '../utils/themeUtils';

const Alert: ComponentMultiStyleConfig = {
  parts: ['title', 'description', 'container', 'icon'],
  baseStyle: ({ status }) => {
    return {
      container: {
        background: singleColor(status),
        borderLeft: 'none',
        borderRadius: 'md',
      },
      title: {
        color: 'black',
        fontSize: 'md',
        lineHeight: 'lg',
      },
      description: {
        color: 'black',
        fontSize: 'md',
        lineHeight: 'lg',
      },
      icon: {
        color: 'black',
      },
    };
  },
  variants: {
    solid: ({ status }) => ({
      container: {
        background: multipleColor(status).backgroundColor,
        borderRadius: 'md',
        borderColor: multipleColor(status).borderColor,
        borderWidth: '2px',
        borderLeft: '2px',
      },
      title: {
        color: 'white',
      },
      description: {
        color: 'white',
      },
      icon: {
        color: multipleColor(status).borderColor,
      },
    }),
    'left-accent': ({ status }) => ({
      container: {
        background: multipleColor(status).backgroundColor,
        borderRadius: 'md',
        borderLeftColor: multipleColor(status).borderColor,
        borderLeft: '2px',
      },
      title: {
        color: 'white',
      },
      description: {
        color: 'white',
      },
      icon: {
        color: multipleColor(status).borderColor,
      },
    }),
  },
};

const Badge: ComponentStyleConfig = {
  baseStyle: {
    color: 'cyan.400',
    bg: 'whiteAlpha.300',
    fontFamily: 'heading',
    py: 1,
    px: 2,
  },
  variants: {
    mint: {
      width: '100%',
      textAlign: 'center',
      userSelect: 'none',
      borderRadius: 'base',
      _hover: {
        cursor: 'pointer',
      },
    },
    burn: {
      width: '100%',
      textAlign: 'center',
      userSelect: 'none',
      borderRadius: 'base',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      _hover: {
        cursor: 'pointer',
      },
    },
  },
};

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
    white: {
      filledTrack: {
        bg: 'white',
        borderRadius: 'full',
      },
    },
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
      letterSpacing: 0,
    },
  },
};

const Stat: ComponentMultiStyleConfig = {
  parts: ['container', 'label', 'number'],
  baseStyle: {
    container: {
      bg: 'navy.900',
      minW: '215px',
      display: 'inline-block',
      px: 3,
      py: 3,
      border: `1px solid ${chakraTheme.colors.gray['900']}`,
      borderRadius: '5px',
    },
    label: {
      color: 'white',
    },
    number: {
      mt: 1,
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
      bgColor: 'navy.900',
      padding: 0,
      border: 'none',
      borderRadius: 'md',
      py: 0,
    },
    item: {
      bgColor: 'blackAlpha.300',
      color: 'whiteAlpha.900',
      p: 3,
      _hover: {
        bgColor: 'whiteAlpha.400',
      },
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
        bgColor: 'blackAlpha.400',
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
    Badge,
    Alert,
  },
  styles: {
    global: {
      body: {
        bg: 'navy.900',
        color: 'white',
        backgroundImage: `repeating-linear-gradient(135deg, ${chakraTheme.colors.gray['900']} 0, ${chakraTheme.colors.navy['900']} 1px, transparent 0, transparent 50%)`,
        backgroundSize: '8px 8px',
        paddingBottom: '0px',
        minHeight: '100vh',
      },
      '#app': {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
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
