import React from 'react';
import PropTypes from 'prop-types';

class MobileClientInfo extends React.PureComponent {

  render() {

    return (
      <h1>
        клиент &laquo;{this.props.info.fio}&raquo;, баланс {this.props.info.balance}
      </h1>
    )
    ;

  }

}

MobileClientInfo.propTypes = {
  info:PropTypes.shape({
    fio: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

export default MobileClientInfo;
