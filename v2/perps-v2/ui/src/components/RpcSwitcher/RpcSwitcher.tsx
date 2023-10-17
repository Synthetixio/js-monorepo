import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

export const RpcSwitcher = () => {
  const onSubmit = () => {};
  const [open, setOpen] = useState(true);

  const switchRpc = () => {};

  return (
    <>
      {open && (
        <div>
          <h2>Ya mum</h2>
        </div>
      )}
      <Button
        variant="unstyled"
        ml={3}
        borderWidth="1px"
        borderColor="gray.900"
        py="7px"
        px="12px"
        borderRadius="7px"
        onClick={onSubmit}
      >
        <SettingsIcon mb="2px" color="gray.100" />
      </Button>
    </>
  );
};
