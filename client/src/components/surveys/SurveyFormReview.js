import React from "react";
import { connect } from "react-redux";

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please Confirm Your entries</h5>
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Cancel
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps)(SurveyFormReview);
