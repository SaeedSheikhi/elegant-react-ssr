import React from 'react';
import { connect } from 'react-redux';
//
import Alert from '../../../../components/Alert';

function ModalAlert (props) {
  return <Alert {...props} />;
}

const mapStateToProps = ({ modal: { props } }) => props;

export default connect(mapStateToProps)(ModalAlert);
