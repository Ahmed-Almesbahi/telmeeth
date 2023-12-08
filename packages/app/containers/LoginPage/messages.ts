/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.LoginPage";

export default defineMessages({
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: "Forgot Password?"
  },
  signin: {
    id: `${scope}.signin`,
    defaultMessage: "SIGN IN"
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: "Create Account"
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: "Your Mobile Number"
  },
  terms: {
    id: `${scope}.terms`,
    defaultMessage: "By Signing up with Telmeeth you agree to our"
  },
  termsLink: {
    id: `${scope}.termsLink`,
    defaultMessage: "Terms & Conditions"
  },
  onlyDigits: {
    id: `${scope}.onlyDigits`,
    defaultMessage: "Only numbers allowed"
  },
  betweenDigits: {
    id: `${scope}.betweenDigits`,
    defaultMessage: "You must enter 9 numbers and start with 5 , ex : 500000000"
  }
});
