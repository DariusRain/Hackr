import React, { Component } from "react";
// Now <Form styling={CLASSNAME} inputs={[{PLACEHOLDER, NAME, TYPE <--OPTIONAL,   }, {...}, ...]} afterSubmit={METHOD-OF-CHANGE} />

//  NEXT-> V2 (Add a values property that contains an array with the value for each select or radio buttons in the form)
// <Form
// styling={ClassName-Or-CSS-JS-Object}
// inputs={
//  Radio Buttons
//  { styling: ClassName-Or-JS-CSS, type:"radio", label: "What mode do you want to play?", name:"selectLevel", values:["Easy", "Regular", "Hard", "Expert"] }},
//  Select Buttons
//  { ... type:"select" ... name:"selectLevel" ... values:["Easy", "Regular", "Hard", "Expert"] }},
// afterSubmit={this.submitFormForGame}
// />

// Example:
// By defualt if no type is provided it will give a type of text
// <Form
//  styling={"Form-Normal"}
//  inputs={
//      [
//          {placeholder:"First Name", name: "firstName"},
//          {placeHolder:"Last Name", type:"text", name: "lastName"},
//          {placeholder:"Age", type:"number", name:"age"}
//      ]
//  }
//  afterSubmit={(param) => {
//      this.setState({
//        ...this.state.Property-To-Change,
//        Property-To-Change: ...param
//  })
//  }}

// type - the type used normally - may not all work but for text, r
// placeholder - the placeholder used normally
// name - By default the name will be set to default-INDEX-NUMBER
// values - an array only used in inputs that require selected values
// label - Only text for titing an input

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // The state will contain only the name attributes as keys and the values will be set to an emptyString
    // {INPUT-NAME-ATTRIBUTE: ''}
    //  Ex: {firstName: ''}
  }

  //Uses the afterSubmit given method to pass the state
  submitForm = (e) => {
    e.preventDefault();
    this.props.afterSubmit(this.state);
  };

  handleInput = (e) => {
    if (e.target.value.length > 0) {
      e.target.style.backgroundColor = "seagreen";
    } else {
      e.target.style.backgroundColor = "dodgerblue";
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    let container = {};

    this.props.inputs.map((inputObject) => {
      const htmlNameAttribute = inputObject.name;

      if (!container[htmlNameAttribute]) {
        container[htmlNameAttribute] = "";
      }
      return 0;
    });

    this.setState({
      ...this.state,
      ...container,
    });
  }

  renderInputs = (inputs) => {
    if (inputs[0]) {
      const inputElements = inputs.map((object, index) =>
        this.filterInputs(object, index)
      );
      return inputElements;
    } else {
      console.log("Form Component Malfunction.");
      return null;
    }
  };

  filterInputs = (object, index) => {
    const {
      placeholder,
      type,
      name,
      label,
      htmlFor,
      limit,
      min,
      className,
      values,
    } = object;

    switch (type) {
      case "radio":
        return (
          <div className={className || "RadioButtons"}>
            <div>
              <br />
              &nbsp;
              <label htmlFor={htmlFor || name}>
                {label || " No Label Set"}
              </label>
              <br />
            </div>
            <br />
            {values.map((value) => {
              return (
                <span className="RadioButton">
                  <input
                    type={type}
                    name={
                      name ||
                      `${
                        placeholder.replace(" ", "-") || `on-default-${index}`
                      }`
                    }
                    key={index}
                    onChange={
                      this.handleInput ||
                      (() =>
                        console.log("No change method set, running on default"))
                    }
                    value={value}
                  />
                  {value}
                </span>
              );
            })}
            <br />
          </div>
        );

      case "select":
        return <select></select>;

      case "title":
        return (
          <div className="TitleLabel">
            {label ? (
              <div>
                <h1 className="LabelTitle" htmlFor={htmlFor || name}>
                  {label || " No Label Set"}:
                </h1>
              </div>
            ) : null}
          </div>
        );
      case "number":
        return (
          <div className="InputDiv">
            <input
              className={className || "InputElement"}
              value={this.state[name]}
              type={"number"}
              name={name}
              min={min || "0"}
              max={limit || null}
              onChange={this.handleInput}
              placeholder={placeholder || null}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="InputDiv">
            <textarea
              className={className || "InputElement"}
              value={this.state[name]}
              onChange={this.handleInput}
              name={name}
              placeholder={placeholder || null}
            />
          </div>
        );
      default:
        return (
          <div className="InputDiv">
            {placeholder ? (
              <input
                className={className || "InputElement"}
                placeholder={placeholder}
                type={type || "text"}
                name={name || `${placeholder || `on-default-${index}`}`}
                key={index}
                onChange={
                  this.handleInput ||
                  (() =>
                    console.log("No change method set, running on default"))
                }
                value={this.state[name]}
              />
            ) : null}
          </div>
        );
    }
  };

  render() {
    const { styleRef, inputs, submitText } = this.props;
    const hasStyle = typeof styleRef === Object ? styleRef : false;
    if (hasStyle) {
      return (
        <form style={styleRef} onSubmit={this.submitForm}>
          {this.renderInputs(inputs)}
          {/* {this.renderButtons(inputs.buttons)} */}
        </form>
      );
    } else {
      return (
        <form className={styleRef} onSubmit={this.submitForm}>
          {this.renderInputs(inputs)}
          <div className="buttons-section">
            <button className="form-button">{submitText}</button>
          </div>
        </form>
      );
    }
  }
}

export default Form;
