import {
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';

interface Props {
  address?: string;
}

export const PermissionsEditor: FC<Props> = ({ address: existingAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState(existingAddress);

  return (
    <>
      {existingAddress ? (
        <EditIcon color="blue.400" onClick={onOpen} />
      ) : (
        <Button size="xs" colorScheme="green" onClick={onOpen}>
          <AddIcon mr="1.5" />
          Add Address
        </Button>
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Modify Permissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={5}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input id="address" value={address} readOnly={!!existingAddress} />
              {/* add address validation on this field? */}
            </FormControl>

            <Heading size="sm" mb="2">
              Permit Actions
            </Heading>
            <CheckboxGroup>
              <Grid gap={3} templateColumns="repeat(3, 1fr)">
                <GridItem>
                  <Checkbox value="a" mb="1">
                    Stake
                  </Checkbox>
                  <br />
                  <Checkbox value="b" mb="1">
                    Burn
                  </Checkbox>
                  <br />
                </GridItem>

                <GridItem>
                  <Checkbox value="c" mb="1">
                    Unstake
                  </Checkbox>
                  <br />
                  <Checkbox value="d" mb="1">
                    Mint
                  </Checkbox>
                  <br />
                </GridItem>

                <GridItem>
                  <Checkbox value="e" mb="1">
                    Claim Rewards
                  </Checkbox>
                  <br />
                  <Checkbox value="f" mb="1">
                    Manage Locks
                  </Checkbox>
                  <br />
                </GridItem>
              </Grid>

              <Grid gap={3} templateColumns="repeat(2, 1fr)">
                <GridItem>
                  <Checkbox value="g" mb="1">
                    Manage Staking Position
                  </Checkbox>
                  <br />
                </GridItem>
                <GridItem>
                  <Checkbox value="h">Modify Permissions</Checkbox>
                  <br />
                </GridItem>
              </Grid>
            </CheckboxGroup>

            <Button mt="6" mb="4" colorScheme="blue">
              {existingAddress ? 'Update' : 'Add'} Permissions
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
