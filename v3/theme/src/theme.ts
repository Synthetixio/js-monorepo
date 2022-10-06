import { ComponentStyleConfig, cssVar, defineStyle, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const gradients = {
  'green-cyan': {
    500: 'linear(to-tr, green.500, cyan.500)',
    600: 'linear(to-tr, green.600, cyan.600)',
    700: 'linear(to-tr, green.700, cyan.800)',
  },

  grey: {
    900: 'linear(to-tr, grey.900, blackAlpha.900)',
  },
  dark: {
    500: 'linear(to-tr, #171923, #141414)',
  },

  'pink-purple': {
    500: 'linear(to-tr, pink.500, purple.500)',
    600: 'linear(to-tr, pink.600, purple.600)',
    700: 'linear(to-tr, pink.700, purple.800)',
  },

  'pink-blue': {
    500: 'linear(to-tr, pink.500, blue.500)',
    600: 'linear(to-tr, pink.600, blue.600)',
    700: 'linear(to-tr, pink.700, blue.800)',
  },
  'pink-cyan': {
    500: 'linear(to-tr, pink.500, cyan.500)',
    600: 'linear(to-tr, pink.600, cyan.600)',
    700: 'linear(to-tr, pink.700, cyan.800)',
  },

  orange: {
    500: 'linear(to-tr, orange.500, orange.300)',
    600: 'linear(to-tr, orange.600, orange.400)',
    700: 'linear(to-tr, orange.700, orange.500)',
  },
};

// adapted from https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/button.ts#L90
const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      color: mode(`black`, `whiteAlpha.900`)(props),
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  const bg = `${c}.500`;
  const color = 'white';
  const hoverBg = `${c}.600`;
  const activeBg = `${c}.700`;
  const background = mode(bg, `${c}.600`)(props);

  return {
    bg: background,
    color: mode(color, `white`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.500`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
});

const Button: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  variants: {
    solid: variantSolid,
    gradient: {
      bgGradient: gradients['green-cyan'][500],
      color: 'black',
      _hover: {
        bgGradient: gradients['green-cyan'][600],
        _disabled: {
          background: gradients['green-cyan'][500],
        },
      },
      _active: {
        bgGradient: gradients['green-cyan'][700],
      },
    },
    outline: (props) => {
      if (props.colorScheme === 'gray') {
        return {
          color: 'white.500',
          borderColor: 'gray.900',
        };
      }
      return {
        color: `${props.colorScheme}.500`,
      };
    },
    ghost: (props) => ({
      color: `${props.colorScheme}.500`,
    }),
  },
};
const Input: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'cyan.500',
    errorBorderColor: 'red.500',
  },
};
const Select: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'cyan.500',
    iconColor: 'cyan.500',
    errorBorderColor: 'red.500',
  },
};
const NumberInput: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'cyan.500',
    errorBorderColor: 'red.500',
  },
};

const Textarea: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'cyan.500',
    colorScheme: 'cyan',
    errorBorderColor: 'red.500',
  },
};

const Alert: ComponentStyleConfig = {
  defaultProps: {
    variant: 'left-accent',
  },
  variants: {
    'left-accent': (props) => {
      return {
        container: {
          bg: `${props.colorScheme}.900`,
          borderInlineStartColor: `${props.colorScheme}.500`,
        },
      };
    },
    solid: (props) => {
      return { container: { bg: `${props.colorScheme}.500`, color: 'black' } };
    },
  },
};
const Skeleton: ComponentStyleConfig = {
  defaultProps: {
    startColor: 'gray.900',
    endColor: 'gray.800',
  },
};
const Checkbox: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  baseStyle: {
    control: {
      borderColor: 'cyan.500',
      _checked: {
        bg: 'cyan.500',
        borderColor: 'cyan.500',
        _hover: {
          bg: 'cyan.600',
          borderColor: 'cyan.600',
        },
      },
      _invalid: {
        borderColor: 'red.500',
      },
      _disabled: {
        _hover: {
          borderColor: 'transparent',
        },
      },
      _hover: {
        borderColor: 'cyan.600',
      },
    },
  },
};
const Radio: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  baseStyle: {
    control: {
      borderColor: 'cyan.500',
      _checked: {
        bg: 'cyan.500',
        borderColor: 'cyan.500',
        _hover: {
          bg: 'cyan.600',
          borderColor: 'cyan.600',
        },
      },
      _invalid: {
        borderColor: 'red.500',
      },
      _disabled: {
        _hover: {
          borderColor: 'transparent',
        },
      },
      _hover: {
        borderColor: 'cyan.600',
      },
    },
  },
};
const Badge: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  variants: {
    subtle: (props) => ({
      color: `${props.colorScheme}.500`,
    }),
    solid: (props) => ({
      background: `${props.colorScheme}.500`,
      color: 'black',
    }),
    outline: (props) => ({
      borderColor: `${props.colorScheme}.500`,
      color: `${props.colorScheme}.500`,
    }),
  },
};
const Tag: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
    variant: 'solid',
  },
  variants: {
    solid: (props) => ({
      container: {
        background: `${props.colorScheme}.500`,
        color: 'black',
      },
    }),
  },
};
const Accordion: ComponentStyleConfig = {
  baseStyle: {
    container: {
      borderColor: 'gray.900',
      borderWidth: '1px',
      borderRadius: 'base',
    },
  },
};

const Progress: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
    variant: 'solid',
    borderRadius: 'full',
  },
  variants: {
    solid: (props) => ({
      filledTrack: {
        background: `${props.colorScheme}.500`,
        borderRadius: 'full',
      },
      track: {
        borderRadius: 'full',
      },
    }),
  },
};

const Tabs: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  variants: {
    'solid-rounded': (props) => ({
      tab: {
        _selected: {
          background: `${props.colorScheme}.500`,
          color: 'black',
        },
        color: `${props.colorScheme}.500`,
      },
    }),
    'soft-rounded': {
      tab: {
        _selected: {
          background: 'whiteAlpha.300',
          color: 'cyan.500',
        },
        color: 'cyan.500',
      },
    },
  },
};
const $arrowBg = cssVar('popper-arrow-bg');
const Tooltip: ComponentStyleConfig = {
  baseStyle: {
    bg: 'gray.900',
    color: 'white.500',
    // https://github.com/chakra-ui/chakra-ui/issues/4695#issuecomment-991023319 Bug in Chakra UI
    [$arrowBg.variable]: 'colors.gray.900',
  },
};

const Switch: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'cyan',
  },
  baseStyle: {
    track: {
      _checked: {
        background: 'cyan.500',
      },
    },
  },
};

const Spinner: ComponentStyleConfig = {
  baseStyle: {
    color: 'cyan.500',
  },
};

export const theme = extendTheme({
  initialColorMode: 'dark',
  colors: {
    gray: {
      50: '#F6F6F6',
      100: '#F1F1F1',
      200: '#DDDDDF',
      300: '#C3C3C9',
      400: '#AAAAB2',
      500: '#91919B',
      600: '#7A7A85',
      700: '#63636E',
      800: '#4D4D57',
      900: '#303037',
    },
    red: {
      50: '#FFEDEF',
      100: '#FFC4CB',
      200: '#FF9BA7',
      300: '#FF7384',
      400: '#FF4A60',
      500: '#E4364B',
      600: '#C53030',
      700: '#9B2C2C',
      800: '#822727',
      900: '#63171B',
    },
    orange: {
      50: '#FFF3EB',
      100: '#FFD8BE',
      200: '#FFBE92',
      300: '#FFA365',
      400: '#FF9A54',
      500: '#FC8738',
      600: '#DC732D',
      700: '#96420A',
      800: '#743002',
      900: '#522100',
    },
    yellow: {
      50: '#FFFBEF',
      100: '#FFF2CA',
      200: '#FFF5A8',
      300: '#FFF889',
      400: '#FFF458',
      500: '#FAE527',
      600: '#EAD516',
      700: '#B5932B',
      800: '#776017',
      900: '#55430D',
    },
    green: {
      50: '#EDFFF9',
      100: '#C3FFEC',
      200: '#9AE6B4',
      300: '#72FFD3',
      400: '#47FAC2',
      500: '#34EDB3',
      600: '#2BD39F',
      700: '#11946B',
      800: '#077250',
      900: '#015037',
    },
    blue: {
      50: '#EDF6FF',
      100: '#C4E2FF',
      200: '#9CCFFF',
      300: '#73BBFF',
      400: '#479EF0',
      500: '#3182CE',
      600: '#1F68AC',
      700: '#11508A',
      800: '#073968',
      900: '#012546',
    },

    cyan: {
      50: '#E5FAFF',
      100: '#B7F2FF',
      200: '#8AEAFF',
      300: '#5CE1FF',
      400: '#2ED9FF',
      500: '#00D1FF',
      600: '#00B0D6',
      700: '#008EAD',
      800: '#006D85',
      900: '#004B5C',
    },
    purple: {
      50: '#F0EEFF',
      100: '#CFC9FF',
      200: '#AEA4FF',
      300: '#8D7EFF',
      400: '#6B59FF',
      500: '#5744EA',
      600: '#402FC8',
      700: '#2D1EA6',
      800: '#1D1084',
      900: '#10104E',
    },
    pink: {
      50: '#FDE8FF',
      100: '#F9B6FF',
      200: '#F583FF',
      300: '#F471FF',
      400: '#EB46FF',
      500: '#EE2EFF',
      600: '#BE02CE',
      700: '#8D0099',
      800: '#6E0077',
      900: '#4E0055',
    },
    navy: {
      50: '#E8EEFF',
      100: '#BED0FF',
      200: '#94B2FF',
      300: '#6B94FF',
      400: '#4176FF',
      500: '#1551EA',
      600: '#0036C1',
      700: '#002B98',
      800: '#001F6F',
      900: '#0B0B22',
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(0, 209, 255, 1)',
  },
  fonts: {
    heading:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    display:
      '"GT America Condensed", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"GT America Mono", SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
    Button,
    Input,
    Select,
    NumberInput,
    Alert,
    Textarea,
    Skeleton,
    Checkbox,
    Radio,
    Badge,
    Tag,
    Accordion,
    Progress,
    Tabs,
    Tooltip,
    Switch,
    Spinner,
  },
  // To be imported and used with the bgGradient prop
  // See: https://chakra-ui.com/docs/styled-system/gradient#background-gradient-api
  gradients,

  sizes: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
});
