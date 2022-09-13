/* eslint-disable react/display-name */
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('assets/svg/app/loader.svg', () => () => null);
jest.mock('assets/svg/app/cross.svg', () => () => null);
jest.mock('assets/svg/app/claim.svg', () => () => null);
jest.mock('assets/svg/app/pending-confirmation.svg', () => () => null);
jest.mock('assets/svg/app/warning.svg', () => () => null);
jest.mock('assets/svg/app/menu-close.svg', () => () => null);
jest.mock('assets/svg/app/caret-down.svg', () => () => null);
