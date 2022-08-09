import { Box } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box textAlign="center" fontSize="xs" p="1" background="gray.900" mt="4">
      This is an experimental prototype for Synthetix V3. Provide feedback on{' '}
      <a rel="noreferrer" target="_blank" href="https://discordapp.com/invite/AEdUHzt">
        <u>Discord</u>
      </a>
      . View on{' '}
      <a rel="noreferrer" target="_blank" href="https://github.com/Synthetixio/snx-v3-prototype">
        <u>GitHub</u>
      </a>
      .
    </Box>
  );
}
