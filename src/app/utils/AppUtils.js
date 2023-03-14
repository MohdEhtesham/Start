const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,}$/;
const phoneNoRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const username = /^[a-z A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

const firstName = /^[A-Z a-z]*$/;

export const isEmailValid = (email) => {
  return regex.test(email);
};

export const isUserNameValid = (email) => {
  return username.test(email);
};

export const isfirstnameValid = (email) => {
  return firstName.test(email);
};

export const isPasswordValid = (email) => {
  return passwordRegex.test(email);
};

export const isPhoneNoValid = (email) => {
  return phoneNoRegex.test(email);
};

export const phoneNumberInUsFormat = (text) => {
  let formatStr = text;
  let cleaned = ("" + text).replace(/\D/g, "");
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = match[1] ? "+1 " : "",
      number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
        ""
      );
    return number;
  } else {
    return formatStr;
  }
};
