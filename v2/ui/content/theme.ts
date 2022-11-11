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
        borderLeft: '4px',
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

const Tooltip: ComponentStyleConfig = {
  baseStyle: {
    color: 'white',
    bg: 'gray.900',
    borderRadius: 'base',
    p: 2,
    fontFamily: 'heading',
    fontSize: '14px',
    lineHeight: '20px',
    '--popper-arrow-bg': 'var(--chakra-colors-gray-900)',
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
    // Variant used for mint/burn
    solid: {
      bgGradient: chakraTheme.gradients['green-cyan']['500'],
      _hover: {
        bgGradient: chakraTheme.gradients['green-cyan']['600'],
      },
      _active: {
        bgGradient: chakraTheme.gradients['green-cyan']['700'],
      },
      _disabled: {
        bgGradient: 'unset',
        bg: 'gray.900',
        color: 'gray.600',
        _hover: {
          bg: 'gray.900',
          _disabled: {
            bg: 'gray.900',
          },
        },
      },
    },
    link: {
      height: 10,
      color: 'cyan.500',
    },
    outline: {
      bgColor: 'rgba(0, 209, 255, 0.12)',
      bgOpacity: '0.2',
      bgImage: 'none',
      color: 'cyan.400',
      borderWidth: 1,
      borderColor: 'cyan.400',
      _hover: {
        bgColor: 'rgba(0, 209, 255, 0.24)',
      },
      _active: {
        bgColor: 'rgba(0, 209, 255, 0.24)',
      },
      _disabled: {
        color: 'gray.900',
        bgColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray.900',
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
const Divider: ComponentStyleConfig = {
  baseStyle: { borderColor: 'gray.900' },
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
    Tooltip,
    Divider,
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        display: 'none',
      },
      ':root': {
        // Backgrounds
        '--onboard-main-scroll-container-background':
          'linear-gradient(73.6deg, #171923 2.11%, #141414 100%);',
        '--onboard-connect-content-background':
          'linear-gradient(73.6deg, #171923 2.11%, #141414 100%);',
        '--onboard-connect-sidebar-background':
          'linear-gradient(73.6deg, #171923 2.11%, #141414 100%);',
        '--onboard-connect-header-background':
          'linear-gradient(73.6deg, #171923 2.11%, #141414 100%);',
        '--onboard-wallet-button-background': '#2D2D3880',
        '--onboard-wallet-button-background-hover': '#2D2D3850',
        '--onboard-wallet-app-icon-border-color': '#FFFFFF29',
        // Colors
        '--onboard-connect-header-color': 'transparent',
        '--onboard-connect-sidebar-color': 'white',
        '--onboard-close-button-background': 'transparent',
        '--onboard-close-button-color': 'white',
        '--onboard-checkbox-background': '#0b0b22',
        '--onboard-checkbox-color': 'white',
        '--onboard-connect-sidebar-progress-background': '#FFFFFF',
        '--onboard-connect-sidebar-progress-color': '#00d1ff',
        '--onboard-wallet-button-color': 'white',
        '--onboard-wallet-button-color-hover': 'white',
        '--onboard-wallet-button-border-color': '#2D2D38',
        // Fonts
        '--account-select-modal-font-family-normal': 'Inter',
        // Radius
        '--onboard-wallet-button-border-radius': '10px',
      },

      body: {
        bg: 'navy.900',
        color: 'white',
        backgroundImage: `repeating-linear-gradient(135deg, ${chakraTheme.colors.gray['900']}70 0, ${chakraTheme.colors.navy['900']} 1px, transparent 0, transparent 50%)`,
        backgroundSize: '8px 8px',
        paddingBottom: '0px',
        minHeight: '100vh',
      },
      '#app': {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
      },

      // TODO: Update this once styled components removed
      '@media screen and (max-width: 768px)': {
        '.table-header-cell, .table-body-cell': {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
});
