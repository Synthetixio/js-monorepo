import colors from './styles/colors';

export type Colors = keyof Omit<typeof colors, 'gradients' | 'hoverOpacity'>;
