import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isMobilePhone } from "validator";

import Service from "../services/service";
import UploadImage from "./uploadImage.component"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  };
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  };
};

const phone = value => {
  if (!isMobilePhone(value, ['vi-VN'], {strictMode: true})) {
    return (
      <div className="alert alert-danger" role="alert">
        Please supply the mobile phone with VietNam code and therefore must start with +
      </div>
    );
  };
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      profileInfo: [],
      email: "",
      fullName: "",
      gender: "",
      age: "",
      address: "",
      phone: "",
      successful: false,
      message: "",
      profileImg: ''
    };
  };

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  };

  onChangeFullName(e) {
    this.setState({
      fullName: e.target.value
    });
  };

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  };

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  };

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  };

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  };

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    const formData = new FormData()
    formData.append('profileImg', this.state.profileImg);
        
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        profileInfo: {
          email: this.state.email,
          fullName: this.state.fullName,
          gender: this.state.gender,
          age: this.state.age,
          address: this.state.address,
          phone: this.state.phone
        }
      }, () => {formData.append('profileInfo', JSON.stringify(this.state.profileInfo))});

      Service.register(
        formData
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    };
  };

  onChange(data) {
    this.setState({profileImg: data})
    console.log("<Form>", data);
  }

  componentDidUpdate(prevState) {
    if (this.state.successful !== prevState.successful) {
      this.props.setStatus(this.state.successful)
    }
  }

  render() {
    return (
      <div className="component-1">
        <div className="card card-container">
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <UploadImage onChange={this.onChange}/>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChangeFullName}
                    validations={[required ]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                    validations={[required ]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChangeAge}
                    validations={[required ]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, phone]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  };
};