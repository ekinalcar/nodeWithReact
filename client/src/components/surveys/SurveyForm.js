import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import valideEmails from "../../utils/valideEmails";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    errorMessage: "Provide a Survey Title"
  },
  {
    label: "Survey Line",
    name: "subject",
    errorMessage: "Provide a Survey Line"
  },
  {
    label: "Email Body",
    name: "body",
    errorMessage: "Provide a Survey Email Body"
  },
  {
    label: "Recipient List",
    name: "emails",
    errorMessage: "Provide a Survey Recipient List"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          type="text"
          component={SurveyField}
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.emails = valideEmails(values.emails || "");

  _.each(FIELDS, ({ name, errorMessage }) => {
    if (!values[name]) {
      errors[name] = errorMessage;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
