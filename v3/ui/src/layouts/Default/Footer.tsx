import { Box } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box textAlign="center" fontSize="xs" p="1" background="whiteAlpha.200" mt="4">
      This is an experimental prototype for Synthetix V3. Provide feedback in{' '}
      <a rel="noreferrer" target="_blank" href="https://discord.gg/ngpjqNWW">
        <u>#synthetix-v3</u>
      </a>{' '}
      on Discord. View on{' '}
      <a rel="noreferrer" target="_blank" href="https://github.com/Synthetixio/synthetix-v3">
        <u>GitHub</u>
      </a>
      .
    </Box>
  );
}
