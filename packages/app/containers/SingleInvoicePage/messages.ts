/*
 * SingleInvoicePage Messages
 *
 * This contains all the text for the SingleInvoicePage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.SingleInvoicePage";

export default defineMessages({
  lastLesson: {
    id: `${scope}.lastLesson`,
    defaultMessage: "LAST LESSON"
  },
  yourLastLesson: {
    id: `${scope}.yourLastLesson`,
    defaultMessage: "Your Last Lesson"
  },
  originalCost: {
    id: `${scope}.originalCost`,
    defaultMessage: "Original Cost"
  },
  SR: {
    id: `${scope}.SR`,
    defaultMessage: "SR"
  },
  promoDiscount: {
    id: `${scope}.promoDiscount`,
    defaultMessage: "Promo Discount"
  },
  earnedDiscount: {
    id: `${scope}.earnedDiscount`,
    defaultMessage: "Credit Earned Discount"
  },
  net: {
    id: `${scope}.net`,
    defaultMessage: "NET"
  },
  student: {
    id: `${scope}.student`,
    defaultMessage: "Student"
  },
  invoice: {
    id: `${scope}.invoice`,
    defaultMessage: "INVOICE"
  },
  received: {
    id: `${scope}.received`,
    defaultMessage: "RECEIVED"
  },
  rateYourTeacher: {
    id: `${scope}.rateYourTeacher`,
    defaultMessage: "Rate Your Teacher"
  }
});
