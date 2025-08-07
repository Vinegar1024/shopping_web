import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/navigator/MainNavigation.js';

export default function RootLayout() {

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

