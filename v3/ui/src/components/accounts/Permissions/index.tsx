import { Address } from '../../shared/Address';
import { Item } from './Item';
import { PermissionsEditor } from './PermissionsEditor';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useSearchParams } from 'react-router-dom';

export default function Permissions() {
  const { isOpen: isOwnerOpen, onOpen: onOwnerOpen, onClose: onOwnerClose } = useDisclosure();
  const {
    isOpen: isPermissionsOpen,
    onOpen: onPermissionsOpen,
    onClose: onPermissionsClose,
  } = useDisclosure();

  // Only show edit icon if current account is owner or modify permissions
  const { address: accountAddress } = useAccount();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  /*
  const { data: owner, isError, isLoading } = useContractRead(
    {
      addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      contractInterface: wagmigotchiABI,
    },
    'ownerOf',
    {
      args: id,
    }
  )
  */
  const owner = '0x0000000000000000000000000000000000000000';

  // Unsure what the interface will look like to pull address -> permissions/roles
  const addresses = [
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000',
  ];

  // Need to listen for events to rerender this when changes are made?

  return (
    <Box>
      <Flex mb="2">
        <Heading size="md" mb="1">
          Permissions
        </Heading>
        <Box ml="auto">
          {/* only render below if owner or has modify permissions role */}
          <PermissionsEditor />
        </Box>
      </Flex>

      <Table size="sm" variant="simple" mb="8">
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Address
            </Th>
            <Th color="white" pb="2">
              Permissions
            </Th>
            <Th color="white" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              <Address address={owner} />
            </Td>
            <Td>
              <Tag colorScheme="purple" size="sm" mr="1">
                Owner
              </Tag>
            </Td>
            <Td>
              <EditIcon color="blue.400" onClick={onOwnerOpen} />
              {accountAddress == owner && null /* only show above if owner*/}
            </Td>
          </Tr>
          {addresses.map((address) => (
            <Item key={address} address={address} />
          ))}
        </Tbody>
      </Table>

      <Modal size="lg" isOpen={isOwnerOpen} onClose={onOwnerClose}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Transfer Account Ownership</ModalHeader>
          <ModalCloseButton />
          <ModalBody>UI to transfer ownership of account token NFT</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
