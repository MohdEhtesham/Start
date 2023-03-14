// import moment from "moment-timezone";
// import I18n from "@i18n";
var Buffer = require("buffer/").Buffer;
// Check if the string is empty
export function isEmpty(str) {
  if (
    typeof str === "undefined" ||
    str === undefined ||
    str === null ||
    (typeof str === "string" &&
      (str.length === 0 || str.trim().length === 0)) ||
    str === "undefined" ||
    str === ""
  ) {
    return true;
  } else {
    return false;
  }
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email));
}

export function validateSpecialChracter(string) {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
}

export function uuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function diffInDays(date1, date2) {
  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  return Difference_In_Time / (1000 * 3600 * 24);
}

export function calculateWeeksBetween(date1, date2) {
  // The number of milliseconds in one week
  let ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  /*let dd=new Date(date2)
  var day = dd.getDate();

  var month = dd.getMonth() + 1;
  var year = dd.getFullYear();

  let babyDOB = new Date(year,month,day);*/
  let date1_ms = date1.getTime();
  let date2_ms = date2.getTime();
  // Calculate the difference in milliseconds

  let difference_ms = Math.abs(date1_ms - date2_ms);
  let diff = Math.floor(difference_ms / ONE_WEEK);
  //diff+=1
  // Convert back to weeks and return hole weeks
  return diff;
}

export function currentTime() {
  return moment(moment()).format("hh:mm A");
}

export function convertSecToMinutes(n) {
  let minute = Math.floor(n / 60);
  let rSeconds = Math.floor(n % 60);
  if (n < 60 && n > 0) {
    minute = 1;
    return minute;
  }
  if (rSeconds >= 30) {
    minute += 1;
  }
  return minute;
}

export function capitalizeFirstLetter(text) {
  if (typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function toHexString(byteArray) {
  let s = "0x";
  byteArray.forEach(function (byte) {
    s += ("0" + (byte & 0xff).toString(16)).slice(-2);
  });
  return s;
}
//0xe8f4bf0000730478 to e8f4bf0000730478
export function toHexaString(byteArray) {
  let s = "";
  byteArray.forEach(function (byte) {
    s += ("0" + (byte & 0xff).toString(16)).slice(-2);
  });
  return s;
}

export function bits(value, bitsStart, bitsWidth) {
  return (value >>> bitsStart) & (Math.pow(2, bitsWidth) - 1);
}

export function convertNumberToBoolean(number) {
  if (number === 0) return false;
  else return true;
}

export function convertOZIntoML(value) {
  return value * 29.57;
}

export function convertMLIntoOZ(value) {
  return value * 0.03;
}

export function convertInchToMM(value) {
  return value * 25.4;
}

export function convertMMToInch(value) {
  return value * 0.03;
}

export function convertPoundIntoGram(value) {
  return value * 453.59;
}

export function convertGramIntoPound(value) {
  return value * 0.002204;
}

export function getTrackingType(type) {
  switch (type) {
    case 1:
      return "Breastfeeding";
    case 2:
      return "Pumping";
    case 3:
      return "Bottle";
    case 4:
      return "Nappy";
    case 5:
      return "Sleep";
    case 6:
      return "Weight";
    case 7:
      return "Growth";
  }
}
export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function getTotalMin(min, sec) {
  console.log("getTotalMin----", min, sec);
  return parseInt(min) * 60 + parseInt(sec);
}

export function getTotalMinHoursInSec(hour, min, sec) {
  console.log("getTotalMin----", min, sec);
  return parseInt(hour * 3600) + parseInt(min) * 60 + parseInt(sec);
}

export function phoneNumberInUsFormat(text) {
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
}

export function getFormattedTime(value) {
  let _timer = parseInt(value),
    formatTime;
  let getSeconds = "";
  let minutes = "";
  let getMinutes = "";

  getSeconds = `0${_timer % 60}`.slice(-2);
  minutes = `${Math.floor(_timer / 60)}`;
  getMinutes = `0${minutes % 60}`.slice(-2);
  formatTime = getMinutes + ":" + getSeconds;
  return formatTime;
}
