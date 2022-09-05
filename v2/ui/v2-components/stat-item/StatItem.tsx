import {
  Flex,
  StatLabel,
  StatNumber,
  Box,
  Stat,
  Menu,
  MenuItem,
  Text,
  MenuButton,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon, KebabMenuVertical } from '../icons';

interface DropDownItem {
  label: string;
  action: () => void;
}

interface StatItemProps {
  label: string;
  amount: string;
  tooltipLabel?: string | null;
  dropdownItems?: DropDownItem[] | null;
}

export const StatItem = ({
  label,
  amount,
  tooltipLabel = null,
  dropdownItems = null,
}: StatItemProps) => {
  return (
    <Stat>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex alignItems="center">
            <StatLabel mt={0} fontSize="xs" fontWeight={700} lineHeight="16px" mr={2}>
              {label}
            </StatLabel>
            <Tooltip
              isDisabled={!!tooltipLabel}
              borderRadius="4px"
              color="white"
              hasArrow
              label={tooltipLabel || ''}
              bg="gray.900"
              p={2}
              mt={2}
            >
              <Flex>
                <InfoIcon width="12.5px" height="12.5px" />
              </Flex>
            </Tooltip>
          </Flex>
          <StatNumber fontSize="sm">{amount}</StatNumber>
        </Box>
        {dropdownItems && (
          <Menu placement="bottom-end">
            <>
              <MenuButton>
                <KebabMenuVertical />
              </MenuButton>
              <MenuList mt={5}>
                {dropdownItems.map(({ label, action }) => (
                  <MenuItem onClick={action} px={4}>
                    <Text variant="nav">{label}</Text>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          </Menu>
        )}
      </Flex>
    </Stat>
  );
};
