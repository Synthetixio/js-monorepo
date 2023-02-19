import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { DialogOverlay } from '@reach/dialog';
import { Link as ReactRouterLink } from 'react-router-dom';
import { SESSION_STORAGE_KEYS } from '@snx-v2/Constants';
import styled from 'styled-components';
import { zIndex } from '@snx-v1/constantsUi';
import Button from 'components/Button';

interface TermsModalProps {
  defaultOpen: boolean;
}

export const TermsModalV1 = ({ defaultOpen = true }: TermsModalProps) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const onSubmit = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.TERMS_CONDITIONS_ACCEPTED, JSON.stringify(true));
    setOpen(false);
  };

  return (
    <StyledDialogOverlay isOpen={isOpen} onDismiss={() => {}}>
      <Container>
        <Title>Synthetix Terms of Service</Title>
        <Text fontSize="sm">
          By clicking “I Agree” below, you agree to be bound by the terms of this Agreement. As
          such, you fully understand that:
        </Text>
        <ul style={{ listStyleType: 'square', listStylePosition: 'inside' }}>
          <Text>
            <li style={{ margin: '16px 0px' }}>
              <ExternalLink href="https://synthetix.io/" target="_blank">
                Synthetix{' '}
              </ExternalLink>
              is a blockchain-based decentralized finance project. You are participating at your own
              risk.
            </li>
            <li style={{ margin: '16px 0px' }}>
              Synthetix is offered for use “as is” and without any guarantees regarding security.
              The protocol is made up of immutable code and can be accessed through a variety of
              user interfaces.
            </li>
            <li style={{ margin: '16px 0px' }}>
              No central entity operates the Synthetix protocol. Decisions related to the protocol
              are governed by a dispersed group of participants who collectively govern and maintain
              the protocol.
            </li>
            <li style={{ margin: '16px 0px' }}>
              Synthetix DAO does not unilaterally offer, maintain, operate, administer, or control
              any trading interfaces. The only user interfaces maintained by Synthetix DAO are the
              governance and staking interfaces herein.
            </li>
            <li style={{ margin: '16px 0px' }}>
              You can participate in the governance process by staking SNX tokens in accordance with
              the rules and parameters summarized{' '}
              <ExternalLink href="https://governance.synthetix.io/" target="_blank">
                here
              </ExternalLink>
              , and/or joining the{' '}
              <ExternalLink target="_blank" href="https://discord.com/invite/AEdUHzt">
                Synthetix Discord
              </ExternalLink>{' '}
              and contributing to the conversation.
            </li>
            <li style={{ margin: '16px 0px' }}>
              The rules and parameters associated with the Synthetix protocol and Synthetix DAO
              governance are subject to change at any time.
            </li>
            <li style={{ margin: '16px 0px' }}>
              Your use of Synthetix is conditioned upon your acceptance to be bound by the Synthetix
              Term of Use, which can be found{' '}
              <InternalLink as={ReactRouterLink} to="/terms" target="_blank">
                here
              </InternalLink>
              .
            </li>
            <li style={{ margin: '16px 0px' }}>
              The laws that apply to your use of Synthetix may vary based upon the jurisdiction in
              which you are located. We strongly encourage you to speak with legal counsel in your
              jurisdiction if you have any questions regarding your use of Synthetix.
            </li>
            <li style={{ margin: '16px 0px' }}>
              By entering into this agreement, you are not agreeing to enter into a partnership. You
              understand that Synthetix is a decentralized protocol provided on an “as is” basis.
            </li>
            <li style={{ margin: '16px 0px' }}>
              You hereby release all present and future claims against Synthetix DAO related to your
              use of the protocol, the SNX token, SNX DAO governance, and any other facet of the
              protocol.
            </li>
            <li style={{ margin: '16px 0px' }}>
              You agree to indemnify and hold harmless SNX DAO and its affiliates for any costs
              arising out of or relating to your use of the Synthetix protocol.
            </li>
            <li style={{ margin: '16px 0px' }}>
              You are not accessing the protocol from Burma (Myanmar), Cuba, Iran, Sudan, Syria, the
              Western Balkans, Belarus, Côte d’Ivoire, Democratic Republic of the Congo, Iraq,
              Lebanon, Liberia, Libya, North Korea, Russia, certain sanctioned areas of Ukraine,
              Somalia, Venezuela, Yemen, or Zimbabwe (collectively, “Prohibited Jurisdictions”), or
              any other jurisdiction listed as a Specially Designated National by the United States
              Office of Foreign Asset Control (“OFAC”).
            </li>
          </Text>
        </ul>
        <Button variant="primary" style={{ width: '100%', marginTop: '16px' }} onClick={onSubmit}>
          I agree
        </Button>
      </Container>
    </StyledDialogOverlay>
  );
};

const StyledDialogOverlay = styled(DialogOverlay)`
  z-index: ${zIndex.DIALOG_OVERLAY};
  background: ${(props) => props.theme.colors.backgroundBoxShadow};
`;

const Container = styled.div`
  width: 50%;
  min-width: 420px;
  height: 500px;
  padding: 36px;
  margin: 100px auto;
  background: ${(props) => props.theme.colors.navy};
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &&::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  &&::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const Title = styled.div`
  text-transform: capitalize;
  font-family: ${(props) => props.theme.fonts.condensedBold};
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
  line-height: 24px;
  padding-bottom: 24px;
  text-align: center;
  margin-top: 16px;
`;

const ExternalLink = styled.a`
  color: ${(props) => props.theme.colors.blue};
  &:focus-visible {
    outline: none;
  }
`;

const InternalLink = styled(ReactRouterLink)`
  color: ${(props) => props.theme.colors.blue};
  &:focus-visible {
    outline: none;
  }
`;
