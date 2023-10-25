import { lazy, Suspense } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, useDisclosure } from '@chakra-ui/react';
import { NotificationsIcon } from '@snx-v2/icons';
import { safeImport } from '@synthetixio/safe-import';
import './notifibutton.css';
import { useUnreadState } from '@notifi-network/notifi-react-card';

const NotifiCard = lazy(() => safeImport(() => import('@snx-v2/Notifi')));

export const NotifiButton: React.FC = () => {
  const notifiModal = useDisclosure();
  const { hasUnreadNotification, unreadNotificationCount } = useUnreadState();

  return (
    <Popover closeOnBlur={false} onClose={notifiModal.onClose} isOpen={notifiModal.isOpen}>
      <PopoverTrigger>
        <Button
          ml={2}
          height={10}
          width={10}
          bg="navy.900"
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="4px"
          _hover={{
            bg: 'blackAlpha.400',
            cursor: 'pointer',
          }}
          onClick={notifiModal.onOpen}
        >
          <NotificationsIcon color="white" />
          {hasUnreadNotification && (
            <div className="notifi-unread-counter">
              <div>{unreadNotificationCount > 99 ? '99' : unreadNotificationCount}</div>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent border="none" width="333px">
        <Suspense fallback={null}>
          <NotifiCard onClose={notifiModal.onClose} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
