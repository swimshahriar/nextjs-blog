import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase/app';

import { ProvideAuth } from '../hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
