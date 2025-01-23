import UploadIcon from "assets/svg/uploadIcon";
import MessageIcon from "assets/svg/messageIcon";
import NotificationIcon from "assets/svg/notificationIcon";
import SlipsettingIcon from "assets/svg/slipsettingIcon";
import SettingsIcon from "assets/svg/settingsIcon";
import UserIcon from "assets/svg/userIcon";
import DashboardIcon from "assets/svg/dashboardIcon";
import ListIcons from "assets/svg/listIcons";
import WhatsappIcon from "assets/svg/whatsappIcon";
import SendMessageIcon from "assets/svg/sendMessageIcon";
import DataManagementIcon from "assets/svg/dataManagementIcon";
import ElectionIcon from "assets/svg/ElectionIcon";
import UploadIcons from "assets/svg/UploadIcons";
const SidebarData = [
  // super-admin-routes
  {
    id: 10,
    icons: <DashboardIcon />,
    title: "Dashboard",
    path: "/",
    disable: true,
    roleId: ["5"],
  },
  {
    id: 11,
    icons: <DataManagementIcon />,
    title: "Data Management",
    disable: true,
    roleId: ["5"],
    children: [
      {
        id: 1101,
        title: "Upload Voter List",
        icon: <UserIcon />,
        path: "/upload-voter-list",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1102,
        title: "Upload KaryaKarta",
        icon: <UserIcon />,
        path: "/upload-karyakarta",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1103,
        title: "Upload Election List  ",
        icon: <UserIcon />,
        path: "/upload-election",
        disable: true,
        roleId: ["5"],
      },
    ],
  },
  {
    id: 12,
    icons: <UserIcon />,
    title: "User",
    disable: true,
    roleId: ["5"],
    children: [
      {
        id: 1203,
        title: "Distributor  User",
        icon: <UserIcon />,
        path: "/distributor",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1201,
        title: "Client Admin",
        icon: <UserIcon />,
        path: "/client-admin",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1202,
        title: "Authorized User",
        icon: <UserIcon />,
        path: "/authorized-users",
        disable: true,
        roleId: ["5"],
        // children: [
        //   {
        //     id: 1203,
        //     icons: <UserIcon />,
        //     title: "Add Authourized User",
        //     path: "/add-new-authorized-users",
        //     disable: true,
        //     roleId: ["5"],
        //   },
        // ],
      },
    ],
  },
  {
    id: 13,
    icons: <SettingsIcon />,
    title: "Bulk",
    disable: true,
    roleId: ["5"],
  },
  {
    id: 14,
    icons: <ElectionIcon />,
    title: "Election",
    disable: true,
    roleId: ["5"],
    children: [
      {
        id: 1401,
        title: "Add Election",
        icon: <ElectionIcon />,
        path: "/add-elections",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1402,
        title: "Add Bulk Election",
        icon: <ElectionIcon />,
        path: "/add-bulk-elections",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1403,
        title: "Election List ",
        icon: <ElectionIcon />,
        path: "/elections-list",
        disable: true,
        roleId: ["5"],
      },
    ],
  },
  {
    id: 15,
    icons: <SettingsIcon />,
    title: "Survey",
    path: "/survey",

    disable: true,

    roleId: ["5"],
  },
  {
    id: 16,
    icons: <SettingsIcon />,
    title: "Settings",
    disable: true,
    roleId: ["5"],
    children: [
      {
        id: 1601,
        title: "Training Material",
        icon: <SettingsIcon />,
        path: "/traning-material",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1602,
        title: "Terms and Condition",
        icon: <SettingsIcon />,
        path: "/terms-conditions",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1603,
        title: "Upload guidelines",
        icon: <SettingsIcon />,
        path: "/upload-guidlines",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1603,
        title: "Upload guidelines",
        icon: <SettingsIcon />,
        path: "/upload-guidlines",
        disable: true,
        roleId: ["5"],
      },
      {
        id: 1604,
        title: "Upload Vidhansabha",
        icon: <UploadIcons />,
        path: "/upload-vidhansabha",
        disable: true,
        roleId: [ "5" ],
      },
      {
        id: 1605,
        title: "Upload Loksabha",
        icon: <UploadIcons />,
        path: "/upload-loksabha",
        disable: true,
        roleId: [ "5" ],
      },

      {
        id: 1606,
        title: "Other",
        icon: <SettingsIcon />,
        path: "/upload-guidlines",
        disable: true,
        roleId: ["5"],
      },
    ],
  },
  //Client admin
  {
    id: 1,
    icons: <DashboardIcon />,
    title: "Dashboard",
    path: "/",
    disable: true,
    roleId: ["3"],
    iconComponent: true,
  },
  {
    id: 2,
    icons: <UserIcon />,
    title: "Manage Data",
    disable: true,
    roleId: ["3"],
    children: [
      {
        id: 201,
        title: "Karyakarta List",
        icon: <ListIcons />,
        path: "/list-view",
        disable: true,
        roleId: ["3"],
      },
      {
        id: 202,
        title: "Manage Data",
        icon: <ListIcons />,
        path: "/manage-data ",
        disable: true,
        roleId: ["3"],
      },
    ],
  },
  {
    id: 3,
    icons: <UserIcon />,
    title: "Voter",
    path: "/voter-list",
    disable: true,
    roleId: ["3"],
  },

 

  {
    id: 4,
    icons: <UploadIcon />,
    title: "Upload Post",
    path: "/uploadPost",
    disable: true,
    roleId: ["3"],
  },
  {
    id: 5,
    icons: <SlipsettingIcon />,
    title: "Slips Settings",
    disable: true,
    roleId: ["3"],
    children: [
      {
        id: 501,
        title: "Mobile Slips Settings",
        icon: <ListIcons />,
        path: "/mobile-slip-settings",
        disable: true,
        roleId: ["3"],
      },
      {
        id: 502,
        title: "Bulk Slip Setting ",
        icon: <ListIcons />,
        path: "/Bulk-slip-setting",
        disable: true,
        roleId: ["3"],
      },
    ],
  },
  {
    id: 6,
    icons: <MessageIcon />,
    title: "Send Messages",
    disable: true,
    roleId: ["3"],
    children: [
      {
        id: 601,
        title: "Whatsapp",
        icon: <WhatsappIcon />,
        path: "/whatsapp-message",
        disable: true,
        roleId: ["3"],
      },
      {
        id: 602,
        title: "Messages",
        icon: <SendMessageIcon />,
        path: "/text-message",
        disable: true,
        roleId: ["3"],
      },
    ],
  },
  {
    id: 7,
    icons: <SettingsIcon />,
    title: "Settings",
    path: "/settings",
    disable: true,
    roleId: ["3"],
  },
  {
    id: 8,
    icons: <UserIcon />,
    title: "My Display Profile",
    path: "/displayProfile",
    disable: true,
    roleId: ["3"],
  },
  {
    id: 9,
    icons: <NotificationIcon />,
    title: "Push Notification",
    path: "/pushNotification",
    disable: true,
    roleId: ["3"],
  },
  // distributor-side-bar
  {
    id: 31,
    icons: <DashboardIcon />,
    title: "Dashboard",
    path: "/",

    disable: true,

    roleId: ["4"],
  },

  {
    id: 32,
    icons: <DataManagementIcon />,
    title: "Data management",
    disable: true,
    roleId: ["4"],
    children: [
      {
        id: 3201,
        title: "Upload Voter List",
        icon: <UserIcon />,
        path: "/upload-voter-list",
        disable: true,
        roleId: ["4"],
      },
      {
        id: 3202,
        title: "Upload KaryaKarta",
        icon: <UserIcon />,
        path: "/upload-karykarta-list",
        disable: true,
        roleId: ["4"],
      },
      {
        id: 3203,
        title: "Upload Election List ",
        icon: <UserIcon />,
        path: "/upload-elections-list",
        disable: true,
        roleId: ["4"],
      },
    ],
  },

  {
    id: 33,
    icons: <UserIcon />,
    title: "User",
    disable: true,
    roleId: ["4"],
    children: [
      {
        id: 3301,
        title: "Client Admin",
        icon: <UserIcon />,
        path: "/client-list",
        disable: true,
        roleId: ["4"],
      },
      {
        id: 3302,
        title: "Authorized User",
        icon: <UserIcon />,
        path: "/authorized-users",
        disable: true,
        roleId: ["4"],
      },
    ],
  },
  {
    id: 34,
    icons: <DashboardIcon />,
    title: "Survey",
    path: "/survey",
    disable: true,
    roleId: ["4"],
  },

  {
    id: 35,
    title: "Election",
    icons: <ElectionIcon />,
    path: "/elections-list",
    disable: true,
    roleId: ["4"],
  },
];
export default SidebarData;
