import React from 'react';
import { Button, Collapse, Text } from '@chakra-ui/react';
import format from 'date-fns/format';
import { ContractErrorType } from '@snx-v3/useContractErrorParser';

export function ContractError({ contractError }: { contractError: ContractErrorType }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {!isOpen ? (
        <Button
          variant="link"
          onClick={() => setIsOpen(true)}
          color="inherit"
          fontWeight="normal"
          fontStyle="italic"
        >
          details...
        </Button>
      ) : null}
      <Collapse in={isOpen} animateOpacity>
        <Text fontStyle="italic" fontSize="0.8em">
          {contractError.name}
        </Text>
        <Text whiteSpace="pre" fontSize="0.8em" fontStyle="italic" pl="0.5em">
          {Object.entries(contractError.args)
            .map(
              ([key, val]) =>
                `${key}: ${val instanceof Date ? format(val, 'yyyy-MM-dd HH:mm:ss') : val}`
            )
            .join('\n')}
        </Text>
      </Collapse>
    </>
  );
}
