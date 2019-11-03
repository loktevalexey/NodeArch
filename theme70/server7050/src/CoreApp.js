import React from 'react';

import PagesRouter from './pages/PagesRouter';
import PagesLinks from './pages/PagesLinks';

class CoreApp extends React.Component {
          
  render() {

    return (
        <div>
          <PagesLinks />
          <PagesRouter />
        </div>
    );
    
  }

}

export default CoreApp;
