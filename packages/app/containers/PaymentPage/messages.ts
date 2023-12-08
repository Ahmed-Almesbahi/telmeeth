/*
 * PaymentPage Messages
 *
 * This contains all the text for the PaymentPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PaymentPage';

export default defineMessages({
  payment: {
    id: `${scope}.payment`,
    defaultMessage: 'PAYMENT'
  },
  original: {
    id: `${scope}.original`,
    defaultMessage: 'Original'
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total'
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Amount'
  },
  balance: {
    id: `${scope}.balance`,
    defaultMessage: 'Balance'
  },
  myCredit: {
    id: `${scope}.myCredit`,
    defaultMessage: 'My Credit'
  },
  student: {
    id: `${scope}.student`,
    defaultMessage: 'Student'
  },
  promo: {
    id: `${scope}.promo`,
    defaultMessage: 'Promo'
  },
  dueAmount: {
    id: `${scope}.dueAmount`,
    defaultMessage: 'Due Amount'
  },
  waitingApproval: {
    id: `${scope}.waitingApproval`,
    defaultMessage: 'waiting for approval'
  },
  yourName: {
    id: `${scope}.yourName`,
    defaultMessage: 'Your Name'
  },
  yourBankName: {
    id: `${scope}.yourBankName`,
    defaultMessage: 'Your Bank Name'
  },
  transactionDate: {
    id: `${scope}.transactionDate`,
    defaultMessage: 'Transaction Date'
  },
  transactionReceipt: {
    id: `${scope}.transactionReceipt`,
    defaultMessage: 'Transaction Receipt'
  },
  yourBankNo: {
    id: `${scope}.yourBankNo`,
    defaultMessage: 'Your Bank Account Number'
  },
  pictureOfreceipt: {
    id: `${scope}.pictureOfreceipt`,
    defaultMessage: 'Picture of receipt'
  }
});
