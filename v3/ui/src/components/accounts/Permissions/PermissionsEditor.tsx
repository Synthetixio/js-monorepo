import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useManageRoles } from '../../../hooks';

type Props =
  | {
      address: string;
      roles: Array<string>;
    }
  | Record<string, never>;

export const PermissionsEditor: FC<Props> = ({
  address: existingAddress,
  roles: existingRoles,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id: accountId } = useParams();
  const [roles, setRoles] = useState<Array<string>>(existingRoles);

  const { exec, status } = useManageRoles(accountId!, existingAddress, existingRoles, roles);

  return (
    <>
      {existingAddress ? (
        <EditIcon color="blue.400" onClick={onOpen} />
      ) : (
        <Button size="xs" colorScheme="blue" onClick={onOpen}>
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
          <ModalHeader>Modify Permissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={5}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input id="address" value={existingAddress} readOnly={Boolean(existingAddress)} />
              {/* add address validation on this field? */}
            </FormControl>

            <Heading size="sm" mb="2">
              Select Permissions
            </Heading>
            <CheckboxGroup
              defaultValue={existingRoles}
              onChange={(t: Array<string>) => {
                setRoles(t);
              }}
            >
              <Grid gap={3} templateColumns="repeat(2, 1fr)">
                <GridItem>
                  <Checkbox value="stake" mb="2">
                    Stake
                  </Checkbox>
                  <br />
                  <Checkbox value="unstake" mb="2">
                    Unstake
                  </Checkbox>
                  <br />
                  <Checkbox value="claim" mb="2">
                    Claim Rewards
                  </Checkbox>
                  <br />
                  <Checkbox value="burn" mb="2">
                    Burn
                  </Checkbox>
                  <br />
                </GridItem>

                <GridItem>
                  <Checkbox value="mint" mb="2">
                    Mint
                  </Checkbox>
                  <br />
                  <Checkbox value="manage-locks" mb="2">
                    Manage Locks
                  </Checkbox>
                  <br />
                  <Checkbox value="manage-staking-position" mb="2">
                    Manage Staking Position
                  </Checkbox>
                  <br />
                  <Checkbox value="modify">Modify Permissions</Checkbox>
                  <br />
                </GridItem>
              </Grid>
            </CheckboxGroup>

            <Button
              isLoading={status === 'pending'}
              mt="6"
              mb="4"
              colorScheme="blue"
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
    </>
  );
};
