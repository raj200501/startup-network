import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <div className="ui-toast__viewport">
      {alerts.map((alert) => (
        <div key={alert.id} className={`ui-toast ui-toast--${alert.alertType}`}>
          <div>
            <strong>Notice</strong>
            <p>{alert.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
