/*
 * OtpPage Messages
 *
 * This contains all the text for the OtpPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.OtpPage";

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
  continue: {
    id: `${scope}.continue`,
    defaultMessage: "Continue"
  },
  enterCode: {
    id: `${scope}.enterCode`,
    defaultMessage: "please enter the code"
  },
  geSMS: {
    id: `${scope}.geSMS`,
    defaultMessage: "Thanks! Did you get SMS PIN?"
  },
  EnterOTP: {
    id: `${scope}.EnterOTP`,
    defaultMessage: "Enter OTP"
  },
  secondsLeft: {
    id: `${scope}.secondsLeft`,
    defaultMessage: "seconds left"
  },
  ResendOTP: {
    id: `${scope}.ResendOTP`,
    defaultMessage: "RESEND OTP"
  }
});
