import { AddIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { useManagePermissions } from '../../../hooks/useManagePermissions';
import { prettyString } from '@snx-v3/format';
import { AddressInput } from './AddressInput';
import { useParams } from 'react-router-dom';

export function PermissionsEditor({
  address: existingAddress,
  permissions: existingPermissions,
}: {
  address: string;
  permissions: Array<string>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [permissions, setPermissions] = useState(existingPermissions);
  const [address, setAddress] = useState(existingAddress ?? '');

  const params = useParams();
  const { exec, status } = useManagePermissions({
    accountId: params.accountId,
    target: address,
    existing: existingPermissions,
    selected: permissions,
  });
  const isExecuting = useMemo(() => status === 'pending', [status]);
  const onAlertCancel = () => {
    setPermissions(existingPermissions); // reset
    onAlertClose();
  };

  return (
    <>
      {existingAddress ? (
        <Flex>
          <EditIcon cursor="pointer" color="cyan.500" onClick={onOpen} mx="2" />
          <SmallCloseIcon
            color="cyan.500"
            cursor="pointer"
            onClick={() => {
              setPermissions([]);
              onAlertOpen();
            }}
          />
        </Flex>
      ) : (
        <Button size="xs" onClick={onOpen}>
          <AddIcon mr="1.5" />
          Add Address
        </Button>
      )}
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="black"
          color="white"
          borderColor="gray.800"
          borderWidth="2px"
          borderRadius="2"
        >
          <ModalHeader>{`${existingAddress ? 'Modify' : 'Add'} Permissions`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddressInput
              address={address}
              onChange={(addressVal: string) => setAddress(addressVal)}
              readOnly={Boolean(existingAddress)}
            />

            <Heading size="sm" mb="2">
              Select Permissions
            </Heading>
            <CheckboxGroup
              defaultValue={existingPermissions}
              onChange={(t: Array<string>) => {
                setPermissions(t);
              }}
            >
              <Grid gap={3} templateColumns="repeat(2, 1fr)">
                <GridItem>
                  <Checkbox value="DEPOSIT" mb="2">
                    Deposit
                  </Checkbox>
                  <br />
                  <Checkbox value="WITHDRAW" mb="2">
                    Withdraw
                  </Checkbox>
                  <br />
                  <Checkbox value="ADMIN" mb="2">
                    Admin
                  </Checkbox>
                </GridItem>

                <GridItem>
                  <Checkbox value="DELEGATE" mb="2">
                    Delegate
                  </Checkbox>
                  <br />
                  <Checkbox value="MINT" mb="2">
                    Mint
                  </Checkbox>
                  <br />
                </GridItem>
              </Grid>
            </CheckboxGroup>

            <Button
              isLoading={isExecuting}
              mt="6"
              mb="4"
              onClick={async () => {
                await exec();
                onClose();
              }}
            >
              {existingAddress ? 'Update' : 'Add'} Permissions
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onAlertCancel}>
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="black"
            color="white"
            borderColor="gray.800"
            borderWidth="2px"
            borderRadius="2"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Permissions
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to revoke all permissions for <p>{prettyString(address)}</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertCancel} variant="link" padding="4">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await exec();
                  onAlertClose();
                }}
                isLoading={isExecuting}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
