import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  user: JSON.parse(localStorage.getItem("user")),
  role: JSON.parse(localStorage.getItem("role")),
  campus: JSON.parse(localStorage.getItem("campus")),
  offices: JSON.parse(localStorage.getItem("offices")),
  token: localStorage.getItem("jwt-auth-token") || "",
  userAccount: JSON.parse(localStorage.getItem("userAccount")),
  userEntry: JSON.parse(localStorage.getItem("userEntry")),
  account_id: JSON.parse(localStorage.getItem("account_id")),
  taskHead: JSON.parse(localStorage.getItem("taskHead")),
  uploader: JSON.parse(localStorage.getItem("uploader")),
  coordinator: JSON.parse(localStorage.getItem("coordinator")),
  accreditor: JSON.parse(localStorage.getItem("accreditor")),
  suc: JSON.parse(localStorage.getItem("suc")),
  office: JSON.parse(localStorage.getItem("office")),
  application: JSON.parse(localStorage.getItem("application")),
  program: JSON.parse(localStorage.getItem("program")),
  instrument: JSON.parse(localStorage.getItem("instrument")),
  assigned_user_id: JSON.parse(localStorage.getItem("assigned_user_id")),
  accreditor_role: JSON.parse(localStorage.getItem("accreditor_role")),
  parameter: JSON.parse(localStorage.getItem("parameter")),
  container: JSON.parse(localStorage.getItem("container")),
  tabSelect: JSON.parse(localStorage.getItem("tabSelect")),
  url: JSON.parse(localStorage.getItem("url"))
};

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  login(context, data) {
    return axios.post("/auth/login", data);
  },
  checkUser() {
    return axios.post("/auth/me");
  },
  logout(context) {
    context.commit("LOGOUT_SUCCESSFULL");
  },
  registerSucUser(context, data) {
    return axios.post(`/auth/registerSucUser/${data.campus_id}`, data);
  },
  setRole(context, data) {
    return axios.post(`/auth/setRole/${data.user_id}`, data);
  },
  showCampusUser(context, data) {
    return axios.get(`/auth/showCampusUser/${data}`);
  },
  registerAaccupAccreditor(context, data) {
    return axios.post("/auth/registerAaccupAccreditor", data);
  },
  showAaccup() {
    return axios.get("/auth/showAaccup");
  },
  showAccreditor() {
    return axios.get("/auth/showAccreditor");
  },
  deleteSetRole(context, data) {
    return axios.delete(
      `/auth/deleteSetRole/${data.user_id}/${data.role_id}/${data.office_id}`
    );
  },
  editUser(context, data) {
    return axios.put(`/auth/editUser/${data.user_id}`, data);
  },
  changePassword(context, data) {
    return axios.post(`/auth/changePassword/${data.user_id}`, data);
  },
  resetPassword(context, data) {
    return axios.put(`/auth/resetPassword/${data}`);
  },
  showPersonalInfo(context, data) {
    return axios.get(`/auth/showPersonalInfo/${data}`);
  },
  savePersonalInfo(context, data) {
    return axios.put(`/auth/savePersonalInfo/${data.user_id}`, data);
  },
  createEducationInfo(context, data) {
    return axios.post(`/auth/createEducationInfo/${data.user_id}`, data);
  },
  showEducationInfo(context, data) {
    return axios.get(`/auth/showEducationInfo/${data}`);
  },
  editEducationInfo(context, data) {
    return axios.put(`/auth/editEducationInfo/${data.user_education_id}`, data);
  },
  deleteEducationInfo(context, data) {
    return axios.delete(`/auth/deleteEducationInfo/${data}`);
  },
  createWorkExperience(context, data) {
    return axios.post(`/auth/createWorkExperience/${data.user_id}`, data);
  },
  showWorkExperience(context, data) {
    return axios.get(`/auth/showWorkExperience/${data}`);
  },
  editWorkExperience(context, data) {
    return axios.put(`/auth/editWorkExperience/${data.user_work_id}`, data);
  },
  deleteWorkExperience(context, data) {
    return axios.delete(`/auth/deleteWorkExperience/${data}`);
  },
  showOtherInformation(context, data) {
    return axios.get(`/auth/showOtherInformation/${data}`);
  },
  editOtherInformation(context, data) {
    return axios.put(`/auth/editOtherInformation/${data.user_id}`, data);
  },
  showAccreditorProfile(context, data) {
    return axios.get(`/auth/showAccreditorProfile/${data}`);
  },
  editAccreditorProfile(context, data) {
    return axios.put(`/auth/editAccreditorProfile/${data.user_id}`, data);
  },
  addAccreditorSpecialization(context, data) {
    return axios.post(
      `/auth/addAccreditorSpecialization/${data.user_id}`,
      data
    );
  },
  showAccreditorSpecialization(context, data) {
    return axios.get(`/auth/showAccreditorSpecialization/${data}`);
  },
  deleteAccreditorSpecialization(context, data) {
    return axios.delete(`/auth/deleteAccreditorSpecialization/${data}`);
  },
  activateUser(context, data) {
    return axios.put(`/auth/activateUser/${data}`);
  },
  deleteUser(context, data) {
    return axios.put(`/auth/deleteUser/${data}`);
  },
  addToOffice(context, data) {
    return axios.post(`/auth/addToOffice/${data.user_id}/${data.office_id}`);
  },
  removeFromOffice(context, data) {
    return axios.put(`/auth/removeFromOffice/${data}`);
  },
  showLocalAccreditor(context, data) {
    return axios.get(`/auth/showLocalAccreditor/${data}`);
  },
  changeAccreditorStatus(context, data) {
    return axios.put(`/auth/changeAccreditorStatus/${data.user_id}`, data);
  },
  addToCampus(context, data) {
    return axios.post(`/auth/addToCampus/${data.campus_id}/${data.user_id}`);
  },
  addToOtherCampus(context, data) {
    return axios.post("/suc/addCampusUser", data);
  },
  showTF(context, data) {
    return axios.get(`/auth/showTF/${data}`);
  },
  showAllNotification(context, data) {
    return axios.get(`/notification/showAllNotification/${data}`);
  },
  viewNotification(context, data) {
    return axios.get(`/notification/viewNotication/${data}`);
  },
  deleteNotification(context, data) {
    return axios.delete(`/notification/deleteNotification/${data}`);
  },
  acceptDeclineReschedule(context, data) {
    return axios.post(
      `/suc/acceptDeclineReschedule/${data.request_id}/${data.user_id}`,
      data
    );
  },
  showAllApplication() {
    return axios.get("/aaccup/showApplication");
  },
  approve(context, data) {
    return axios.put(`/aaccup/approve/${data.program_id}`, data);
  },
  reschedule(context, data) {
    return axios.post(
      `/aaccup/rechedule/${data.program_id}/${data.user_id}`,
      data
    );
  },
  reject(context, data) {
    return axios.put(`/aaccup/reject/${data}`);
  },
  request(context, data) {
    return axios.post(
      `/aaccup/request/${data.user_id}/${data.program_id}`,
      data
    );
  },
  addRequest(context, data) {
    return axios.post(
      `/aaccup/addRequest/${data.user_id}/${data.program_id}`,
      data
    );
  },
  editAcceptableScoreGap(context, data) {
    return axios.put("/aaccup/editAcceptableScoreGap", data);
  },
  registerQA(context, data) {
    return axios.post(`/aaccup/registerQA/${data.campus_id}`, data);
  },
  viewRequest(context, data) {
    return axios.get(`/accreditor/viewRequest/${data}`);
  },
  acceptRequest(context, data) {
    return axios.put(`/accreditor/acceptRequest/${data}`);
  },
  rejectRequest(context, data) {
    return axios.put(`/accreditor/rejectRequest/${data.request_id}`, data);
  },
  showCoordinatorRequest(context, data) {
    return axios.get(`/coordinator/showCoordinatorRequest/${data}`);
  },
  requestCoordinator(context, data) {
    return axios.post(
      `/coordinator/requestCoordinator/${data.application_id}/${data.user_id}`
    );
  },
  removeCoordinatorRequest(context, data) {
    return axios.delete(`/coordinator/removeCoordinatorRequest/${data}`);
  },
  showMyAccreditationApplication() {
    return axios.get(`/coordinator/showMyAccreditationApplication`);
  },
  showAccreditorInstrument(context, data) {
    return axios.get(`/coordinator/showInstrument/${data}`);
  },
  showAccreditorRequested(context, data) {
    return axios.get(`/coordinator/showAccreditorRequested/${data}`);
  },
  viewCoordinatorRequest() {
    return axios.get(`/coordinator/showMyRequest`);
  },
  coordinatorApproveRequest(context, data) {
    return axios.put(`/coordinator/approveRequest/${data}`);
  },
  coordinatorRejectRequest(context, data) {
    return axios.put(`/coordinator/rejectRequest/${data}`);
  },
  reassignAccreditor(context, data) {
    return axios.put(
      `/coordinator/reassignAccreditor/${data.user_id}/${data.program_id}/${data.instrument_id}`
    );
  },
  showTaskInstrument(context, data) {
    return axios.get(`/task/showInstrument/${data.user_id}/${data.program_id}`);
  },
  uploadOwnDocument(context, data) {
    let formData = new FormData();
    formData.append("document", data.document);
    formData.append("type", data.type);
    for (let x = 0; x < data.tag.length; x++)
      formData.append("tag[]", data.tag[x]);

    return axios.post(
      `/document/uploadOwnDocument/${data.user_id}/${data.statement_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  uploadOwnLink(context, data) {
    return axios.post(
      `/document/uploadOwnDocument/${data.user_id}/${data.statement_id}`,
      data
    );
  },
  showTaskParameter(context, data) {
    return axios.get(
      `/task/showParameter/${data.instrument_id}/${data.program_id}`
    );
  },
  deleteAccreditorRequest(context, data) {
    return axios.delete(`/aaccup/deleteAccreditorRequest/${data}`);
  },
  showApplication(context, data) {
    return axios.get(`/application/showApplication/${data}`);
  },
  viewFile(context, data) {
    return axios.get(`/application/viewFile/${data}`, { responseType: "blob" });
  },
  showProgramFile(context, data) {
    return axios.get(`/application/showProgramFile/${data}`);
  },
  showFileTFH(context, data) {
    return axios.get(`/application/showFileTFH/${data}`);
  },
  showFileQA(context, data) {
    return axios.get(`/application/showFileQA/${data}`);
  },
  showFileIA(context, data) {
    return axios.get(
      `/application/showFileIA/${data.program_id}/${data.user_id}`
    );
  },
  showFileEA(context, data) {
    return axios.get(
      `/application/showFileEA/${data.program_id}/${data.user_id}`
    );
  },
  showFileTF(context, data) {
    return axios.get(
      `/application/showFileTF/${data.program_id}/${data.user_id}`
    );
  },
  deleteProgramFile(context, data) {
    return axios.delete(
      `/application/deleteProgramFile/${data.document_id}/${data.user_id}`
    );
  },
  viewProgramFile(context, data) {
    return axios.get(`/application/viewProgramFile/${data}`, {
      responseType: "blob"
    });
  },
  uploadFile(context, data) {
    let formData = new FormData();
    for (let x = 0; x < data.filename.length; x++)
      formData.append("filename[]", data.filename[x]);

    return axios.post(
      `/application/uploadFile/${data.application_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  uploadProgramFile(context, data) {
    let formData = new FormData();
    // formData.append("filename", data.filename);
    for (let x = 0; x < data.filename.length; x++)
      formData.append("filename[]", data.filename[x]);
    formData.append("type", data.type);
    formData.append("area_number", data.area_number);
    return axios.post(
      `/application/uploadFile/${data.program_id}/${data.user_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  deleteFile(context, data) {
    return axios.delete(`/application/deleteFile/${data}`);
  },
  updateProgramFile(context, data) {
    let formData = new FormData();
    formData.append("file", data.file);

    return axios.post(`/application/updateProgramFile/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  viewPPP(context, data) {
    return axios.get(`/application/viewPPP/${data}`, { responseType: "blob" });
  },
  viewCompliance(context, data) {
    return axios.get(`/application/viewCompliance/${data}`, {
      responseType: "blob"
    });
  },
  viewNarrative(context, data) {
    return axios.get(`/application/viewNarrative/${data}`, {
      responseType: "blob"
    });
  },
  submitApplication(context, data) {
    return axios.post(
      `/application/submitApplication/${data.application_id}/${data.suc_id}`
    );
  },
  createApplication(context, data) {
    return axios.post(
      `/application/createApplication/${data.suc_id}/${data.user_id}`,
      data
    );
  },
  editApplication(context, data) {
    return axios.put(
      `/application/editApplication/${data.application_id}`,
      data
    );
  },
  deleteApplication(context, data) {
    return axios.delete(`/application/deleteApplication/${data}`);
  },
  showSelectedProgram(content, data) {
    return axios.get(`/application/showProgram/${data}`);
  },
  lockSelfSurvey(content, data) {
    return axios.put(`/application/lockSelfSurvey/${data.program_id}`, data);
  },
  showProgramList(content, data) {
    return axios.get(`/application/programList/${data}`);
  },
  createSelectedProgram(context, data) {
    return axios.post("/application/program", data);
  },
  removeSelectedProgram(context, data) {
    return axios.delete(`/application/delete/${data}`);
  },
  editSelectedProgram(context, data) {
    return axios.put(`/application/edit/${data.program_id}`, data);
  },
  editLevel(context, data) {
    return axios.put(`/application/editLevel/${data.program_id}`, data);
  },
  changeApplication(context, data) {
    return axios.put(
      `/application/changeApplication/${data.application_id}/${data.program_id}`
    );
  },
  assignHeadTask(content, data) {
    return axios.post(`/application/assignHeadTask/${data.program_id}`, data);
  },
  deleteAssignedHeadUser(context, data) {
    return axios.delete(
      `/application/deleteAssignedHeadUser/${data.user_id}/${data.transaction_id}`
    );
  },
  assignTask(content, data) {
    return axios.post(
      `/application/assignTask/${data.instrument_id}/${data.program_id}`,
      data
    );
  },
  deleteAssignedUser(context, data) {
    return axios.delete(`/application/deleteAssignedUser/${data}`);
  },
  showStatementDocument(context, data) {
    return axios.get(
      `/application/showStatementDocument/${data.program_id}/${data.transaction_id}`
    );
  },
  attachSupportDocument(context, data) {
    return axios.post(
      `/application/attachSupportDocument/${data.benchmark_statement_id}/${data.document_id}`
    );
  },
  removeSupportDocument(context, data) {
    return axios.delete(`/application/removeSupportDocument/${data}`);
  },
  showAreaSupportDocument(context, data) {
    return axios.get(`/application/showAreaSupportDocument/${data}`);
  },
  attachAreaSupportDocument(context, data) {
    return axios.post(
      `/application/attachAreaSupportDocument/${data.instrument_id}/${data.document_id}`
    );
  },
  removeAreaSupportDocument(context, data) {
    return axios.delete(`/application/removeAreaSupportDocument/${data}`);
  },
  saveRecommendation(context, data) {
    return axios.post(`/application/saveRecommendation/${data.user_id}`, data);
  },
  showSFRData(context, data) {
    return axios.get(
      `/application/showSFRData/${data.program_id}/${data.role}`
    );
  },
  showPersonalSFRData(context, data) {
    return axios.get(
      `/application/showPersonalSFRData/${data.program_id}/${data.role}`
    );
  },
  showRecommendation(context, data) {
    return axios.get(`/application/showRecommendation/${data}`);
  },
  approveApplication(context, data) {
    let formData = new FormData();
    formData.append("filename", data.filename);
    formData.append("end_of_validity", data.validity);
    return axios.post(
      `/application/approveApplication/${data.program_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  showProgramSAR(context, data) {
    return axios.get(
      `/application/showProgramSAR/${data.program_id}/${data.role}`
    );
  },
  updateInternalRole(context, data) {
    return axios.put(
      `/application/updateInternalRole/${data.program_id}`,
      data
    );
  },
  showAllCampus() {
    return axios.get("/suc/showAllCampus");
  },
  showProgram(content, data) {
    return axios.get(`/suc/showProgram/${data}`);
  },
  addProgram(context, data) {
    return axios.post(`/suc/addProgram/${data.suc_id}`, data);
  },
  removeProgram(content, data) {
    return axios.delete(`/suc/deleteProgram/${data.program_id}`);
  },
  selectInstrument(content, data) {
    return axios.post(
      `/suc/selectInstrument/${data.program_id}/${data.instrument_id}`
    );
  },
  showDepartment(content, data) {
    return axios.get(`/suc/showDepartment/${data}`);
  },
  showProgramHead(content, data) {
    return axios.get(`/task/showProgramHead/${data}`);
  },
  showCollegeCoordinator(content, data) {
    return axios.get(`/task/showCollegeCoordinator/${data}`);
  },
  showTask(content, data) {
    return axios.get(`/task/showProgram/${data}`);
  },
  showInstrumentProgram(content, data) {
    return axios.get(`/application/showInstrumentProgram/${data}`);
  },
  addInstrument(content, data) {
    return axios.post(
      `/application/addInstrument/${data.instrument_id}/${data.program_id}`
    );
  },
  addInstrumentForm(content, data) {
    return axios.post(
      `/instrument/addInstrument/${data.instrument_id}/${data.program_id}`
    );
  },
  removeInstrument(content, data) {
    return axios.delete(`/instrument/removeInstrument/${data.instrument_id}`);
  },
  setScore(context, data) {
    return axios.put(
      `/application/setScore/${data.parameter_id}/${data.assigned_user_id}`,
      data
    );
  },
  showBestPractice(context, data) {
    return axios.get(
      `/application/showBestPractice/${data.parameter_id}/${data.assigned_user_id}`
    );
  },
  changeProgramFileStatus(context, data) {
    return axios.put("/application/changeProgramFileStatus", data);
  },
  saveMeanScore(context, data) {
    return axios.post(
      `/application/saveAreaScore/${data.instrument_id}/${data.assigned_user_id}`,
      data
    );
  },
  showOptionArea(context, data) {
    return axios.get(`/application/showOptionArea/${data}`);
  },
  createInstrument(context, data) {
    return axios.post("/instrument/createInstrument", data);
  },
  showProgramInstrument() {
    return axios.get("/instrument/showProgram");
  },
  editInstrument(context, data) {
    return axios.put(`/instrument/editProgram/${data.id}`, data);
  },
  cloneInstrument(context, data) {
    return axios.post(`/instrument/cloneInstrument/${data.id}`, data);
  },
  deleteInstrument(context, data) {
    return axios.delete(`/instrument/deleteProgram/${data}`);
  },
  showInstrument(context, data) {
    return axios.get(`/instrument/showInstrument/${data}`);
  },
  setAreaMandatory(context, data) {
    return axios.post(`/instrument/setAreaMandatory/${data.id}`, data);
  },
  showCriteriaInstrument(context, data) {
    return axios.get(`/instrument/showCriteriaInstrument/${data}`);
  },
  createParameter(context, data) {
    return axios.post("/instrument/createParameter", data);
  },
  showParameter(context, data) {
    return axios.get(`/instrument/showParameter/${data}`);
  },
  editParameter(context, data) {
    return axios.put(`/instrument/editParameter/${data.id}`, data);
  },
  deleteParameter(context, data) {
    return axios.delete(`/instrument/deleteParameter/${data}`);
  },
  createStatement(context, data) {
    return axios.post(`/instrument/createStatement/${data.parameter_id}`, data);
  },
  deleteStatement(context, data) {
    return axios.delete(
      `/instrument/deleteStatement/${data.parameter_id}/${data.statement_id}`
    );
  },
  editStatement(context, data) {
    return axios.put("/instrument/editStatement", data);
  },
  showStatement(context, data) {
    return axios.get(`/instrument/showStatement/${data}`);
  },
  createCriteriaStatement(context, data) {
    return axios.post(
      `/instrument/createCriteriaStatement/${data.instrument_id}`,
      data
    );
  },
  addInstrumentTag(context, data) {
    return axios.post(`/instrument/addInstrumentTag/${data.id}`, data);
  },
  removeInstrumentTag(context, data) {
    return axios.delete(`/instrument/removeInstrumentTag/${data}`);
  },
  showInstrumentTag(context, data) {
    return axios.get(`/instrument/showInstrumentTag/${data}`);
  },
  showAppliedProgram(content, data) {
    return axios.get(`/aaccup/showProgram/${data}`);
  },
  showSuc() {
    return axios.get("/aaccup/showSuc");
  },
  addSuc(context, data) {
    return axios.post("/aaccup/addSuc", data);
  },
  editSuc(context, data) {
    return axios.put(`/aaccup/editSuc/${data.id}`, data);
  },
  deleteSuc(context, data) {
    return axios.delete(`/aaccup/deleteSuc/${data}`);
  },
  setAccreditorLead(context, data) {
    return axios.put(`/aaccup/setAccreditorLead/${data}`);
  },
  showCampus(context, data) {
    return axios.get(`/suc/showCampus/${data}`);
  },
  addCampus(context, data) {
    return axios.post(`/suc/addCampus/${data.id}`, data);
  },
  editCampus(context, data) {
    return axios.put(`/suc/editCampus/${data.id}`, data);
  },
  deleteCampus(context, data) {
    return axios.delete(`/suc/deleteCampus/${data}`);
  },
  showOffice(context, data) {
    return axios.get(`/suc/showOffice/${data}`);
  },
  createOffice(context, data) {
    return axios.post(`/suc/createOffice/${data.id}`, data);
  },
  editOffice(context, data) {
    return axios.put(`/suc/editOffice/${data.id}`, data);
  },
  deleteOffice(context, data) {
    return axios.delete(`/suc/deleteOffice/${data}`);
  },
  editProgram(context, data) {
    return axios.put(`/suc/editProgram/${data.id}`, data);
  },
  addProgramOffice(context, data) {
    return axios.put(`/suc/addOffice/${data.program_id}/${data.office_id}`);
  },
  deleteProgramOffice(context, data) {
    return axios.put(`/suc/deleteProgramOffice/${data}`);
  },
  addOfficeBestPractice(context, data) {
    return axios.post(`/suc/addBestPractice/${data.office_id}`, data);
  },
  showOfficeBestPractice(context, data) {
    return axios.get(`/suc/showBestPractice/${data}`);
  },
  editOfficeBestPractice(context, data) {
    return axios.put(`/suc/editBestPractice/${data.best_practice_id}`, data);
  },
  deleteOfficeBestPractice(context, data) {
    return axios.delete(`/suc/deleteBestPractice/${data}`);
  },
  attachBestPracticeDocument(context, data) {
    return axios.post(
      `/suc/attachDocument/${data.best_practice_id}/${data.document_id}`
    );
  },
  deleteBestPracticeDocument(context, data) {
    return axios.delete(`/suc/removeAttachDocument/${data}`);
  },
  addBestPracticeTag(context, data) {
    return axios.post(`/suc/addTag/${data.id}`, data);
  },
  deleteBestPracticeTag(context, data) {
    return axios.delete(`/suc/removeTag/${data}`);
  },
  makeDocumentList(context, data) {
    return axios.post(`/document/makeDocumentList/${data.office_id}`, data);
  },
  showContainer(context, data) {
    return axios.get(`/document/showContainer/${data}`);
  },
  editContainer(context, data) {
    return axios.put(`/document/editContainer/${data.container_id}`, data);
  },
  deleteContainer(context, data) {
    return axios.delete(`/document/deleteContainer/${data}`);
  },
  showDocument(context, data) {
    return axios.get(`/document/showDocument/${data}`);
  },
  showAllContainer(context, data) {
    return axios.get(
      `/document/showAllContainer/${data.user_id}/${data.campus_id}`
    );
  },
  // showOwnContainer(context, data) {
  //   return axios.get(`/document/showOwnContainer/${data}`);
  // },
  uploadDocument(context, data) {
    let formData = new FormData();
    for (let x = 0; x < data.documents.length; x++)
      formData.append("documents[]", data.documents[x]);
    formData.append("type", data.type);

    return axios.post(
      `/document/uploadDocument/${data.user_id}/${data.container_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  uploadLink(context, data) {
    return axios.post(
      `/document/uploadDocument/${data.user_id}/${data.container_id}`,
      data
    );
  },
  deleteDocument(context, data) {
    return axios.delete(`/document/deleteDocument/${data}`);
  },
  removeDocument(context, data) {
    return axios.delete(`/document/removeDocument/${data}`);
  },
  addTag(context, data) {
    return axios.post(`/document/addTag/${data.id}`, data);
  },
  deleteTag(context, data) {
    return axios.delete(`/document/deleteTag/${data}`);
  },
  documentViewFile(context, data) {
    return axios.get(`/document/viewFile/${data}`, { responseType: "blob" });
  },
  documentType(context, data) {
    return axios.get(`/document/viewLang/${data}`);
  },
  generateAreaSAR(context, data) {
    return axios.get(
      `/report/generateAreaSAR/${data.instrument_id}/${data.program_id}`,
      { responseType: "blob" }
    );
  },
  generateAreaSARInternal(context, data) {
    return axios.get(
      `/report/generateAreaSARInternal/${data.instrument_id}/${data.program_id}`,
      { responseType: "blob" }
    );
  },
  generateProgramSAR(context, data) {
    return axios.get(
      `/report/generateProgramSAR/${data.user_id}/${data.program_id}`,
      { responseType: "blob" }
    );
  },
  generateAccreditorReport(context, data) {
    return axios.get(`/report/generateAccreditorReport/${data}`, {
      responseType: "blob"
    });
  },
  generateAccreditorAreaReport(context, data) {
    return axios.get(
      `/report/generateAccreditorAreaReport/${data.program_id}/${data.instrument_id}`,
      {
        responseType: "blob"
      }
    );
  },
  downloadOBE(context, data) {
    return axios.get(
      `/report/downloadOBE/${data.program_id}/${data.instrument_id}`,
      {
        responseType: "blob"
      }
    );
  },
  showSFR(context, data) {
    return axios.get(`/report/showSFR/${data.program_id}/${data.role}`, {
      responseType: "blob"
    });
  },
  saveSFR(context, data) {
    return axios.post(
      `/report/saveSFR/${data.program_id}/${data.area_id}`,
      data
    );
  },
  viewSFR(context, data) {
    return axios.get(
      `/report/viewSFR/${data.program_id}/${data.area_id}/${data.role}`
    );
  },
  showTemplate(context, data) {
    return axios.get(`/report/showTemplate/${data}`);
  },
  addTemplate(context, data) {
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("template_name", data.template_name);
    for (let x = 0; x < data.tags.length; x++)
      formData.append("tags[]", data.tags[x]);

    return axios.post(`/report/addTemplate/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  deleteTemplate(context, data) {
    return axios.delete(`/report/deleteTemplate/${data}`);
  },
  showTagOption() {
    return axios.get(`/report/showTagOption`);
  },
  addTemplateTag(context, data) {
    return axios.post(`/report/addTemplateTag/${data.id}`, data);
  },
  removeTemplateTag(context, data) {
    return axios.delete(`/report/removeTemplateTag/${data}`);
  },
  downloadTemplate(context, data) {
    return axios.get(`/report/downloadFile/${data}`, { responseType: "blob" });
  },
  addPPPStatement(context, data) {
    return axios.post(`/ppp/addPPPStatement/${data.parameter_id}`, data);
  },
  showPPPStatement(context, data) {
    return axios.get(`/ppp/showPPPStatement/${data}`);
  },
  editPPPStatement(context, data) {
    return axios.put(`/ppp/editPPPStatement/${data.ppp_statement_id}`, data);
  },
  deletePPPStatement(context, data) {
    return axios.delete(`/ppp/deletePPPStatement/${data}`);
  },
  attachPPPFile(context, data) {
    return axios.post(
      `/ppp/attachFile/${data.ppp_statement_id}/${data.document_id}`,
      data
    );
  },
  removePPPFile(context, data) {
    return axios.delete(`/ppp/removeFile/${data}`);
  },
  showAllBestPractice(context, data) {
    return axios.get(`/ppp/showAllBestPractice/${data}`);
  },
  downloadPPP(context, data) {
    return axios.get(`/ppp/downloadPPP/${data}`, { responseType: "blob" });
  },
  showUnreadMessage(context, data) {
    return axios.get(`/message/showUnreadMessage/${data}`);
  },
  showRemark(context, data) {
    return axios.get(
      `/message/showRemark/${data.program_id}/${data.statement_id}/${data.type}`
    );
  },
  sendRemark(context, data) {
    return axios.post(
      `/message/sendRemark/${data.program_id}/${data.statement_id}`,
      data
    );
  }
};

const mutations = {
  LOGIN_SUCCESSFUL(state, data) {
    state.token = data.access_token;
    localStorage.setItem("jwt-auth-token", data.access_token);
  },
  STORE_CAMPUS(state, data) {
    if (data) {
      state.campus = data;
      localStorage.setItem("campus", JSON.stringify(data));
    }
  },
  STORE_USER(state, data) {
    state.user = data.user;
    state.role = data.role;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", JSON.stringify(data.role));
    if (data.office?.length) {
      state.offices = data.office.filter(
        item => item.campus_id === state.campus.campus_id
      );
      localStorage.setItem(
        "offices",
        JSON.stringify(
          data.office.filter(item => item.campus_id === state.campus.campus_id)
        )
      );
    }
  },
  LOGOUT_SUCCESSFULL(state) {
    state.token = null;
    localStorage.removeItem("jwt-auth-token");
    localStorage.clear();
  },
  saveUserAccount(state, data) {
    if (data.user) {
      state.userAccount = data.user;
      state.userEntry = data.userEntry;
      localStorage.setItem("userAccount", JSON.stringify(data.user));
      localStorage.setItem("userEntry", JSON.stringify(data.userEntry));
    } else {
      state.userAccount = data;
      state.userEntry = 0;
      localStorage.setItem("userAccount", JSON.stringify(data));
      localStorage.setItem("userEntry", JSON.stringify(0));
    }
  },
  saveAccountID(state, data) {
    state.account_id = data;
    localStorage.setItem("account_id", JSON.stringify(data));
  },
  saveCoordinator(state, data) {
    state.coordinator = data;
    localStorage.setItem("coordinator", JSON.stringify(data));
  },
  saveAccreditor(state, data) {
    state.accreditor = data;
    localStorage.setItem("accreditor", JSON.stringify(data));
  },
  saveTaskHead(state, data) {
    state.taskHead = data;
    localStorage.setItem("taskHead", JSON.stringify(data));
  },
  saveUploader(state, data) {
    state.uploader = data;
    localStorage.setItem("uploader", JSON.stringify(data));
  },
  saveSUC(state, data) {
    state.suc = data;
    localStorage.setItem("suc", JSON.stringify(data));
  },
  saveOffice(state, data) {
    state.office = data;
    localStorage.setItem("office", JSON.stringify(data));
  },
  saveApplication(state, data) {
    state.application = data;
    localStorage.setItem("application", JSON.stringify(data));
  },
  saveProgram(state, data) {
    state.program = data;
    localStorage.setItem("program", JSON.stringify(data));
  },
  saveInstrument(state, data) {
    state.instrument = data;
    localStorage.setItem("instrument", JSON.stringify(data));
  },
  saveAssignedUser(state, data) {
    state.assigned_user_id = data;
    localStorage.setItem("assigned_user_id", JSON.stringify(data));
  },
  saveRole(state, data) {
    state.accreditor_role = data;
    localStorage.setItem("accreditor_role", JSON.stringify(data));
  },
  saveParameter(state, data) {
    state.parameter = data;
    localStorage.setItem("parameter", JSON.stringify(data));
  },
  saveContainer(state, data) {
    state.container = data;
    localStorage.setItem("container", JSON.stringify(data));
  },
  saveTabSelect(state, data) {
    state.tabSelect = data;
    localStorage.setItem("tabSelect", JSON.stringify(data));
  },
  saveURL(state, data) {
    state.url = data;
    localStorage.setItem("url", JSON.stringify(data));
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
