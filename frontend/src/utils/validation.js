export function isEmail(value) {
  const reqExEmail = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$');
  return reqExEmail.test(value)
}

export function isLongText(value) {
  return value.length > 5
}

export function isGoodPassword(value) {
  const isLong = isLongText(value)
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);

  return isLong && hasUpperCase && hasLowerCase;
}