import { _post, _get, _put, _delete, _post_multipart } from './request';
// import firebase from 'utils/firebase';
import { RequestLessonType } from '../containers/HomeStudentPage/types';
import { AcceptLessonData } from '../containers/RequestPage/types';
import { UpdateLocationDataType } from '../containers/LocationPage/types';
import { initializedFirebaseApp } from './init-fcm';
import { LanguageOption } from '../containers/LanguagePage/types';

const API = {
  getCountryCodes(mobile: any, user_type: any) {
    return _get(`/common/country-codes`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  checkPromoCodeApplied(mobile: any, user_type: any) {
    return _get(`/invite-promo/is-promocode-applied`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Sent OTP code to user mobile number
   *
   * On Success ,  Response will be
   * {
   *    data: {otp: 8160 , user_id: 4216 },
   *    message: "Registration successful",
   *    status: true
   * }
   *   ["api_version": "1.0",
   * "app_version_code": 1.0,
   *  "device_token": "40EFD1D3-4D04-4B09-8ACD-CCBECED536D2",
   * "device_version": "12.2",
   * "country_code_id": 2,
   *  "device_name": "iPhone X",
   * "device_type": "iOS",
   * "mobile_no": 503000074,
   *  "fcm_id": dXg5WPa6274:APA91bG-Hx6QNR_ulOO8OgzO2oXu_C4U84Fs7tfQTRr8PpKP39JSdxUI2M7FQ6aiZSzdwc5BJjhiQuIXjRKdv2G806vQNVYs8Mmh3B6UxnWAq0ka6J0UexJMdttUFsowEcgUK8EZ5A-d,
   * "user_type": "1"]
   *
   * Resend OTP
   *
   * [
   * "api_version": "1.0",
   * "device_name": "iPhone X",
   *  "mobile_no": 503000074,
   *  "fcm_id": dXg5WPa6274:APA91bG-Hx6QNR_ulOO8OgzO2oXu_C4U84Fs7tfQTRr8PpKP39JSdxUI2M7FQ6aiZSzdwc5BJjhiQuIXjRKdv2G806vQNVYs8Mmh3B6UxnWAq0ka6J0UexJMdttUFsowEcgUK8EZ5A-d,
   * "device_version": "12.2",
   * "app_version_code": 1.0,
   * "device_type": "iOS",
   *  "user_type": "1",
   * "country_code_id": 2,
   * "device_token": "40EFD1D3-4D04-4B09-8ACD-CCBECED536D2",
   *  "user_id": 4216]
   * Server Response on success :
   *    data: {otp: 8160 , user_id: 4216 }
   *    message: "Registration successful"
   *    status: true
   *
   * @param  {number} mobile The mobile of the user
   * @param  {number} user_type The tyoe of the user, Teacher or student
   */
  sendOtp(data: any) {
    return _post(`/auth/send-otp`, {
      ...data
    });
  },

  /**
   * Verify the OTP code is correct
   *
   * On Success ,  Response will be
   * {
   *  data : {
   *    "access_token" = c26072a8d0b85185e53d3712b143e94af157adb6;
   *    email = "<null>";
   *    "invitation_code" = QCMTqv;
   *    "mobile_no" = 503000074;
   *    "user_id" = 4216;
   *     username = 503000074;
   *  },
   *  message : "listed successfully",
   *  status : 1
   * }
   *
   * @param {number} username The Mobile numbder of user , ex  : 503000074
   * @param {number} password The OTP Code , ex : 8160
   * @param {number} user_type The Type of user , 1 = teacher , 2 = student
   * @param {string} [client_id="testclient"]
   * @param {string} [client_secret="testpass"]
   * @param {string} [grant_type="password"]
   * @returns
   */
  verifyOtp(
    username: string,
    password: string,
    user_type: number,
    client_id: string = 'testclient',
    client_secret: string = 'testpass',
    grant_type: string = 'password'
  ) {
    return _post(`/auth/verify-otp`, {
      username,
      password,
      user_type,
      client_id,
      client_secret,
      grant_type
    });
  },

  /**
   * Get teacher personal infomation based on step
   *
   * @returns
   */
  getTeacherPersonalInfo() {
    return _get(
      `/signup/get-teacher-personalinfo`,
      {
        params: {
          register_step: 'all'
        }
      },
      true
    );
  },

  /**
   * Save teacher personal infomation based on step
   *
   * @param {*} data
   * @returns
   */
  setTeacherPersonalInfo(data: any) {
    return _post(
      `/signup/teacher-personalinfo`,
      {
        ...data,
        register_step: 'all'
      },
      true
    );
  },

  /**
   * Upload documents for teacher registration process
   *
   * @param {formData} formData
   * @returns
   */
  uploadDocument(data: any) {
    return _post_multipart(`/signup/upload-documents`, data, true);
  },

  /**
   * save user location
   *
   * @param {UpdateLocationDataType} data
   * @returns
   */
  saveUserLocation(data: UpdateLocationDataType) {
    return _post(
      `/signup/user-location`,
      {
        ...data
      },
      true
    );
  },

  /**
   * update user location range in KM
   *
   * @param {number} user_km_range
   * @returns
   */
  saveUserLocationRange(user_km_range: number) {
    return _post(
      `/signup/user-range`,
      {
        user_km_range
      },
      true
    );
  },

  /**
   * update user teaching location eg. student home, teacher home
   *
   * @param {Boolean} is_teacher_home
   * @param {Boolean} is_student_home
   * @returns
   */
  setTeachingLocation(is_teacher_home: number, is_student_home: number) {
    return _put(`/signup/teaching-location`, {
      is_teacher_home,
      is_student_home
    });
  },

  /**
   * get user teaching location based selection
   *
   * @returns
   */
  getTeachingLocation() {
    return _get(`/signup/get-teaching-location`, {}, true);
  },
  getEducationInfo(mobile: any, user_type: any) {
    return _get(`/signup/get-educational-information`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get user educatinal infomation based on step
   *
   * @param {number} education_information_id
   * @returns
   */
  getNewEducationInfo(education_information_id: number) {
    return _get(
      `/signup/get-new-educational-information`,
      { params: { education_information_id } },
      true
    );
  },

  // setEducationInfo(data) {
  //   return _post(`/signup/educational-information`, {

  //       "educational_type_id": "1",
  //       "class_id": "1",
  //       "subject_id": "1",
  //       "university_id": "1",
  //       "college_id": "1",
  //       "major_id": "1",
  //       "level_id": "1",
  //       "type_education_id": "1",
  //       "education_information_id": "1"

  //     mobile_no: mobile,
  //     user_type: user_type
  //   });
  // },

  /**
   * save new user educatinal infomation based on step
   *
   * @param {number} [education_information_id=null]
   * @param {number} item_id
   * @returns
   */
  setNewEducationInfo(
    education_information_id: number | null = null,
    item_id: number
  ) {
    return _post(
      `/signup/new-educational-information`,
      {
        education_information_id,
        item_id
      },
      true
    );
  },
  getRegisterStep(mobile: any, user_type: any) {
    return _get(`/signup/get-register-step`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getEducationList(mobile: any, user_type: any) {
    return _get(`/signup/educational-list`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get educational list
   *
   * @returns
   */
  getNewEducationList() {
    return _get(`/signup/new-educational-list`, {}, true);
  },

  /**
   * get user location based selection
   *
   * @returns
   */
  getUserLocation() {
    return _get(`/signup/get-location`, {}, true);
  },

  /**
   * get user teaching types based selection
   *
   * @returns
   */
  getTeachingType() {
    return _get(`/signup/get-teaching-types`, {}, true);
  },

  /**
   * update user teaching type eg. individual or/and student group
   *
   * @param {boolean} is_individual
   * @param {boolean} is_student_group
   * @returns
   */
  setTeachingType(is_individual: number, is_student_group: number) {
    return _put(`/signup/teaching-types`, {
      is_individual,
      is_student_group
    });
  },
  getClasses(mobile: any, user_type: any) {
    return _get(`/common/classes`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getUniversities(mobile: any, user_type: any) {
    return _get(`/common/universities`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getTypeOfEducations(mobile: any, user_type: any) {
    return _get(`/common/typeof-educations`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getColleges(mobile: any, user_type: any) {
    return _get(`/common/colleges`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getMajors(mobile: any, user_type: any) {
    return _get(`/common/majors`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLevels(mobile: any, user_type: any) {
    return _get(`/common/levels`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getSubjects(mobile: any, user_type: any) {
    return _get(`/common/subjects`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  setOtherEducation(mobile: any, user_type: any) {
    return _post(`/signup/other-educational`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * save get user educatinal infomation based on step
   *
   * @param {*} parent_id
   * @param {*} item_name
   * @returns
   */
  setOtherNewEducation(parent_id: number, item_name: string) {
    return _post(
      `/signup/other-new-educational`,
      {
        parent_id,
        item_name
      },
      true
    );
  },

  /**
   *   Change Teacher Location default and current

default => no need to pass any body prameters

current => need to pass body parameters
   *
   * @param {number} current_latitude
   * @param {number} current_longitude
   * @returns
   */
  updateLocation(current_latitude: any, current_longitude: any) {
    return _post(`/user/update-location`, {
      current_latitude,
      current_longitude
    });
  },

  /**
   * Update language
   *
   * @param {string} language
   * @returns
   */
  changeLanguage(lang: LanguageOption) {
    return _post(`/user/update-language`, {}, true, { lang });
  },

  /**
   * Teacher start lesson
   *
   * @param {number} lesson_id
   * @param {number} actual_number_of_students
   * @returns
   */
  startLesson(lesson_id: number, actual_number_of_students: number) {
    return _put(
      `/lessons/start-lesson`,
      {
        lesson_id,
        actual_number_of_students
      },
      true
    );
  },

  /**
   * Go online or offline
   *
   * @param {*} is_online
   * @returns
   */
  goOnline(is_online: boolean) {
    return _put(`/user/go-online`, {
      is_online
    });
  },

  /**
   * Get teacher today lesson with distace maping
   *
   * @returns
   */
  todayLesson() {
    return _get(`/user/today-lesson`, {}, true, (response: any) => {
      if (
        response.data.status === false &&
        response.data.message &&
        response.data.top_setting
      ) {
        return response.data;
        // throw new Error(response.data.message);
      } else if (response.data.status === false) {
        throw new Error('Error response with no message');
      }
    });
  },

  /**
   * Cancel lesson based on lesson_id
   *
   * @param {number} lesson_id ex: 12
   * @param {string} firebase_lesson_id ex: -LBVO-6qo40zCptuKAu8
   * @param {number} firebase_lesson_date ex: 1526688000000
   * @returns
   */
  cancelLesson(
    lesson_id = false,
    firebase_lesson_id: string | null,
    firebase_lesson_date: number | null
  ) {
    return _put(
      `/lessons/cancel-lesson`,
      {
        lesson_id,
        firebase_lesson_id,
        firebase_lesson_date
      },
      true
    );
  },

  /**
   * Teacher end lesson
   *
   * @param {number} lesson_id
   * @returns
   */
  endLesson(lesson_id: number) {
    return _put(
      `/lessons/end-lesson`,
      {
        lesson_id
      },
      true
    );
  },
  requestedStudents(mobile: any, user_type: any) {
    return _get(`/user/requested-studnets`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getDocumentStatus(mobile: any, user_type: any) {
    return _get(`/signup/get-document`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get all uploaded documents for teacher registration process
   *
   * @returns
   */
  getAllDocumentStatus() {
    return _get(`/signup/get-all-document`, {}, true);
  },
  acceptLessons(mobile: any, user_type: any) {
    return _post(`/signup/get-document`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Check setting tab validation
   *
   * @returns
   */
  getSettingStatus() {
    return _get(`/signup/setting-validation`, {}, true);
  },

  /**
   * Get get time different between two datetime
   *
   * @param {string} datetime ex :2019-07-05%2006:49:21
   * @param {number} notification_id
   * @returns
   */
  getRemainingTime(datetime: string, notification_id: number) {
    return _get(
      `/common/get-time-diff`,
      {
        params: {
          datetime,
          notification_id
        }
      },
      true
    );
  },
  getLogout(mobile: any, user_type: any) {
    return _get(`/common/logout`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  adjustPending(mobile: any, user_type: any) {
    return _get(`/signup/adjust-pending`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Delete Education Information details by educational information id
   *
   * @param {*} education_information_id
   * @returns
   */
  deleteEducationInfo(education_information_id: number) {
    return _delete(
      `/signup/delete-educational-information`,
      {
        params: {
          education_information_id
        }
      },
      true
    );
  },

  /**
   * Get banks list
   *
   * @returns
   */
  getBanks() {
    return _get(`/payments/get-banks`, {}, true);
  },

  /**
   *  Schedule lesson from teacher application
   *
   * @param {*} data
   * @returns
   */
  requestScheduledLesson(data: any) {
    return _post(
      `/common/schedule-lesson`,
      {
        ...data
      },
      true
    );
  },

  /**
   * Booked schedule lesson
   *
   * @param {*} data
   * @returns
   */
  bookScheduledLesson(data: any) {
    return _post(
      `/lessons/booked-schedule-lesson`,
      {
        ...data
      },
      true
    );
  },
  cancelBookedLesson(mobile: any, user_type: any) {
    return _put(`/lessons/cancel-lesson`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Accept lesson request
   *
   * @param {object} data
   * @returns
   */
  acceptLesson(data: AcceptLessonData) {
    return _post(
      `/lessons/accept-lesson`,
      {
        ...data
      },
      true
    );
  },

  /*
   * Get all teacher invoices
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getTeacherHistory(offset = 0, limit = 10) {
    return _get(
      `/payments/teacher-orders`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },

  /**
   * Get All Notofications
   * 
   * On Success :
   * [
    {
      "notification_id": "6097",
      "recipient_id": "1179",
      "title": "تنورونا على الانستقرام",
      "message": {
        "title": "تنورونا على الانستقرام",
        "description": "https://www.instagram.com/telmeethapp",
        "image_url": ""
      },
      "is_read": "1",
      "created_at": "2019-03-21 02:37:20",
      "notification_type": null,
      "description": "https://www.instagram.com/telmeethapp",
      "image_url": "",
      "is_previous": false
    }
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array} 
   */
  getNotifications(offset = 0, limit = 10) {
    return _get(
      `/notification/all-notifications`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },

  /**
   * Get youe invitaion details
   *
   * @returns
   */
  getInvitations() {
    return _get(`/invite-promo/your-invitations`, {}, true);
  },

  /**
   * Get student order list which was student taken
   *
   * @returns
   */
  getBankDetails() {
    return _get(`/payments/get-payment`, {}, true);
  },

  /**
   * Save contact Information
   *
   * @param {string} contact_type
   * @param {string} contact_description
   * @returns
   */
  callContactUs(contact_type: string, contact_description: string) {
    return _post(
      `/common/contact`,
      {
        contact_type,
        contact_description
      },
      true
    );
  },

  /**
   * Paid payment generated by telmeeth system
   *
   * @param {FormData} data
   * @returns
   */
  postPayment(data: any) {
    return _post_multipart(`/payments/payment`, data, true);
  },

  /**
   * Get teacher subject list based on hours
   *
   * @returns
   */
  getTeacherSubjects() {
    return _get(`/user/teacher-subjects`, {}, true);
  },

  /**
   * Get teacher certificates download URL
   *
   * @param {*} subject_ids
   * @returns
   */
  getDownloadCertificateUrls(subject_ids: string) {
    return _get(
      `/user/download-cretificate`,
      {
        params: {
          subject_ids
        }
      },
      true
    );
  },

  /**
   * Received payment from students
   *
   * @param {number} lesson_id
   * @returns
   */
  acceptPayment(lesson_id: number) {
    return _put(
      `/lessons/received-payment`,
      {
        lesson_id
      },
      true
    );
  },
  setLocationUpdates(mobile: any, user_type: any) {
    return _post(`/user/update-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLocation(mobile: any, user_type: any) {
    return _get(`/user/teacher-student-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  setOnMyWay(recipient_id: number, lesson_id: number) {
    return _post(
      `/notification/on-my-way`,
      {
        recipient_id,
        lesson_id
      },
      true
    );
  },

  /**
   * Display Menu details based on user
   *
   * @returns
   */
  getMenuUserData() {
    return _get(`/common/menu`, {}, true);
  },

  /**
   * Delete Notification
   *
   * @param {number} notification_id the id of notification to delete
   * @returns
   */
  deleteNotification(notification_id: number) {
    return _delete(`/notification/delete-notification`, {
      params: { notification_id }
    });
  },
  /**
   * Get student personal infomation based on step
   *
   * @returns
   */
  getStudentPersonalInfo() {
    return _get(
      `/signup/student-personal-info`,
      {
        params: {
          register_step: 'all'
        }
      },
      true
    );
  },
  /**
   * Save student personal infomation based on step
   *
   * @param {*} data
   * @returns
   */
  setStudentPersonalInfo(data: any) {
    return _post(
      `/signup/student-info`,
      {
        ...data,
        register_step: '5'
        // register_step: 'all'
      },
      true
    );
  },
  getStudentPersonalInfoList(mobile: any, user_type: any) {
    return _get(`/signup/get-student-info-list`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get subject list based on student id
   *
   * @param {string} search_type ex : Now
   * @param {number} student_id ex: 1195
   * @param {number} student_count ex: 1
   * @returns
   */
  getSubjectList(
    search_type: string,
    student_id: number,
    student_count: number
  ) {
    return _get(
      `/search/get-subject-list`,
      {
        params: {
          search_type,
          student_id,
          student_count
        }
      },
      true
    );
  },
  /**
   * Search teacher for request lesson
   *
   * @param {string} search_type ex : Now
   * @param {number} subject_id ex: 45
   * @param {number} student_id ex: 1195
   * @param {number} student_count ex: 1
   * @returns
   */
  getTeacherList(
    search_type: string,
    subject_id: number,
    student_id: number,
    student_count: number
  ) {
    return _get(
      `/search/search-teacher`,
      {
        params: {
          search_type,
          subject_id,
          student_id,
          student_count
        }
      },
      true
    );
  },

  /**
   * Calculate rate and range based on teacher id
   *
   * @param {object} data
   * @returns
   */
  getRangeRate(data: any) {
    return _get(
      `/search/range-rate`,
      {
        params: {
          ...data
        }
      },
      true
    );
  },
  requestLesson(data: RequestLessonType) {
    return _post(
      `/notification/request-lesson`,
      {
        ...data
      },
      true
    );
  },

  /**
   * Send notification to teacher for cancel lesson
   *
   * @param {number} notification_id
   * @param {number} recipient_id
   * @returns
   */
  cancelRequestLesson(notification_id: number, recipient_id: number) {
    return _post(
      `/notification/cancel-lesson-request`,
      {
        notification_id,
        recipient_id
      },
      true
    );
  },

  /**
   * teacher_id
   *
   * @param {number} teacher_id
   * @returns
   */
  likeTeacher(teacher_id: number) {
    return _post(
      `/user/like-teacher`,
      {
        teacher_id
      },
      true
    );
  },
  /*
   * Get all student invoices
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getStudentHistory(offset = 0, limit = 10) {
    return _get(
      `/payments/student-orders`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },

  /**
   * Get lesson details
   *
   * @param {*} lesson_id
   * @returns
   */
  getLessonDetails(lesson_id: number) {
    return _get(
      `/payments/student-orders`,
      {
        params: {
          lesson_id
        }
      },
      true
    );
  },
  sendPromoCode(mobile: any, user_type: any) {
    return _post(`/invite-promo/apply-promo-code`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  synData(mobile: any, user_type: any) {
    return _post(`/lessons/get-firebase-data`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Get schedule lesson by month
   *
   * @param {string} month_date
   * @param {number} teacher_id teacher user_id
   * @param {number} student_id
   * @returns
   */
  getScheduledDates(
    month_date: string,
    teacher_id: number,
    student_id: number
  ) {
    return _get(
      `/lessons/lesson-by-month`,
      {
        params: {
          month_date,
          teacher_id,
          student_id
        }
      },
      true
    );
  },
  getLessonByTeacher(mobile: any, user_type: any) {
    return _get(`/lessons/lesson-by-teacher`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Rate your teacher
   *
   * @param {number} teacher_id
   * @param {number} subject_id
   * @param {number} lesson_id
   * @param {number} rating
   * @returns
   */
  rateTeacher(
    teacher_id: number,
    item_id: number,
    lesson_id: number,
    rating: number
  ) {
    return _post(
      `/user/rate-teacher`,
      {
        teacher_id,
        item_id,
        lesson_id,
        rating
      },
      true
    );
  },
  /**
   * Get All Root Items
   *
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getRootItems() {
    return _get(`/item/roots`, {}, true);
  },
  getChildItems(parent_id: number) {
    return _get(`/item/childrens`, { params: { parent_id } }, true);
  },

  async getTeacherScheduls(teacher_id: number) {
    return await initializedFirebaseApp
      // return await firebase()
      .database()
      .ref('/Teachers/' + teacher_id)
      .once('value');
    // return;
    // .then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     var childKey = childSnapshot.key;
    //     console.log('childKey', childKey);
    //     var childData = childSnapshot.val();
    //     console.log('childData', childData);
    //     // ...
    //   });
    //   // ...
    // });
  },
  async getStudentScheduls(user_id: number) {
    return await initializedFirebaseApp
      // return await firebase()
      .database()
      .ref('/Students/' + user_id)
      .once('value');
    // return;
    // .then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     var childKey = childSnapshot.key;
    //     console.log('childKey', childKey);
    //     var childData = childSnapshot.val();
    //     console.log('childData', childData);
    //     // ...
    //   });
    //   // ...
    // });
  },

  /**
   * Get suggested locations based on text
   *
   * @param {*} text
   * @returns
   */
  getSuggestLocations(text: string) {
    return _get(`/user/suggest-location`, { params: { text } }, true);
  }
};

export default API;
