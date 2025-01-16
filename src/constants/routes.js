import Login from "pages/Login";
import Dashboard from "pages/ClientAdmin/Dashboard";
import ForgotPassword from "pages/Login/ForgotPassword";
import UpdatePassword from "pages/Login/NewPassword";
import VoterList from "pages/ClientAdmin/Voter/index";
import ListView from "pages/ClientAdmin/ManageKaryakarta/ListView";
import ManageData from "pages/ClientAdmin/ManageKaryakarta/ManageDatas";
import MobileSlipsSettings from "pages/ClientAdmin/SilipSettings/MobileSlipsSettings";
import BulkSlipsSetting from "pages/ClientAdmin/SilipSettings/BulkSlipsSetting";
import Whatsapp from "pages/ClientAdmin/SendMessages/Whatsapp";
import TextMessages from "pages/ClientAdmin/SendMessages/Messages";
import UploadPost from "pages/ClientAdmin/UploadPost";
import MyProfile from "pages/ClientAdmin/DisplayMyProfile";
import SuperAdminDashbord from "pages/SuperAdmin/Dashboard";
import UploadVoterList from "pages/SuperAdmin/DataManagement/UploadVoter";
import UploadKarykarta from "pages/SuperAdmin/DataManagement/UploadKaryakarta";
import UploadElectionList from "pages/SuperAdmin/DataManagement/UploadElectionList";
import KaryaKartaList from "pages/SuperAdmin/DataManagement/UploadKaryakarta/KaryakartaList";
import ClientList from "pages/SuperAdmin/User/ClientAdmin/ClientList";
import AddNewClient from "pages/SuperAdmin/User/ClientAdmin/AddNewClient";
import ClientProfile from "pages/SuperAdmin/User/ClientAdmin/ClientProfile";
import AddDistributor from "pages/SuperAdmin/User/DistributorUser/AddDistributor";
import DistributortList from "pages/SuperAdmin/User/DistributorUser/DistributorList";
import AddElections from "pages/SuperAdmin/Election/AddElection";
import ElectionsList from "pages/SuperAdmin/Election/EelctionList";
import Survey from "pages/SuperAdmin/Survey";
import AddBulkElection from "pages/SuperAdmin/Election/AddBulkelection";
import DistributorDashboard from "pages/Distributor/Dashboard";
import UploadVoterListDistributor from "pages/Distributor/DataManagement/UploadVoter";
import UploadKarykartaDistributor from "pages/Distributor/DataManagement/UploadVoter";
import UploadElectionListDistributor from "pages/Distributor/DataManagement/UploadElectionList";
import ClientListDistributor from "pages/Distributor/User/ClientAdmin/ClientList/index";
import AuthorizedUserDistributor from "pages/Distributor/User/AuthorizedUser";
import DistributorSurvey from "pages/Distributor/Survey";
import ElectionsListDistributor from "pages/Distributor/Election/EelctionList";
import SuperAdminVoterList from "pages/SuperAdmin/DataManagement/UploadVoter/Voter/index"
export const LoginRoute = {
  component: Login,
  path: "/",
  restricted: false,
};

export const DashboardRoute = {
  component: Dashboard,
  path: "/",
  restricted: true,
  roleId: ["2", "3"],
};

export const ForgotPasswordRoute = {
  component: ForgotPassword,
  path: "/forgotpassword",
  restricted: false,
};
export const NewPasswordRoute = {
  component: UpdatePassword,
  path: "/updatePassword",
  restricted: false,
};
export const VoterListRoute = {
  component: VoterList,
  path: "/voter-list",
  restricted: true,
};

export const ListViewRoutes = {
  component: ListView,
  path: "/list-view",
  restricted: true,
};
export const ManageDataRoutes = {
  component: ManageData,
  path: "/manage-data",
  restricted: true,
};

export const MobileSlipsSettingsRoutes = {
  component: MobileSlipsSettings,
  path: "/mobile-slip-settings",
  restricted: true,
};
export const BulkSlipsSettingsRoutes = {
  component: BulkSlipsSetting,
  path: "/Bulk-slip-setting",
  restricted: true,
};
export const WhatsappMessageRoutes = {
  component: Whatsapp,
  path: "/whatsapp-message",
  restricted: true,
};
export const MessagesRoutes = {
  component: TextMessages,
  path: "/text-message",
  restricted: true,
};
export const UploadPostRoutes = {
  component: UploadPost,
  path: "/uploadPost",
  restricted: true,
};
export const DisplayProfileRoutes = {
  component: MyProfile,
  path: "/displayProfile",
  restricted: true,
};

// Super-admin-routes
export const SuperDashboardRoute = {
  component: SuperAdminDashbord,
  path: "/",
  restricted: true,
};
export const UploadVoterListRoute = {
  component: UploadVoterList,
  path: "/upload-voter-list",
  restricted: true,
};
export const VoeterListRoute = {
  component: SuperAdminVoterList,
  path: "/voter-list",
  restricted: true,
};
export const UploadKaryakartaRoute = {
  component: UploadKarykarta,
  path: "/upload-karyakarta",
  restricted: true,
};

export const KaryakartaListRoute = {
  component: KaryaKartaList,
  path: "/karyakarta-list",
  restricted: true,
};

export const UploadElectionListRoute = {
  component: UploadElectionList,
  path: "/upload-election",
  restricted: true,
};
export const ClientAdminRoute = {
  component: ClientList,
  path: "/client-admin",
  restricted: true,
};

export const AddNewClientRoute = {
  component: AddNewClient,
  path: "/add-new-client",
  restricted: true,
};
export const ClientProfileRoute = {
  component: ClientProfile,
  path: "/client-profile",
  restricted: true,
};
export const DistributorRoute = {
  component: DistributortList,
  path: "/distributor",
  restricted: true,
};

export const AddDistributorRoute = {
  component: AddDistributor,
  path: "/add-distributor",
  restricted: true,
};

export const AddElectionsRoute = {
  component: AddElections,
  path: "/add-elections",
  restricted: true,
};
export const AddBulkElectionsRoute = {
  component: AddBulkElection,
  path: "/add-bulk-elections",
  restricted: true,
};
export const ElectionsListRoute = {
  component: ElectionsList,
  path: "/elections-list",
  restricted: true,
};

export const SurveyRoute = {
  component: Survey,
  path: "/survey",
  restricted: true,
};

// Distributor Routes
export const DistributorsRoute = {
  component: DistributorDashboard,
  path: "/",
  restricted: true,
};

export const UploadVoterListDistributorRoute = {
  component: UploadVoterListDistributor,
  path: "/upload-voter-list",
  restricted: true,
};

export const UploadKarykartaDistributorRoute = {
  component: UploadKarykartaDistributor,
  path: "/upload-karykarta-list",
  restricted: true,
};
export const UploadElectionListDistributorRoute = {
  component: UploadElectionListDistributor,
  path: "/upload-elections-list",
  restricted: true,
};

export const ClientListDistributorRoute = {
  component: ClientListDistributor,
  path: "/client-list",
  restricted: true,
};

export const AuthorizedUserDistributorRoute = {
  component: AuthorizedUserDistributor,
  path: "/authorized-users",
  restricted: true,
};
export const SurveryDistributorRoute = {
  component: DistributorSurvey,
  path: "/survey",
  restricted: true,
};

export const ElectionsListDistributorRoute = {
  component: ElectionsListDistributor,
  path: "/elections-list",
  restricted: true,
};

const IRouteS = {
  UN_AUTH_ROUTES: [LoginRoute, ForgotPasswordRoute, NewPasswordRoute],

  3: [
    DashboardRoute,
    VoterListRoute,
    ListViewRoutes,
    ManageDataRoutes,
    MobileSlipsSettingsRoutes,
    BulkSlipsSettingsRoutes,
    WhatsappMessageRoutes,
    MessagesRoutes,
    UploadPostRoutes,
    DisplayProfileRoutes,
    MobileSlipsSettingsRoutes,
  ],
  5: [
    SuperDashboardRoute,
    UploadVoterListRoute,
    UploadKaryakartaRoute,
    KaryakartaListRoute,
    UploadElectionListRoute,
    VoeterListRoute,
    ClientAdminRoute,
    AddNewClientRoute,
    ClientProfileRoute,
    DisplayProfileRoutes,
    DistributorRoute,
    AddDistributorRoute,
    AddElectionsRoute,
    ElectionsListRoute,
    SurveyRoute,
    AddBulkElectionsRoute,
  ],
  4: [
    DistributorsRoute,
    UploadVoterListDistributorRoute,
    UploadKarykartaDistributorRoute,
    UploadElectionListDistributorRoute,
    ClientListDistributorRoute,
    AuthorizedUserDistributorRoute,
    SurveryDistributorRoute,
    ElectionsListDistributorRoute,
    VoterListRoute,
    ElectionsListRoute,
  ],
};

export default IRouteS;
