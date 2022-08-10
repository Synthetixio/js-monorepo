import { FC } from 'react';
import { Tr, Td, Tag } from '@chakra-ui/react';
import { PermissionsEditor } from './PermissionsEditor';
import { Address } from '../../shared/Address';

interface Props {
  address: string;
}

export const Item: FC<Props> = ({ address }) => {
  return (
    <Tr>
      <Td py="4">
        <Address address={address} />
      </Td>
      <Td>
        <Tag colorScheme="green" size="sm" mr="1">
          Stake
        </Tag>
        <Tag colorScheme="green" size="sm" mr="1">
          Burn
        </Tag>
        <Tag colorScheme="blue" size="sm" mr="1">
          Claim Rewards
        </Tag>
      </Td>
      <Td>
        {/* only render below if owner or has modify permissions role */}
        <PermissionsEditor address={address} />
      </Td>
    </Tr>
  );
};
