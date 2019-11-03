import React from 'react';
import PropTypes from 'prop-types';

class MobileClientInfo extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      clientTextInfo: null, // о некоторых клиентах у нас есть дополнительная информация в текстовых файликах
    }
  }

  componentDidMount() {
    this.loadClientTextInfo();
  }

  componentDidUpdate(prevProps,prevState) {
    if ( this.props.info.id!==prevProps.info.id ) {
      this.setState( { clientTextInfo: null }, () => {
        this.loadClientTextInfo();
      } );
    }
  }

  loadClientTextInfo() {

    if ( this.props.info.id===120 ) {
      fetch('/client120info.txt').then( clientInfoResponse => {
        clientInfoResponse.text().then( clientInfo => {
          this.setState({clientTextInfo:clientInfo});
        } )
      } );
    }

  };

  render() {

    return (
      <div>
        <h1>
          клиент &laquo;{this.props.info.fio}&raquo;, баланс {this.props.info.balance}
        </h1>
        <div>
          {this.state.clientTextInfo}
        </div>
      </div>
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
