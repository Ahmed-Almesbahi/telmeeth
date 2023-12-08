/*
 * HomeTeacherPage Messages
 *
 * This contains all the text for the HomeTeacherPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomeTeacherPage';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'HOME'
  },
  empty: {
    id: `${scope}.empty`,
    defaultMessage: 'Your day needs lesson!'
  },
  confirmCancel: {
    id: `${scope}.confirmCancel`,
    defaultMessage: 'Do you want to cancel this lesson?'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  ok: {
    id: `${scope}.ok`,
    defaultMessage: 'Ok'
  },
  lesson: {
    id: `${scope}.lesson`,
    defaultMessage: 'LESSON'
  },
  toStart: {
    id: `${scope}.toStart`,
    defaultMessage: 'to start'
  },
  registrationProgress: {
    id: `${scope}.registrationProgress`,
    defaultMessage: 'REGISTATION PROGRESS'
  },
  startNow: {
    id: `${scope}.startNow`,
    defaultMessage: 'START NOW'
  },
  waitForVerification: {
    id: `${scope}.waitForVerification`,
    defaultMessage: 'Wait for verfications'
  },
  waitForVerificationDes: {
    id: `${scope}.waitForVerificationDes`,
    defaultMessage:
      'Verfication teams will verify your informations when you complete the steps above withing 24 hours and then you can go live'
  },
  completeLocation: {
    id: `${scope}.completeLocation`,
    defaultMessage: 'Set Your Location'
  },
  completeLocationDes: {
    id: `${scope}.completeLocationDes`,
    defaultMessage: 'By setting your location, student around you can reach you'
  },
  completeDocument: {
    id: `${scope}.completeDocument`,
    defaultMessage: 'Upload Required Documents'
  },
  completeDocumentDes: {
    id: `${scope}.completeDocumentDes`,
    defaultMessage: 'Upload your ID , photo and certifacte'
  },
  completeTeachingInformation: {
    id: `${scope}.completeTeachingInformation`,
    defaultMessage: 'Complete Teaching Informations'
  },
  completeTeachingInformationDes: {
    id: `${scope}.completeTeachingInformationDes`,
    defaultMessage: 'Select what you are going to teach'
  },
  completePesonal: {
    id: `${scope}.completePesonal`,
    defaultMessage: 'Complete Personal Information'
  },
  completePesonalDes: {
    id: `${scope}.completePesonalDes`,
    defaultMessage:
      'Fill the form with first name and last name and other important details'
  },
  setRange: {
    id: `${scope}.setRange`,
    defaultMessage: 'Set Preferred Range'
  },
  setRangeDes: {
    id: `${scope}.setRangeDes`,
    defaultMessage:
      'Set the preferred range from your current range, Longer range more students can find you'
  },
  setPreferenceStudyLocation: {
    id: `${scope}.setPreferenceStudyLocation`,
    defaultMessage: 'Set Preferred Teaching Location'
  },
  setPreferenceStudyLocationDes: {
    id: `${scope}.setPreferenceStudyLocationDes`,
    defaultMessage:
      'Set where you want to teach whether in your home, student home or any where'
  },
  byCompleteYour: {
    id: `${scope}.byCompleteYour`,
    defaultMessage:
      'By completing your registration process, you will unlock more features and will be able to accept dozen of requests daily'
  },
  endLesson: {
    id: `${scope}.endLesson`,
    defaultMessage: 'END LESSON'
  }
});
