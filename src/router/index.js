import Vue from "vue";
import Router from "vue-router";
import store from "../store/index.js";
import Login from "../views/Login.vue";
import Container from "../views/Container";
import Dashboard from "../views/Dashboard/Dashboard";
import PlanAccreditation from "../views/Application/Manage Applications";
import ProgramSelect from "../views/Application/Program Select";
import ProgramInstrument from "../views/Application/Program Instrument";
import ProgramForm from "../views/Application/Program Criteria Form";
import ManageApplication from "../views/Application - AACCUP/Manage Application";
import ViewPrograms from "../views/Application - AACCUP/View Programs";
import AssignAcceptableGapArea from "../views/Application - AACCUP/View Area";
import AssignAcceptableGapParameter from "../views/Application - AACCUP/View Parameter";
import UserRegister_SUC from "../views/User Management/User Management - SUC";
import AccreditorRegister_SUC from "../views/User Management/AccreditorRegister - SUC";
import UserRegister_AACCUP from "../views/User Management/User Management - AACCUP";
import AccreditorRegister_AACCUP from "../views/User Management/AccreditorRegister - AACCUP";
import TaskForceRegister from "../views/User Management/Manage Task Force";
import Profile from "../views/Manage Account/Profile";
import Profile_SUC from "../views/Manage Account/Profile";
import Profile_AACCUP from "../views/Manage Account/Profile";
import AccreditorProfile from "../views/Manage Account/Accreditor Profile";
import AccreditorProfile_SUC from "../views/Manage Account/Accreditor Profile";
import AccreditorProfile_AACCUP from "../views/Manage Account/Accreditor Profile";
import TaskForceProfile from "../views/Manage Account/Profile";
import ManageSUC from "../views/SUC Management/SUC Management";
import ManageCampus from "../views/SUC Management/Campus Management";
import ManageOffice from "../views/SUC Management/Office Management";
import ManageSupportUploads from "../views/Support Office/Manage Uploads";
import UploadedDocuments from "../views/Support Office/Uploaded Documents";
import ManageBestPractice from "../views/Support Office/Best Practice";
import AssignUploads from "../views/Assign Uploads/Assign Uploads";
import AssignUploadedDocuments from "../views/Assign Uploads/Uploaded Documents";
import ManageProgram from "../views/Program Management/Program Management";
import ManageInstrumentProgram from "../views/MSI/Manage Instrument Program";
import ManageInstrument from "../views/MSI/Manage Instrument";
import ManageParameters from "../views/MSI/Manage Parameter";
import ShowStatements from "../views/MSI/Statement Table - Create";
import ShowStatementForms from "../views/MSI/Statement Table Form - Create";
import ShowStatementPSV from "../views/MSI/Statement Table PSV - Create";
import ManageTaskUploads from "../views/Task Force/Manage Uploads";
import ManageTaskBestPractice from "../views/Task Force/Best Practice";
import TaskForceHeadTask from "../views/Task Force/My Tasks Head";
import TaskForceTask from "../views/Task Force/My Tasks";
import TaskForceArea from "../views/Task Force/Area Select";
import TaskForceParameter from "../views/Task Force/Parameter Select";
import AttachFileStatement from "../views/Task Force/Statement Table - Upload File";
import AttachFileForm from "../views/Task Force/Statement Table Form - Upload File";
import AttachFilePSV from "../views/Task Force/Statement Table PSV - Upload FIle";
import InternalAccreditationTask from "../views/Accreditor/Internal Accreditation";
import AccreditationRequests from "../views/Accreditor/Accreditation Request";
import AccreditationTask from "../views/Accreditor/My Accreditation";
import AccreditationProgramOC from "../views/Accreditor/Program Select OC";
import AccreditationAreaOC from "../views/Accreditor/Area Select OC";
import AccreditationArea from "../views/Accreditor/Area Select";
import AccreditationParameter from "../views/Accreditor/Parameter Select";
import RateStatement from "../views/Accreditor/Statement Table - Rate";
import RateStatementForm from "../views/Accreditor/Statement Table Form - Rate";
import RateStatementPSV from "../views/Accreditor/Statement Table PSV - Rate";
import ManageDocumentTemplate from "../views/Document Template/Manage Document Template";
import Documents from "../views/View Documents";

Vue.use(Router);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false
    }
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "Container",
    component: Container,
    meta: {
      title: "Container",
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard",
          requiresAuth: true
        }
      },

      {
        path: "/PlanAccreditation",
        name: "PlanAccreditation",
        component: PlanAccreditation,
        meta: {
          title: "PlanAccreditation",
          requiresAuth: true,
          tab: [{ name: "Manage Application", link: "/PlanAccreditation" }]
        }
      },
      {
        path: "/ProgramSelect",
        name: "ProgramSelect",
        component: ProgramSelect,
        meta: {
          title: "ProgramSelect",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/PlanAccreditation" },
            { name: "Select Program", link: "/ProgramSelect" }
          ]
        }
      },
      {
        path: "/ProgramInstrument",
        name: "ProgramInstrument",
        component: ProgramInstrument,
        meta: {
          title: "ProgramInstrument",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/PlanAccreditation" },
            { name: "Select Program", link: "/ProgramSelect" },
            { name: "Program Information", link: "/ProgramInstrument" }
          ]
        }
      },
      {
        path: "/ProgramForm",
        name: "ProgramForm",
        component: ProgramForm,
        meta: {
          title: "ProgramForm",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/PlanAccreditation" },
            { name: "Select Program", link: "/ProgramSelect" },
            { name: "Program Information", link: "/ProgramForm" }
          ]
        }
      },

      {
        path: "/ManageApplication",
        name: "ManageApplication",
        component: ManageApplication,
        meta: {
          title: "ManageApplication",
          requiresAuth: true,
          tab: [{ name: "Manage Application", link: "/ManageApplication" }]
        }
      },
      {
        path: "/ViewPrograms",
        name: "ViewPrograms",
        component: ViewPrograms,
        meta: {
          title: "ViewPrograms",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/ManageApplication" },
            { name: "View Programs", link: "/ViewPrograms" }
          ]
        }
      },
      {
        path: "/AssignAcceptableGapArea",
        name: "AssignAcceptableGapArea",
        component: AssignAcceptableGapArea,
        meta: {
          title: "AssignAcceptableGapArea",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/ManageApplication" },
            { name: "View Programs", link: "/ViewPrograms" },
            { name: "Assign Accreditor", link: "/AssignAcceptableGapArea" }
          ]
        }
      },
      {
        path: "/AssignAcceptableGapParameter",
        name: "AssignAcceptableGapParameter",
        component: AssignAcceptableGapParameter,
        meta: {
          title: "AssignAcceptableGapParameter",
          requiresAuth: true,
          tab: [
            { name: "Manage Application", link: "/ManageApplication" },
            { name: "View Programs", link: "/ViewPrograms" },
            { name: "Assign Accreditor", link: "/AssignAcceptableGapArea" },
            {
              name: "Set Acceptable Gap",
              link: "/AssignAcceptableGapParameter"
            }
          ]
        }
      },

      {
        path: "/UserRegister_SUC",
        name: "UserRegister_SUC",
        component: UserRegister_SUC,
        meta: {
          title: "UserRegister_SUC",
          requiresAuth: true,
          tab: [{ name: "Manage Users", link: "/UserRegister_SUC" }]
        }
      },
      {
        path: "/AccreditorRegister_SUC",
        name: "AccreditorRegister_SUC",
        component: AccreditorRegister_SUC,
        meta: {
          title: "AccreditorRegister_SUC",
          requiresAuth: true,
          tab: [{ name: "Manage Accreditors", link: "/AccreditorRegister_SUC" }]
        }
      },
      {
        path: "/UserRegister_AACCUP",
        name: "UserRegister_AACCUP",
        component: UserRegister_AACCUP,
        meta: {
          title: "UserRegister_AACCUP",
          requiresAuth: true,
          tab: [{ name: "Manage Users", link: "/UserRegister_AACCUP" }]
        }
      },
      {
        path: "/AccreditorRegister_AACCUP",
        name: "AccreditorRegister_AACCUP",
        component: AccreditorRegister_AACCUP,
        meta: {
          title: "AccreditorRegister_AACCUP",
          requiresAuth: true,
          tab: [
            { name: "Manage Accreditors", link: "/AccreditorRegister_AACCUP" }
          ]
        }
      },
      {
        path: "/TaskForceRegister",
        name: "TaskForceRegister",
        component: TaskForceRegister,
        meta: {
          title: "TaskForceRegister",
          requiresAuth: true,
          tab: [{ name: "Manage Users", link: "/TaskForceRegister" }]
        }
      },

      {
        path: "/Profile",
        name: "Profile",
        component: Profile,
        meta: {
          title: "Profile",
          requiresAuth: true
        }
      },
      {
        path: "/AccreditorProfile",
        name: "AccreditorProfile",
        component: AccreditorProfile,
        meta: {
          title: "AccreditorProfile",
          requiresAuth: true
        }
      },
      {
        path: "/Profile_SUC",
        name: "Profile_SUC",
        component: Profile_SUC,
        meta: {
          title: "Profile_SUC",
          requiresAuth: true,
          tab: [
            { name: "Manage Users", link: "/UserRegister_SUC" },
            { name: "Manage Account", link: "/Profile_SUC" }
          ]
        }
      },
      {
        path: "/Profile_AACCUP",
        name: "Profile_AACCUP",
        component: Profile_AACCUP,
        meta: {
          title: "Profile_AACCUP",
          requiresAuth: true,
          tab: [
            { name: "Manage Users", link: "/UserRegister_AACCUP" },
            { name: "Manage Account", link: "/Profile_AACCUP" }
          ]
        }
      },
      {
        path: "/AccreditorProfile_SUC",
        name: "AccreditorProfile_SUC",
        component: AccreditorProfile_SUC,
        meta: {
          title: "AccreditorProfile_SUC",
          requiresAuth: true,
          tab: [
            { name: "Manage Accreditors", link: "/AccreditorRegister_SUC" },
            { name: "Manage Account", link: "/AccreditorProfile_SUC" }
          ]
        }
      },
      {
        path: "/AccreditorProfile_AACCUP",
        name: "AccreditorProfile_AACCUP",
        component: AccreditorProfile_AACCUP,
        meta: {
          title: "AccreditorProfile_AACCUP",
          requiresAuth: true,
          tab: [
            { name: "Manage Accreditors", link: "/AccreditorRegister_AACCUP" },
            { name: "Manage Account", link: "/AccreditorProfile_AACCUP" }
          ]
        }
      },
      {
        path: "/TaskForceProfile",
        name: "TaskForceProfile",
        component: TaskForceProfile,
        meta: {
          title: "TaskForceProfile",
          requiresAuth: true,
          tab: [
            { name: "Manage Users", link: "/TaskForceRegister" },
            { name: "Manage Campus", link: "/TaskForceProfile" }
          ]
        }
      },

      {
        path: "/ManageSUC",
        name: "ManageSUC",
        component: ManageSUC,
        meta: {
          title: "ManageSUC",
          requiresAuth: true,
          tab: [{ name: "Manage SUC", link: "/ManageSUC" }]
        }
      },
      {
        path: "/ManageCampus",
        name: "ManageCampus",
        component: ManageCampus,
        meta: {
          title: "ManageCampus",
          requiresAuth: true,
          tab: [
            { name: "Manage SUC", link: "/ManageSUC" },
            { name: "Manage Campus", link: "/ManageCampus" }
          ]
        }
      },
      {
        path: "/ManageOffice",
        name: "ManageOffice",
        component: ManageOffice,
        meta: {
          title: "ManageOffice",
          requiresAuth: true,
          tab: [{ name: "Manage Offices", link: "/ManageOffice" }]
        }
      },

      {
        path: "/AssignUploads",
        name: "AssignUploads",
        component: AssignUploads,
        meta: {
          title: "AssignUploads",
          requiresAuth: true,
          tab: [
            { name: "Manage Offices", link: "/ManageOffice" },
            { name: "Assign Uploads", link: "/AssignUploads" }
          ]
        }
      },
      {
        path: "/AssignUploadedDocuments",
        name: "AssignUploadedDocuments",
        component: AssignUploadedDocuments,
        meta: {
          title: "AssignUploadedDocuments",
          requiresAuth: true,
          tab: [
            { name: "Manage Offices", link: "/ManageOffice" },
            { name: "Assign Uploads", link: "/AssignUploads" },
            { name: "Upload Documents", link: "/AssignUploadedDocuments" }
          ]
        }
      },

      {
        path: "/ManageSupportUploads",
        name: "ManageSupportUploads",
        component: ManageSupportUploads,
        meta: {
          title: "ManageSupportUploads",
          requiresAuth: true,
          tab: [{ name: "Manage Documents", link: "/ManageSupportUploads" }]
        }
      },
      {
        path: "/ManageTaskUploads",
        name: "ManageTaskUploads",
        component: ManageTaskUploads,
        meta: {
          title: "ManageTaskUploads",
          requiresAuth: true,
          tab: [{ name: "Manage Documents", link: "/ManageTaskUploads" }]
        }
      },
      {
        path: "/UploadedDocuments",
        name: "UploadedDocuments",
        component: UploadedDocuments,
        meta: {
          title: "UploadedDocuments",
          requiresAuth: true,
          tab: [
            { name: "Manage Documents", link: "ManageUploads" },
            { name: "Uploaded Documents", link: "/UploadedDocuments" }
          ]
        }
      },

      {
        path: "/ManageBestPractice",
        name: "ManageBestPractice",
        component: ManageBestPractice,
        meta: {
          title: "ManageBestPractice",
          requiresAuth: true
        }
      },

      {
        path: "/ManageTaskBestPractice",
        name: "ManageTaskBestPractice",
        component: ManageTaskBestPractice,
        meta: {
          title: "ManageTaskBestPractice",
          requiresAuth: true
        }
      },

      {
        path: "/ManageProgram",
        name: "ManageProgram",
        component: ManageProgram,
        meta: {
          title: "ManageProgram",
          requiresAuth: true
        }
      },

      {
        path: "/ManageInstrumentProgram",
        name: "ManageInstrumentProgram",
        component: ManageInstrumentProgram,
        meta: {
          title: "ManageInstrumentProgram",
          requiresAuth: true,
          tab: [
            { name: "Manage Instruments", link: "/ManageInstrumentProgram" }
          ]
        }
      },
      {
        path: "/ManageInstrument",
        name: "ManageInstrument",
        component: ManageInstrument,
        meta: {
          title: "ManageInstrument",
          requiresAuth: true,
          tab: [
            { name: "Manage Instruments", link: "/ManageInstrumentProgram" },
            { name: "Areas", link: "/ManageInstrument" }
          ]
        }
      },
      {
        path: "/ManageParameters",
        name: "ManageParameters",
        component: ManageParameters,
        meta: {
          title: "ManageParameters",
          requiresAuth: true,
          tab: [
            { name: "Manage Instruments", link: "/ManageInstrumentProgram" },
            { name: "Areas", link: "/ManageInstrument" },
            { name: "Parameters", link: "/ManageParameters" }
          ]
        }
      },
      {
        path: "/ShowStatements",
        name: "ShowStatements",
        component: ShowStatements,
        meta: {
          title: "ShowStatements",
          requiresAuth: true,
          tab: [
            { name: "Manage MSI", link: "/ManageInstrumentProgram" },
            { name: "Areas", link: "/ManageInstrument" },
            { name: "Parameters", link: "/ManageParameters" },
            { name: "Create MSI", link: "/ShowStatements" }
          ]
        }
      },
      {
        path: "/ShowStatementForms",
        name: "ShowStatementForms",
        component: ShowStatementForms,
        meta: {
          title: "ShowStatementForms",
          requiresAuth: true,
          tab: [
            { name: "Manage MSI", link: "/ManageInstrumentProgram" },
            { name: "Create MSI", link: "/ShowStatementForms" }
          ]
        }
      },
      {
        path: "/ShowStatementPSV",
        name: "ShowStatementPSV",
        component: ShowStatementPSV,
        meta: {
          title: "ShowStatementPSV",
          requiresAuth: true,
          tab: [
            { name: "Manage MSI", link: "/ManageInstrumentProgram" },
            { name: "Create MSI", link: "/ShowStatementPSV" }
          ]
        }
      },

      {
        path: "/TaskForceHeadTask",
        name: "TaskForceHeadTask",
        component: TaskForceHeadTask,
        meta: {
          title: "TaskForceHeadTask",
          requiresAuth: true,
          tab: [{ name: "Programs", link: "/TaskForceHeadTask" }]
        }
      },
      {
        path: "/TaskForceTask",
        name: "TaskForceTask",
        component: TaskForceTask,
        meta: {
          title: "TaskForceTask",
          requiresAuth: true,
          tab: [{ name: "Programs", link: "/TaskForceTask" }]
        }
      },
      {
        path: "/TaskForceArea",
        name: "TaskForceArea",
        component: TaskForceArea,
        meta: {
          title: "TaskForceArea",
          requiresAuth: true,
          tab: [
            { name: "Programs", link: "TaskForce" },
            { name: "Areas", link: "/TaskForceArea" }
          ]
        }
      },
      {
        path: "/TaskForceParameter",
        name: "TaskForceParameter",
        component: TaskForceParameter,
        meta: {
          title: "TaskForceParameter",
          requiresAuth: true,
          tab: [
            { name: "Programs", link: "TaskForce" },
            { name: "Areas", link: "/TaskForceArea" },
            { name: "Parameters", link: "/TaskForceParameter" }
          ]
        }
      },
      {
        path: "/AttachFileStatement",
        name: "AttachFileStatement",
        component: AttachFileStatement,
        meta: {
          title: "AttachFileStatement",
          requiresAuth: true,
          tab: [
            { name: "Programs", link: "TaskForce" },
            { name: "Areas", link: "/TaskForceArea" },
            { name: "Parameters", link: "/TaskForceParameter" },
            { name: "MSI - Attach File", link: "/AttachFileStatement" }
          ]
        }
      },
      {
        path: "/AttachFileForm",
        name: "AttachFileForm",
        component: AttachFileForm,
        meta: {
          title: "AttachFileForm",
          requiresAuth: true,
          tab: [
            { name: "Programs", link: "TaskForce" },
            { name: "Areas", link: "/TaskForceArea" },
            { name: "MSI - Attach File", link: "/AttachFileForm" }
          ]
        }
      },
      {
        path: "/AttachFilePSV",
        name: "AttachFilePSV",
        component: AttachFilePSV,
        meta: {
          title: "AttachFilePSV",
          requiresAuth: true,
          tab: [
            { name: "Programs", link: "TaskForce" },
            { name: "Areas", link: "/TaskForceArea" },
            { name: "MSI - Attach File", link: "/AttachFilePSV" }
          ]
        }
      },

      {
        path: "/AccreditationRequests",
        name: "AccreditationRequests",
        component: AccreditationRequests,
        meta: {
          title: "AccreditationRequests",
          requiresAuth: true
        }
      },
      {
        path: "/InternalAccreditationTask",
        name: "InternalAccreditationTask",
        component: InternalAccreditationTask,
        meta: {
          title: "InternalAccreditationTask",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "/InternalAccreditationTask" }
          ]
        }
      },
      {
        path: "/AccreditationTask",
        name: "AccreditationTask",
        component: AccreditationTask,
        meta: {
          title: "AccreditationTask",
          requiresAuth: true,
          tab: [{ name: "My Accreditation", link: "/AccreditationTask" }]
        }
      },
      {
        path: "/AccreditationProgramOC",
        name: "AccreditationProgramOC",
        component: AccreditationProgramOC,
        meta: {
          title: "AccreditationProgramOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" }
          ]
        }
      },
      {
        path: "/AccreditationAreaOC",
        name: "AccreditationAreaOC",
        component: AccreditationAreaOC,
        meta: {
          title: "AccreditationAreaOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" },
            { name: "Areas", link: "/AccreditationAreaOC" }
          ]
        }
      },
      {
        path: "/AccreditationParameterOC",
        name: "AccreditationParameterOC",
        component: AccreditationParameter,
        meta: {
          title: "AccreditationParameterOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" },
            { name: "Areas", link: "/AccreditationAreaOC" },
            { name: "Parameters", link: "/AccreditationParameterOC" }
          ]
        }
      },
      {
        path: "/RateStatementOC",
        name: "RateStatementOC",
        component: RateStatement,
        meta: {
          title: "RateStatementOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" },
            { name: "Areas", link: "/AccreditationAreaOC" },
            { name: "Parameters", link: "/AccreditationParameterOC" },
            { name: "MSI - Rate", link: "/RateStatementOC" }
          ]
        }
      },
      {
        path: "/RateStatementFormOC",
        name: "RateStatementFormOC",
        component: RateStatementForm,
        meta: {
          title: "RateStatementFormOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" },
            { name: "Areas", link: "/AccreditationAreaOC" },
            { name: "MSI - Rate", link: "/RateStatementFormOC" }
          ]
        }
      },
      {
        path: "/RateStatementPSVOC",
        name: "RateStatementPSVOC",
        component: RateStatementPSV,
        meta: {
          title: "RateStatementPSVOC",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Programs", link: "/AccreditationProgramOC" },
            { name: "Areas", link: "/AccreditationAreaOC" },
            { name: "MSI - Rate", link: "/RateStatementPSVOC" }
          ]
        }
      },
      {
        path: "/AccreditationArea",
        name: "AccreditationArea",
        component: AccreditationArea,
        meta: {
          title: "AccreditationArea",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Areas", link: "/AccreditationArea" }
          ]
        }
      },
      {
        path: "/AccreditationParameter",
        name: "AccreditationParameter",
        component: AccreditationParameter,
        meta: {
          title: "AccreditationParameter",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Areas", link: "/AccreditationArea" },
            { name: "Parameters", link: "/AccreditationParameter" }
          ]
        }
      },
      {
        path: "/RateStatement",
        name: "RateStatement",
        component: RateStatement,
        meta: {
          title: "RateStatement",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Areas", link: "/AccreditationArea" },
            { name: "Parameters", link: "/AccreditationParameter" },
            { name: "MSI - Rate", link: "/RateStatement" }
          ]
        }
      },
      {
        path: "/RateStatementForm",
        name: "RateStatementForm",
        component: RateStatementForm,
        meta: {
          title: "RateStatementForm",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Areas", link: "/AccreditationArea" },
            { name: "MSI - Rate", link: "/RateStatementForm" }
          ]
        }
      },
      {
        path: "/RateStatementPSV",
        name: "RateStatementPSV",
        component: RateStatementPSV,
        meta: {
          title: "RateStatementPSV",
          requiresAuth: true,
          tab: [
            { name: "My Accreditation", link: "Accreditor" },
            { name: "Areas", link: "/AccreditationArea" },
            { name: "MSI - Rate", link: "/RateStatementPSV" }
          ]
        }
      },
      {
        path: "/ManageDocumentTemplate",
        name: "ManageDocumentTemplate",
        component: ManageDocumentTemplate,
        meta: {
          title: "ManageDocumentTemplate",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/Documents",
    name: "Documents",
    component: Documents,
    meta: {
      title: "Documents",
      requiresAuth: false
    }
  }
];

const router = new Router({
  mode: "history",
  base: "/app",
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next();
  if (!localStorage.getItem("jwt-auth-token")) return router.replace("/login");
  if (!localStorage.getItem("campus")) return router.replace("/login");
  if (
    typeof localStorage.getItem("jwt-auth-token") &&
    localStorage.getItem("jwt-auth-token") === null
  )
    return router.replace("/login");
  store
    .dispatch("checkUser")
    // .then(() => {
    //   // store.commit("STORE_USER", result.data);
    //   store.dispatch("logout");
    //   router.replace("/login");
    // })
    .catch(() => {
      store.dispatch("logout");
      router.replace("/login");
      this.$bvToast.toast("Your session has expired.", {
        title: "Session Expired",
        variant: "danger",
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    });
  return next();
});

export default router;
