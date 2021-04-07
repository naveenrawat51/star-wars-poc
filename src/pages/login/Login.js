import React, { useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
    username: {
      elementConfig: {
        type: "text",
        placeholder: "Enter Username",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormISValid] = useState(false);

  const formElementsArray = [];
  for (let key in loginForm) {
    formElementsArray.push({
      id: key,
      config: loginForm[key],
    });
  }

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(loginForm.username.value, loginForm.password.value);
  };

  const inputChangeHandler = (event, controlName) => {
    const formData = {
      ...JSON.parse(JSON.stringify(loginForm)),
      [controlName]: {
        ...loginForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          loginForm[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (let inputIdentifier in formData) {
      formIsValid = formData[inputIdentifier].valid && formIsValid;
    }
    setLoginForm(formData);
    setFormISValid(formIsValid);
  };

  let form = formElementsArray.map((formElement, index) => (
    <Input
      key={formElement.id}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(event) => inputChangeHandler(event, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
    />
  ));

  if (props.loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.loginContainer}>
      {props.isAuthenticated ? <Redirect to="/search" /> : null}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="success" disabled={!formIsValid} type="submit">
          SIGNIN
        </Button>
      </form>
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(actions.auth(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
