/*
 *
 * OtpPage constants
 *
 */

export const OTP_REQUEST = 'app/OtpPage/OTP_REQUEST';

/**
 * Otp request, this action starts the request saga
 *
 * @param  {object} values mobile number , ex : 500000000
 * @param  {object} values mobile number , ex : 500000000
 * @return {object} An action object with a type of OTP_REQUEST
 */
export function verifyOtp({ values, actions }: any) {
  return {
    type: OTP_REQUEST,
    payload: values,
    meta: actions
  };
}
