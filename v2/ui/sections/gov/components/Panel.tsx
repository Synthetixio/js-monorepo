import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SPACE_KEY } from 'constants/snapshot';
import { Grid, Col } from 'sections/gov/components/common';
import UnstructuredTab from 'components/UnstructuredTab';
import CouncilBoard from './List/CouncilBoard';
import Proposal from './Proposal';
import List from './List';
import Create from './Create';
import ROUTES from 'constants/routes';

const Panel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { panel } = useParams();

  const proposalsData = useMemo(
    () => ({
      title: t('gov.panel.proposals.title'),
      description: t('gov.panel.proposals.description'),
      tabChildren: <List spaceKey={SPACE_KEY.PROPOSAL} />, // Static list now
      blue: true,
      key: SPACE_KEY.PROPOSAL,
    }),
    [t]
  );
  switch (true) {
    case panel === 'create':
      return <Create onBack={() => navigate(ROUTES.Gov.Home)} />;
    case Boolean(panel):
      return <Proposal onBack={() => navigate(ROUTES.Gov.Home)} />;
    default:
      return (
        <Grid>
          <Col>
            <UnstructuredTab tabData={proposalsData} />
          </Col>
          <Col>
            <CouncilBoard />
          </Col>
        </Grid>
      );
  }
};

export default Panel;
