import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        locale="auto"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey="pk_test_dgPwUzltmDvP2Rn19huwtzEI00FCVFHXu4"
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
