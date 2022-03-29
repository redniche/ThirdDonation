import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import ScrollToTopBtn from './components/menu/ScrollToTop';
import Home from './pages/Home';
import Explore from './pages/nfts/Explore';
import ItemDetail from './pages/nfts/ItemDetail';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Sell from './pages/exchange/Sell';
import Mint from './pages/nfts/Mint';
import ArtistRegistration from './pages/artist/ArtistRegistration';
import CharityRegistration from './pages/charity/CharityRegistration';
import NftDetail from './pages/nfts/NftDetail';
import GrantArtist from './pages/admin/GrantArtist';
import GrantCharity from './pages/admin/GrantCharity';
import ChartProfile from './pages/profile/ChartProfile';
import Donation from './pages/nfts/SendToken';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

PosedRouter.propsTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => (
  <div className="wraper">
    <GlobalStyles />
    <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        {/* 첫글자 소문자로 변경 */}
        <ItemDetail path="/ItemDetail/:nftId" />
        <Explore path="/explore" />
        <Profile path="/profile/:authorId" />
        <EditProfile path="/editProfile/:authorId" />
        <ChartProfile path="/chart/:authorId" />
        <Sell path="/sell" />
        <Mint path="/mint" />
        <Donation path="/donation" />
        <ArtistRegistration path="/artistRegistration" />
        <CharityRegistration path="/charityRegistration" />
        <NftDetail path="/nftDetail/:nftId" />
        <GrantArtist path="/admin/grantArtist" />
        <GrantCharity path="/admin/grantCharity" />
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);

export default App;
