import dynamic from 'next/dynamic';
import GlobalLoader from 'components/GlobalLoader';

const V2Home = dynamic(() => import('content/v2-home'), {
  ssr: false,
  loading: GlobalLoader,
});

export default V2Home;
