import { components, OptionProps } from 'react-select';
import styled from 'styled-components';
import { FlexDivCentered } from '@snx-v2/styles';
import TypeIcon from '../TypeIcon';

import { TypeFilterOptionType } from '../types';
const { Option } = components;

const CustomTypeOption = (props: OptionProps<TypeFilterOptionType>) => (
  <Option {...props}>
    <Container>
      <TypeIcon size="sm" type={props.data.value} />
      {props.data.label}
    </Container>
  </Option>
);

const Container = styled(FlexDivCentered)`
  svg {
    margin-right: 7px;
  }
`;

export default CustomTypeOption;
