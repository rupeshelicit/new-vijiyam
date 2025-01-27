// Authantication Api
export const LOGIN = "auth/login";
export const FORGOT_PASSWORD = "user/forget-password";
export const VERIFY_OTP = "user/verify-otp";
export const UPDATE_PASSWORD = "user/update-password";
//Common Api
export const GET_ROLE_LIST = "/roles/list";
export const GET_STATE_LIST = "/state/list";
export const GET_ASSEMBLY_LIST = "/vidhansabha/list/state/";
export const GET_ASSEMBLY_LIST_BY_DISTRICT = "/vidhansabha/list/district/";
export const UPLOAD_VIDHANSABHA_BY_EXCEL = "/vidhansabha/upload-excel";
export const DOWNLOAD_ELECTION_EXCEL = "/election/download-excel";
export const GET_VOTER_LIST = "voter-survey/list/";
export const GET_ELECTION_PARTY = "/party/list";
export const GET_KARYKARTA_AUTHORIZED_USER_LIST = "/user/list/";
export const GET_DISTRICT_LIST_BY_STATE = "/state/district-list/";
// superAdmin Api
export const GET_ELECTION_LIST = "/election/list";
export const UPLOAD_VOTER_EXCEL = "voter-survey/upload-excel";
export const UPLOAD_KARYKARTA_LIST = "user/upload-excel";
export const UPLOAD_ELECTION_EXCEL = "/election/upload-excel";
export const GET_CLIENTS_LIST = "user/list/";
export const GET_AUTHORIZED_USER_LITS = "/user/list/";
export const GET_DISTRIBUTOR_LITS = "/user/list/";
export const GET_TERMS_CONDITIONS_LIST = "/term-condition/list";
export const CREAT_CLIENT = "/user";
export const CREAT_DISTRIBUTOR = "/user";
export const CREAT_ELECTION = "/election";
export const ADD_NEW_TERMS_CONDITION = "/add-term-condition";
export const DELETE_CLIENT = "/user/";
export const DELETE_ELECTION = "/election/";
export const DELETE_KARYAKARTA = "/user/";
export const DELETE_DISTRIBUTOR = "/user/";
export const DELETE_VOTER = "/voter-survey/";
export const UPDATE_ELECTION_DETAILS = "/election/";
export const UPDATE_CLIENT_DETAILS = "/user";
export const UPDATE_DISTRIBUTOR_DETAILS = "/user";
export const UPDATE_KARYAKARTA_DETAILS = "/user";
export const UPDATE_VOTER_DETAILS = "/voter-survey";
// Client Api
export const GET_DASHBOARD_SUREVY = "/voter-survey/dashboard/";
export const GET_VIDHANSABHA_LIST_ASSIGN_SURVEY ="/voter-survey/vidhansabha-list/";
export const GET_BOOATH_LIST_ASSIGN_SURVEY = "/voter-survey/vidhansabha-list/";
export const ASSIGN_SURVEY = "/survey-assign";
export const SILIP_SETTINGS = "/slip-setting";
export const ProfileDetails = "/user/id/";
// Distributor Api
