import { useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import { theme } from '@synthetixio/v3-theme';
import { LOCAL_STORAGE_KEYS } from '@snx-v2/Constants';
// import { useTranslation } from 'react-i18next';

interface TermsModalProps {
  defaultOpen: boolean;
}

export const TermsModal = ({ defaultOpen = true }: TermsModalProps) => {
  // const { t } = useTranslation();
  const [isOpen, setOpen] = useState(defaultOpen);
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    if (enabled) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TERMS_CONDITIONS_ACCEPTED, JSON.stringify(true));
      setOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent
        bgGradient={theme.gradients['dark'][500]}
        pt="10"
        pb="3"
        borderWidth="1px"
        borderColor="gray.900"
        data-testid="transaction modal"
      >
        <ModalHeader py={0} textAlign="center">
          Synthetix Terms of Service
        </ModalHeader>
        <ModalBody fontSize="xs" color="gray.600">
          <Text fontSize="sm">
            By clicking “I Agree” below, you agree to be bound by the terms of this Agreement. As
            such, you fully understand that:
          </Text>
          <Box
            onScroll={() => {
              const condition = (ref.current && ref?.current?.scrollHeight / 2) || 300;
              if (ref.current && ref.current?.scrollTop > condition) {
                setEnabled(true);
              } else {
                setEnabled(false);
              }
            }}
            as="div"
            my={2}
            py={3}
            ref={ref}
            height="320px"
            overflow="scroll"
          >
            <Text>
              Synthetix is a blockchain-based decentralized finance project. You are participating
              at your own risk. Synthetix is offered for use “as is” and without any guarantees
              regarding security. The protocol is made up of immutable code and can be accessed
              through a variety of user interfaces. No central entity operates the Synthetix
              protocol. Decisions related to the protocol are governed by a dispersed group of
              participants who collectively govern and maintain the protocol. Synthetix DAO does not
              unilaterally offer, maintain, operate, administer, or control any trading interfaces.
              The only user interfaces maintained by Synthetix DAO are the governance and staking
              interfaces herein. You can participate in the governance process by staking SNX tokens
              in accordance with the rules and parameters summarized here (link to Governance
              documents), and/or joining the Synthetix Discord (link) and contributing to the
              conversation. The rules and parameters associated with the Synthetix protocol and
              Synthetix DAO governance are subject to change at any time. Your use of Synthetix is
              conditioned upon your acceptance to be bound by the Synthetix Term of Use, which can
              be found here (link). The laws that apply to your use of Synthetix may vary based upon
              the jurisdiction in which you are located. We strongly encourage you to speak with
              legal counsel in your jurisdiction if you have any questions regarding your use of
              Synthetix. By entering into this agreement, you are not agreeing to enter into a
              partnership. You understand that Synthetix is a decentralized protocol provided on an
              “as is” basis. You hereby release all present and future claims against Synthetix DAO
              related to your use of the protocol, the SNX token, SNX DAO governance, and any other
              facet of the protocol. You agree to indemnify and hold harmless SNX DAO and its
              affiliates for any costs arising out of or relating to your use of the Synthetix
              protocol. You are not accessing the protocol from Burma (Myanmar), Cuba, Iran, Sudan,
              Syria, the Western Balkans, Belarus, Côte d’Ivoire, Democratic Republic of the Congo,
              Iraq, Lebanon, Liberia, Libya, North Korea, Russia, certain sanctioned areas of
              Ukraine, Somalia, Venezuela, Yemen, or Zimbabwe (collectively, “Prohibited
              Jurisdictions”), or any other jurisdiction listed as a Specially Designated National
              by the United States Office of Foreign Asset Control (“OFAC”).
            </Text>
          </Box>
        </ModalBody>
        <Button
          variant="outline"
          _focusVisible={{ outline: 'none' }}
          my={4}
          mx={6}
          onClick={onSubmit}
          disabled={!enabled}
        >
          I agree
        </Button>
      </ModalContent>
    </Modal>
  );
};
