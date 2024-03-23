import { isEmail, isGoodPassword } from "./validation";

export function isValidRegisterForm(inputs) {
  if (
    !inputs.avatar ||
    !inputs.email ||
    !inputs.fullname ||
    !inputs.username ||
    !inputs.password
  ) {
    return {
      message: "All Fields Are Required",
      success: false
    }
  }
  
  if (!isEmail(inputs.email)) {
    return {
      message: "Enter a valid email",
      success: false
    }
  }
  
  if (!isGoodPassword(inputs.password)) {
    return {
      message: "Your Password must include uppercase, lowercase and is longer than 6 characters.",
      success: false
    }
  }

  return {
    message: "Success",
    success: true
  };
}

export function isValidLoginForm(inputs) {
  if (!inputs.email || !inputs.password) {
    return {
      message: "All Inputs required",
      success: false
    };
  }
  
  if (!isEmail(inputs.email)) {
    return {
      message: "Enter a valid Email",
      success: false
    };
  }

  return {
    message: 'good inputs',
    success: true
  }
}