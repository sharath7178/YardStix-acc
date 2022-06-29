import React from "react";
import "./index.css";

class TextFieldComponent extends React.Component {
  state = {
    showPassword: false
  };
  render() {
    const {
      handleChange,
      fieldValue,
      placeholder,
      type,
      fullwidth,
      classes,
      adormentPosition,
      icon,
      rootCss,
      iconPosition,
      errorMessage,
      hasError,
      maxlength,
      minlength,
      hasButton,
      handleOnClick,
      isDisabled,
      ...rest
    } = this.props;
    return (
      <div className={"input-icons"}>
        <div className={iconPosition}>
          {" "}
          {hasButton ? (
            <button className="iconButton" onClick={handleOnClick}>
              {" "}
              {icon}
            </button>
          ) : (
            icon
          )}
        </div>
        <input
          type={
            type === "password"
              ? this.showPassword
                ? "text"
                : "password"
              : type
          }
          value={fieldValue || ""}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={isDisabled}
          fullwidth={fullwidth}
          className={rootCss}
          autoComplete={"false"}
          maxLength={maxlength}
          minLength={minlength}
          {...rest}
        />
        {hasError && <span className={"error-message"}>{errorMessage}</span>}
      </div>
    );
  }
}

export default TextFieldComponent;
