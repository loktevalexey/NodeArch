import React from 'react';
import PropTypes from 'prop-types';

class MobileCompany extends React.PureComponent {

  render() {

    return (
      <h1>
        Компания &laquo;{this.props.name}&raquo;
      </h1>
    )
    ;

  }

}

MobileCompany.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MobileCompany;
