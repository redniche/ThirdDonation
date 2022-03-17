import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import PropTypes from 'prop-types';

import ScrollToTopBtn from './components/menu/ScrollToTop';
import Header from './components/menu/header';
import Home from './components/pages/home';
import Explore from './components/pages/explore';
import ItemDetail from './components/pages/ItemDetail';
import Sell from './components/pages/sell';
import Minter from './components/pages/Minter';
import Profile from './components/pages/profile/Profile';
import EditProfile from './components/pages/profile/EditProfile';

import { createGlobalStyle } from 'styled-components';

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
    <Header />
    <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        <ItemDetail path="/ItemDetail/:nftId" />
        <Explore path="/explore" />
        <Profile path="/Profile/:authorId" />
        <EditProfile path="/EditProfile/:authorId" />
        <Sell path="/sell" />
        <Minter path="/mint" />
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);

export default App;
