import { Grid, Col } from 'sections/gov/components/common';
import Details from './Details';
import { useQuery } from '@tanstack/react-query';
import { safeLazy } from '@synthetixio/safe-import';
import { snapshotEndpoint } from 'constants/snapshot';
import { useParams } from 'react-router-dom';

const Info = safeLazy(() => import(/* webpackChunkName: "gov-info" */ './Info'));
const Content = safeLazy(() => import(/* webpackChunkName: "gov-proposal" */ './Content'));

type ProposalProps = {
  onBack: Function;
};

const gql = (data: any) => data[0];
const query = gql`
  query Proposals($id: String) {
    proposal(id: $id) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
    }
  }
`;

export async function fetchProposals(hash: string | undefined) {
  const body = await fetch(snapshotEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        id: hash,
      },
    }),
  });

  const { data, errors } = await body.json();
  if (data?.proposal) {
    return data?.proposal;
  }
  throw new Error(errors?.[0]?.message || 'Unknown server error');
}

const useGetProposal = (hash?: string) => {
  return useQuery(['gov', 'proposal', hash], async () => fetchProposals(hash), {
    enabled: Boolean(hash),
    staleTime: 3.6e6, // 1hour
  });
};

const Index: React.FC<ProposalProps> = ({ onBack }) => {
  const { panel: hash } = useParams();
  const proposalQuery = useGetProposal(hash);
  const proposal = proposalQuery.data;

  return (
    <Grid>
      <Col>{hash && <Content proposal={proposal} onBack={onBack} />}</Col>
      <Col>
        <Details proposal={proposal} />
        {hash && <Info proposalId={hash} />}
      </Col>
    </Grid>
  );
};

export default Index;
