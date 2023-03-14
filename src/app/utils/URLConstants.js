// //Developer Server Base URL

// export const BASE_URL = "http://159.89.234.66:5558";
// export const SOCKET_BASE_URL = "159.89.234.66:5558";

// export const BASE_URL = "https://admin.sportstalkapp.co";
// export const SOCKET_BASE_URL = "admin.sportstalkapp.co";

//QA Base URL

export const BASE_URL = "http://159.89.234.66:5557";
export const SOCKET_BASE_URL = "159.89.234.66:5557";

// export const BASE_URL = "https://stage.sportstalkapp.co";
// export const SOCKET_BASE_URL = "stage.sportstalkapp.co";

export const API_TIMEOUT = 30000;

export const URLConstants = {
  SIGNUP_URL: BASE_URL + "/api/user/register",
  LOGIN_URL: BASE_URL + "/api/user/login",
  LOG_OUT: BASE_URL + "/api/user/logout",
  VERIFY_OTP: BASE_URL + "/api/user/verify",
  DELETE_USER: BASE_URL + "/api/user/deletedUser",
  FORGOTPASSWORD: BASE_URL + "/api/user/forgotPassword",
  GET_ALL_CATEGORY: BASE_URL + "/api/category/getAll",
  GET_ALL_USER: BASE_URL + "/api/user/getAll",
  GET_USER_BYCATEGORY: BASE_URL + "/api/user/getByCategory",
  ADD_USER_CATEGORY: BASE_URL + "/api/user/addUserCategory",
  USER_FOLLOW: BASE_URL + "/api/user/follow",
  USER_UNFOLLOW: BASE_URL + "/api/user/unfollow",
  GET_ALL_DEBATES: BASE_URL + "/api/debate/getAll",
  LIKE_DEBATES: BASE_URL + "/api/debate/like",
  DISLIKE_DEBATES: BASE_URL + "/api/debate/unlike",
  REPORT: BASE_URL + "/api/report/add",
  USER_BY_FRIEND_LIST: BASE_URL + "/api/friend/getByUser",
  GET_USER_BY_ID: BASE_URL + "/api/user/getById",
  GETALL_FEATURES: BASE_URL + "/api/debate/featuredVideos",
  UPDATE_PROFILE: BASE_URL + "/api/user/updateProfile",
  GET_DEBATES_BYUSER: BASE_URL + "/api/debate/getByUser",
  RESEND_OTP: BASE_URL + "/api/user/resendCode",
  GET_FOLLOWER_BY_ID: BASE_URL + "/api/user/getFollowersById",
  GET_ALLBLOCK_BY_USER: BASE_URL + "/api/user/getAllBlocked",
  CHANGE_PASSWORD: BASE_URL + "/api/user/changePassword",
  All_USER_LISTS: BASE_URL + "/api/user/getAll",
  ALL_TOP_DEBATERS: BASE_URL + "/api/user/topDebators",
  ADD_VOTE: BASE_URL + "/api/debate/vote",
  UPLOAD_PROFILE: BASE_URL + "/api/uploadProfile",
  ADD_COMMENTS: BASE_URL + "/api/debate/comment/add",
  CHAT_BY_FRIEND_LIST: BASE_URL + "/api/chat/getByFriend",
  GET_BY_ALL_FRIEND__CHAT: BASE_URL + "/api/chat/getChatListByUser",
  GET_COMMENTS_BY_DEBATES: BASE_URL + "/api/debate/comment/getByDebate",
  GET_COMMENTS_LIKE: BASE_URL + "/api/debate/comment/like",
  GET_COMMENTS_UNLIKE: BASE_URL + "/api/debate/comment/unlike",
  DELETE_CHAT_BY_FRIEND: BASE_URL + "/api/chat/deleteByFriend",
  BLOCK_FRIEND: BASE_URL + "/api/friend/block",
  UNBLOCK_FRIEND: BASE_URL + "/api/friend/unblock",
  SOCKET_URL: "ws://" + SOCKET_BASE_URL,
  // SOCKET_URL: "wss://" + SOCKET_BASE_URL,
  GET_USER_FOLLOWING: BASE_URL + "/api/user/getFollowingById",
  ADD_FRIEND: BASE_URL + "/api/friend/add",
  ACCEPT_FRIEND: BASE_URL + "/api/friend/acceptRequest",
  UNFRINED_DELETE: BASE_URL + "/api/friend/delete",
  CANCEL_REQUEST: BASE_URL + "/api/friend/rejectRequest",
  GET_PENFING_REQUEST: BASE_URL + "/api/friend/getPendingRequests",
  USER_BLOCK: BASE_URL + "/api/user/block",
  USER_UNBLOCK: BASE_URL + "/api/user/unblock",
  NOTIFICATION_BY_USER: BASE_URL + "/api/notification/getByUser",
  SHARE_DEBATES_INTERNAL: BASE_URL + "/api/debate/share",
  SUBSCRIPTION_PLAN: BASE_URL + "/api/subscription/getAll",
  SHOW_NOTIFICATIONS: BASE_URL + "/api/user/showNotification",
  HIDE_NOTIFICATIONS: BASE_URL + "/api/user/hideNotification",

  IMAGE_URL: BASE_URL + "/public/uploadedFiles/category/",
  PROFILE_IMAGE_URL: BASE_URL + "/public/uploadedFiles/profile/",
  ADD_DEBATE_QUESTION: BASE_URL + "/api/debate/add",
  GET_BY_USER_FRIEND: BASE_URL + "/api/friend/getByUser",
  DEBATE_INVITE: BASE_URL + "/api/debate/invite",
  DEBATE_EXTEND_TIME: BASE_URL + "/api/debate/extendTime",
  GET_ACTIVE_RULE: BASE_URL + "/api/rule/getActive",
  GET_ACTIVE_DEBATE: BASE_URL + "/api/debate/getActive",
  SHARE_DEBATES_EXTERNAL: BASE_URL,
  SHARE_DEBATES_GET_BY_ID: BASE_URL + "/api/debate/getById",
  DEBATE_COMPLETED: BASE_URL + "/api/debate/completed",
  PAYMENT_ADD: BASE_URL + "/api/payment/add",
  DEBATE_DISCARD: BASE_URL + "/api/debate/discard",
  CHECK_SUB_PLAN: BASE_URL + "/api/user/checkSubscription",
  SEND_NOTIFICATION: BASE_URL + "/api/debate/sendDebateStartNotification",
  TERMS_CONDITION: BASE_URL + "/api/terms_and_condition",
  PRIVACY_POLICY: BASE_URL + "/api/privacy_policy"

};
