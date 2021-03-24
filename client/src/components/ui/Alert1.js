import { connect } from "react-redux";
import { Alert } from "reactstrap";

const Alert1 = (props) => {
  return (
    props.alerts != null &&
    props.alerts.length > 0 &&
    props.alerts.map((alert) => {
      return alert.alertType === "success" ? (
        <Alert key={alert.id} color="success">
          {alert.message}
        </Alert>
      ) : (
        <Alert key={alert.id} color="danger">
          {alert.message}
        </Alert>
      );
    })
  );
};
const mapStateToProps = (state) => {
  return {
    alerts: state.setAlert,
  };
};
export default connect(mapStateToProps)(Alert1);
