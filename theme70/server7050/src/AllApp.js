import React from 'react';

import PagesRouter from './pages/PagesRouter';
import PagesLinks from './pages/PagesLinks';

class AllApp extends React.Component {
          
  render() {

    return (
        <div>
          <PagesLinks />
          <PagesRouter />
        </div>
    );
    
  }

}

export default AllApp;
