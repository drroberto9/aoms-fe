<template>
  <div class="page-container" id="app">
    <md-app class="full-height" md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button
          class="md-icon-button md-dense"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <md-button
          class="md-icon-button md-dense"
          @click="toggleMenu"
          v-if="menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <h3 class="md-title">Accreditation Online Management System</h3>

        <div class="md-toolbar-section-end">
          <div class="md-title" style="padding: 10px">
            Hi {{ user.first_name }}!
          </div>
          <md-badge
            v-if="notifications.length > 0"
            :md-content="notifications.length"
            md-dense
          >
            <b-dropdown
              size="sm"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content
                ><md-button class="md-icon-button md-dense"
                  ><md-icon>notifications</md-icon></md-button
                >
              </template>
              <div v-for="(item, index) in notifications" :key="index">
                <b-dropdown-item
                  @click="
                    showNotification(item.id);
                    selectNotification(item);
                  "
                >
                  <h6 style="margin: 0; min-width: max-content">
                    {{ item.notif_type }}
                  </h6>
                  <small style="margin: 0">{{
                    setDate(item.updated_at)
                  }}</small>
                </b-dropdown-item>
                <b-dropdown-divider
                  v-if="index < notifications.length - 1"
                ></b-dropdown-divider>
              </div>
            </b-dropdown>
          </md-badge>

          <md-button v-else class="md-icon-button md-dense"
            ><md-icon>notifications</md-icon></md-button
          >

          <b-dropdown
            size="sm"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content
              ><md-button class="md-icon-button md-dense" md-menu-trigger
                ><md-icon>person</md-icon></md-button
              >
            </template>
            <b-dropdown-item disabled>
              <div style="font-size: 20px">{{ concatName(user) }}</div>
              <div style="font-size: 18px">{{ user.email }}</div>
            </b-dropdown-item>
            <b-dropdown-item @click="manageAccount"
              >Manage Account</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              v-if="campusList.length > 1"
              @click="
                changeSUC = true;
                campusSelect = campus;
              "
              >Change Campus</b-dropdown-item
            >
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </md-app-toolbar>

      <md-app-drawer
        :md-active.sync="menuVisible"
        md-persistent="mini"
        md-permanent="clipped"
        class="md-scrollbar"
      >
        <md-list md-selectable="single" md-sync-route>
          <!--          &lt;!&ndash;User Profile&ndash;&gt;-->
          <!--          <md-app-toolbar class="md-transparent md-dense">-->
          <!--            <div style="font-size: 17px; font-weight: bold; width: 100%">-->
          <!--              {{ concatName(user) }}-->
          <!--            </div>-->
          <!--            <div style="font-size: 15px; font-weight: bold; width: 225px">-->
          <!--              {{ user.email }}-->
          <!--            </div>-->
          <!--          </md-app-toolbar>-->
          <!--          <md-divider style="margin-top: 10px" />-->

          <!--AACCUP-->
          <div v-if="checkRole(10) || checkRole(9)">
            <md-list-item
              :class="collapse1 ? null : 'collapsed'"
              :aria-expanded="collapse1 ? 'true' : 'false'"
              aria-controls="collapse-1"
              @click="collapse1 = !collapse1"
              class="md-transparent md-dense"
              style="font-size: 16px; font-weight: bold; outline: none !important"
            >
              <div v-if="!menuVisible" style="margin-right: 25px">
                <md-icon v-if="collapse5">expand_less</md-icon>
                <md-icon v-else>expand_more</md-icon>
              </div>
              <div v-if="checkRole(10)" class="md-toolbar-section-start">
                AACCUP BOARD MEMBER
              </div>
              <div v-else-if="checkRole(9)" class="md-toolbar-section-start">
                AACCUP STAFF
              </div>
              <div
                class="md-toolbar-section-end"
                style="max-width: max-content"
              >
                <md-icon class="md-dense" v-if="collapse1">expand_less</md-icon>
                <md-icon class="md-dense" v-else>expand_more</md-icon>
              </div>
            </md-list-item>
            <b-collapse id="collapse-1" v-model="collapse1" style="width: 100%">
              <md-list-item to="/ManageApplication"
                ><md-icon style="margin-right: 10px">email</md-icon
                ><span class="md-list-item-text"
                  >Manage Applications</span
                ></md-list-item
              >
              <md-list-item to="/UserRegister_AACCUP"
                ><md-icon style="margin-right: 10px">account_circle</md-icon
                ><span class="md-list-item-text"
                  >Manage Users</span
                ></md-list-item
              >
              <md-list-item to="/AccreditorRegister_AACCUP"
                ><md-icon style="margin-right: 10px"
                  >supervised_user_circle</md-icon
                ><span class="md-list-item-text"
                  >Manage Accreditors</span
                ></md-list-item
              >
              <md-list-item to="/ManageSUC"
                ><md-icon style="margin-right: 10px">school</md-icon
                ><span class="md-list-item-text">Manage SUC</span></md-list-item
              >
              <md-list-item to="/ManageInstrumentProgram"
                ><md-icon style="margin-right: 10px">create</md-icon
                ><span class="md-list-item-text"
                  >Manage Instrument</span
                ></md-list-item
              >
            </b-collapse>
            <md-divider />
          </div>

          <!--QA System-->
          <div v-if="checkRole(5) || checkRole(6)">
            <md-list-item
              :class="collapse2 ? null : 'collapsed'"
              :aria-expanded="collapse2 ? 'true' : 'false'"
              aria-controls="collapse-2"
              @click="collapse2 = !collapse2"
              class="md-transparent md-dense"
              style="font-size: 16px; font-weight: bold; outline: none !important"
            >
              <div v-if="!menuVisible" style="margin-right: 25px">
                <md-icon v-if="collapse5">expand_less</md-icon>
                <md-icon v-else>expand_more</md-icon>
              </div>
              <div v-if="checkRole(5)" class="md-toolbar-section-start">
                QA OFFICE HEAD
              </div>
              <div v-else-if="checkRole(6)" class="md-toolbar-section-start">
                QA OFFICE MEMBER
              </div>
              <div
                class="md-toolbar-section-end"
                style="max-width: max-content"
              >
                <md-icon class="md-dense" v-if="collapse2">expand_less</md-icon>
                <md-icon class="md-dense" v-else>expand_more</md-icon>
              </div>
            </md-list-item>
            <b-collapse id="collapse-2" v-model="collapse2" style="width: 100%">
              <md-list-item to="/PlanAccreditation"
                ><md-icon style="margin-right: 10px">content_paste</md-icon
                ><span class="md-list-item-text"
                  >Manage Application</span
                ></md-list-item
              >
              <!--              <md-list-item to="/SUCApplication"-->
              <!--                ><md-icon style="margin-right: 10px">email</md-icon-->
              <!--                ><span class="md-list-item-text"-->
              <!--                  >Apply Accreditation</span-->
              <!--                ></md-list-item-->
              <!--              >-->
              <md-list-item to="/UserRegister_SUC"
                ><md-icon style="margin-right: 10px">account_circle</md-icon
                ><span class="md-list-item-text"
                  >Manage Users</span
                ></md-list-item
              >
              <md-list-item to="/AccreditorRegister_SUC"
                ><md-icon style="margin-right: 10px"
                  >supervised_user_circle</md-icon
                ><span class="md-list-item-text"
                  >Manage Accreditors</span
                ></md-list-item
              >
              <md-list-item to="/ManageOffice"
                ><md-icon style="margin-right: 10px">business_center</md-icon
                ><span class="md-list-item-text"
                  >Manage Offices</span
                ></md-list-item
              >
              <md-list-item to="/ManageProgram"
                ><md-icon style="margin-right: 10px">source</md-icon
                ><span class="md-list-item-text"
                  >Manage Programs</span
                ></md-list-item
              >
              <md-list-item to="/ManageInstrumentProgram"
                ><md-icon style="margin-right: 10px">create</md-icon
                ><span class="md-list-item-text"
                  >Manage Instrument</span
                ></md-list-item
              >
              <md-list-item to="/ManageDocumentTemplate"
                ><md-icon style="margin-right: 10px">upload_file</md-icon
                ><span class="md-list-item-text"
                  >Document Template</span
                ></md-list-item
              >
            </b-collapse>
            <md-divider />
          </div>

          <!--Accreditor-->
          <div v-if="checkRole(8)">
            <md-list-item
              :class="collapse3 ? null : 'collapsed'"
              :aria-expanded="collapse3 ? 'true' : 'false'"
              aria-controls="collapse-3"
              @click="collapse3 = !collapse3"
              class="md-transparent md-dense"
              style="font-size: 16px; font-weight: bold; outline: none !important"
            >
              <div v-if="!menuVisible" style="margin-right: 25px">
                <md-icon v-if="collapse5">expand_less</md-icon>
                <md-icon v-else>expand_more</md-icon>
              </div>
              <div class="md-toolbar-section-start">ACCREDITOR</div>
              <div
                class="md-toolbar-section-end"
                style="max-width: max-content"
              >
                <md-icon class="md-dense" v-if="collapse3">expand_less</md-icon>
                <md-icon class="md-dense" v-else>expand_more</md-icon>
              </div>
            </md-list-item>
            <b-collapse id="collapse-3" v-model="collapse3" style="width: 100%">
              <md-list-item to="/AccreditationRequests"
                ><md-icon style="margin-right: 10px">email</md-icon
                ><span class="md-list-item-text"
                  >AACCUP Requests</span
                ></md-list-item
              >
              <!-- <md-list-item to="/AccreditationApplication"
                ><md-icon style="margin-right: 10px">monitor</md-icon
                ><span class="md-list-item-text"
                  >Overall Coordinator</span
                ></md-list-item
              > -->
              <md-list-item to="/AccreditationTask"
                ><md-icon style="margin-right: 10px">description</md-icon
                ><span class="md-list-item-text"
                  >AACCUP Accreditation</span
                ></md-list-item
              >
              <md-list-item to="/InternalAccreditationTask"
                ><md-icon style="margin-right: 10px">home_work</md-icon
                ><span class="md-list-item-text"
                  >SUC Self Survey</span
                ></md-list-item
              >
            </b-collapse>
            <md-divider />
          </div>

          <!--Support Office-->
          <div v-if="checkRole(3) || checkRole(4)">
            <md-list-item
              :class="collapse4 ? null : 'collapsed'"
              :aria-expanded="collapse4 ? 'true' : 'false'"
              aria-controls="collapse-4"
              @click="collapse4 = !collapse4"
              class="md-transparent md-dense"
              style="font-size: 16px; font-weight: bold; outline: none !important"
            >
              <div v-if="!menuVisible" style="margin-right: 25px">
                <md-icon v-if="collapse5">expand_less</md-icon>
                <md-icon v-else>expand_more</md-icon>
              </div>
              <div v-if="checkRole(3)" class="md-toolbar-section-start">
                SUPPORT OFFICE HEAD
              </div>
              <div v-else-if="checkRole(4)" class="md-toolbar-section-start">
                SUPPORT OFFICE MEMBER
              </div>
              <div
                class="md-toolbar-section-end"
                style="max-width: max-content"
              >
                <md-icon class="md-dense" v-if="collapse4">expand_less</md-icon>
                <md-icon class="md-dense" v-else>expand_more</md-icon>
              </div>
            </md-list-item>
            <b-collapse id="collapse-4" v-model="collapse4" style="width: 100%">
              <md-list-item to="/ManageSupportUploads"
                ><md-icon style="margin-right: 10px">archive</md-icon
                ><span class="md-list-item-text"
                  >Manage Documents</span
                ></md-list-item
              >
              <md-list-item to="/ManageBestPractice"
                ><md-icon style="margin-right: 10px">description</md-icon
                ><span class="md-list-item-text"
                  >Manage Best Practice</span
                ></md-list-item
              >
            </b-collapse>
            <md-divider />
          </div>

          <!--Task Force-->
          <div v-if="checkRole(2) || checkRole(11) || checkRole(1)">
            <md-list-item
              :class="collapse5 ? null : 'collapsed'"
              :aria-expanded="collapse5 ? 'true' : 'false'"
              aria-controls="collapse-5"
              @click="collapse5 = !collapse5"
              class="md-transparent md-dense"
              style="font-size: 16px; font-weight: bold; outline: none !important"
            >
              <div v-if="!menuVisible" style="margin-right: 25px">
                <md-icon v-if="collapse5">expand_less</md-icon>
                <md-icon v-else>expand_more</md-icon>
              </div>
              <div v-if="checkRole(11)" class="md-toolbar-section-start">
                COLLEGE TASK FORCE HEAD
              </div>
              <div v-else-if="checkRole(2)" class="md-toolbar-section-start">
                PROGRAM TASK FORCE CHAIR
              </div>
              <div v-else-if="checkRole(1)" class="md-toolbar-section-start">
                TASK FORCE MEMBER
              </div>
              <div
                class="md-toolbar-section-end"
                style="max-width: max-content"
              >
                <md-icon class="md-dense" v-if="collapse5">expand_less</md-icon>
                <md-icon class="md-dense" v-else>expand_more</md-icon>
              </div>
            </md-list-item>
            <b-collapse id="collapse-5" v-model="collapse5" style="width: 100%">
              <md-list-item
                to="/TaskForceHeadTask"
                v-if="checkRole(2) || checkRole(11)"
                class="md-primary"
                ><md-icon style="margin-right: 10px">monitor</md-icon
                ><span class="md-list-item-text"
                  >Task Overview</span
                ></md-list-item
              >
              <md-list-item
                to="/TaskForceTask"
                v-if="checkRole(2) || checkRole(1)"
                ><md-icon style="margin-right: 10px">unarchive</md-icon
                ><span class="md-list-item-text">My Tasks</span></md-list-item
              >
              <md-list-item
                to="/TaskForceRegister"
                v-if="checkRole(2) || checkRole(11)"
                ><md-icon style="margin-right: 10px"
                  >supervised_user_circle</md-icon
                ><span class="md-list-item-text"
                  >Manage Task Force</span
                ></md-list-item
              >
              <md-list-item
                to="/ManageTaskUploads"
                v-if="
                  this.offices.filter(
                    data =>
                      data.role_id === 1 ||
                      data.role_id === 2 ||
                      data.role_id === 11
                  )
                "
                ><md-icon style="margin-right: 10px">archive</md-icon
                ><span class="md-list-item-text"
                  >Manage Documents</span
                ></md-list-item
              >
              <md-list-item
                to="/ManageTaskBestPractice"
                v-if="
                  this.offices.filter(
                    data =>
                      data.role_id === 1 ||
                      data.role_id === 2 ||
                      data.role_id === 11
                  )
                "
                ><md-icon style="margin-right: 10px">description</md-icon
                ><span class="md-list-item-text"
                  >Manage Best Practice</span
                ></md-list-item
              >
            </b-collapse>
            <md-divider />
          </div>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <!--Tabs-->
        <md-tabs
          md-sync-route
          md-elevation="1"
          style="position: sticky; top: 0; z-index: 99; margin-bottom: 20px"
        >
          <div v-for="(item, index) in tabList" :key="index">
            <md-tab :md-label="item.name" :to="checkLink(item)"></md-tab>
          </div>
        </md-tabs>

        <!--Change Campus-->
        <b-modal v-model="changeSUC" size="lg" hide-footer>
          <template #modal-header>
            <h5>Change Campus</h5>
          </template>
          <multiselect
            v-model="campusSelect"
            :options="campusList"
            :custom-label="campusName"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="createUser-9" v-model="campusSelect" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in campusList"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ item.campus_name }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
          <md-card-actions>
            <div>
              <md-button class="md-primary" @click="changeSUC = false"
                >Cancel</md-button
              >
            </div>
            <div>
              <md-button
                class="md-primary"
                @click="
                  storeCampus();
                  changeSUC = false;
                "
                >Change</md-button
              >
            </div>
          </md-card-actions>
        </b-modal>

        <!--Reschedule-->
        <b-modal v-model="rescheduleApplication" size="lg" hide-footer>
          <template #modal-header>
            <h5>Reschedule Program</h5>
          </template>
          {{ notification.content }}
          <md-card-actions>
            <div>
              <md-button
                class="md-primary"
                @click="
                  declineReschedule();
                  rescheduleApplication = false;
                "
                >Decline</md-button
              >
            </div>
            <div>
              <md-button
                class="md-primary"
                @click="
                  acceptReschedule();
                  rescheduleApplication = false;
                "
                >Accept</md-button
              >
            </div>
          </md-card-actions>
        </b-modal>

        <!--Response-->
        <b-modal v-model="rescheduleResponse" size="lg" hide-footer>
          <template #modal-header>
            <h5>Reschedule Program</h5>
          </template>
          {{ notification.content }}
          <md-card-actions>
            <div>
              <md-button
                class="md-primary"
                @click="
                  deleteNotification();
                  rescheduleResponse = false;
                "
                >Done</md-button
              >
            </div>
          </md-card-actions>
        </b-modal>

        <!--        <RescheduleApplication-->
        <!--          :notification="notification.notification"-->
        <!--          :details="notification.details"-->
        <!--        />-->
        <!--        <RescheduleResponse-->
        <!--          :notification="notification.notification"-->
        <!--          :details="notification.details"-->
        <!--        />-->
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

// const toLower = text => {
//   return text.toString().toLowerCase();
// };

export default {
  name: "app",
  data() {
    return {
      menuTitle: null,
      menuVisible: true,
      rescheduleApplication: false,
      rescheduleResponse: false,
      changeSUC: false,
      tabList: [],
      notifications: [],
      notification: {},
      details: {},
      campusList: [],
      campusSelect: [],
      collapse1: false,
      collapse2: false,
      collapse3: false,
      collapse4: false,
      collapse5: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      role: "role",
      taskHead: "taskHead",
      accreditor: "accreditor",
      uploader: "uploader",
      offices: "offices",
      program: "program",
      instrument: "instrument",
      parameter: "parameter"
    })
  },
  watch: {
    $route() {
      this.tabList = this.$route.meta.tab;
      this.$store
        .dispatch("showAllNotification", this.user.id)
        .then(result => {
          this.notifications = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    collapse1() {
      if (this.collapse1 === true) {
        this.collapse2 = false;
        this.collapse3 = false;
        this.collapse4 = false;
        this.collapse5 = false;
      }
    },
    collapse2() {
      if (this.collapse2 === true) {
        this.collapse1 = false;
        this.collapse3 = false;
        this.collapse4 = false;
        this.collapse5 = false;
      }
    },
    collapse3() {
      if (this.collapse3 === true) {
        this.collapse1 = false;
        this.collapse2 = false;
        this.collapse4 = false;
        this.collapse5 = false;
      }
    },
    collapse4() {
      if (this.collapse4 === true) {
        this.collapse1 = false;
        this.collapse2 = false;
        this.collapse3 = false;
        this.collapse5 = false;
      }
    },
    collapse5() {
      if (this.collapse5 === true) {
        this.collapse1 = false;
        this.collapse2 = false;
        this.collapse3 = false;
        this.collapse4 = false;
      }
    }
  },
  methods: {
    setUserCampus() {
      this.$store.dispatch("checkUser").then(result => {
        this.campusList = result.data.campus;
      });
    },
    storeCampus() {
      this.$store.commit("STORE_CAMPUS", this.campusSelect);
      this.$store
        .dispatch("checkUser")
        .then(result => {
          this.$store.commit("STORE_USER", result.data);
          if (this.checkRole(9) || this.checkRole(10))
            this.$router.push("/ManageApplication");
          else if (this.checkRole(8))
            this.$router.push("/AccreditationRequests");
          else if (this.checkRole(7))
            this.$router.push("/InternalAccreditationTask");
          else if (this.checkRole(5) || this.checkRole(6))
            this.$router.push("/PlanAccreditation");
          else if (this.checkRole(3) || this.checkRole(4))
            this.$router.push("/ManageSupportUploads");
          else if (this.checkRole(2) || this.checkRole(11))
            this.$router.push("/TaskForceHeadTask");
          else if (this.checkRole(1)) this.$router.push("/TaskForceTask");
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    manageAccount() {
      let user = this.user;
      let userEntry = 1;
      this.$store.commit("saveUserAccount", { user, userEntry });
      this.$store.commit("saveAccountID", this.user.id);
      if (this.checkRole(8)) {
        this.$router.push("/accreditorProfile");
      } else {
        this.$router.push("/Profile");
      }
    },
    setRole(role) {
      if (role === 1) return "TASK FORCE MEMBER";
      else if (role === 2) return "TASK FORCE HEAD";
      else if (role === 3) return "SUPPORT OFFICE HEAD";
      else if (role === 4) return "SUPPORT OFFICE MEMBER";
      else if (role === 5) return "QA OFFICE HEAD";
      else if (role === 6) return "QA OFFICE MEMBER";
      else if (role === 7) return "ACCREDITOR";
      else if (role === 8) return "ACCREDITOR";
      else if (role === 9) return "AACCUP STAFF";
      else if (role === 10) return "AACCUP BOARD MEMBER";
    },
    checkRole(role) {
      if (
        (role === 1 ||
          role === 2 ||
          role === 3 ||
          role === 4 ||
          role === 5 ||
          role === 6 ||
          role === 11) &&
        this.offices?.length
      )
        return !!this.offices.find(item => item.role_id === role);
      else if (
        (role === 7 || role === 8 || role === 9 || role === 10) &&
        this.role?.length
      )
        return !!this.role.find(item => item.role_id === role);
    },
    makeToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    },
    // checkLevel() {
    //   return !!(
    //     this.program.level.includes("Level III") ||
    //     this.program.level.includes("Level IV")
    //   );
    // },
    // checkName(item) {
    //   if (item.name === "Areas") {
    //     if (
    //       this.$route.name === "AccreditationArea" ||
    //       this.$route.name === "TaskForceArea" ||
    //       this.$route.name === "ManageInstrument"
    //     )
    //       return item.name;
    //     else if (this.instrument.area_number === 1) {
    //       if (this.checkLevel()) return "Areas - Instruction";
    //       else return "Areas - Area I";
    //     } else if (this.instrument.area_number === 2) {
    //       if (this.checkLevel()) return "Areas - Extension";
    //       else return "Areas - Area II";
    //     } else if (this.instrument.area_number === 3) {
    //       if (this.checkLevel()) return "Areas - Research";
    //       else return "Areas - Area III";
    //     } else if (this.instrument.area_number === 4) {
    //       if (this.checkLevel()) return "Areas - Faculty";
    //       else return "Areas - Area IV";
    //     } else if (this.instrument.area_number === 5) {
    //       if (this.checkLevel()) return "Areas - Licensure Exam";
    //       else return "Areas - Area V";
    //     } else if (this.instrument.area_number === 6) {
    //       if (this.checkLevel()) return "Areas - Consortia or Linkage";
    //       else return "Areas - Area VI";
    //     } else if (this.instrument.area_number === 7) {
    //       if (this.checkLevel()) return "Areas - Library";
    //       else return "Areas - Area VII";
    //     } else if (this.instrument.area_number === 8)
    //       return "Areas - Area VIII";
    //     else if (this.instrument.area_number === 9) return "Areas - Area IX";
    //     else if (this.instrument.area_number === 10) return "Areas - Area X";
    //   } else if (item.name === "Parameters") {
    //     if (
    //       this.$route.name === "AccreditationParameter" ||
    //       this.$route.name === "TaskForceParameter" ||
    //       this.$route.name === "ManageParameters"
    //     )
    //       return item.name;
    //     else if (toLower(this.parameter.parameter).includes("parameter a"))
    //       return "Parameters - Parameter A";
    //     else if (toLower(this.parameter.parameter).includes("parameter b"))
    //       return "Parameters - Parameter B";
    //     else if (toLower(this.parameter.parameter).includes("parameter c"))
    //       return "Parameters - Parameter C";
    //     else if (toLower(this.parameter.parameter).includes("parameter d"))
    //       return "Parameters - Parameter D";
    //     else if (toLower(this.parameter.parameter).includes("parameter e"))
    //       return "Parameters - Parameter E";
    //     else if (toLower(this.parameter.parameter).includes("parameter f"))
    //       return "Parameters - Parameter F";
    //     else if (toLower(this.parameter.parameter).includes("parameter g"))
    //       return "Parameters - Parameter G";
    //     else if (toLower(this.parameter.parameter).includes("parameter h"))
    //       return "Parameters - Parameter H";
    //     else if (toLower(this.parameter.parameter).includes("parameter i"))
    //       return "Parameters - Parameter I";
    //     else if (toLower(this.parameter.parameter).includes("parameter j"))
    //       return "Parameters - Parameter J";
    //     else if (toLower(this.parameter.parameter).includes("parameter k"))
    //       return "Parameters - Parameter K";
    //     else if (toLower(this.parameter.parameter).includes("parameter l"))
    //       return "Parameters - Parameter L";
    //     else if (toLower(this.parameter.parameter).includes("parameter m"))
    //       return "Parameters - Parameter M";
    //     else if (toLower(this.parameter.parameter).includes("parameter n"))
    //       return "Parameters - Parameter N";
    //     else if (toLower(this.parameter.parameter).includes("parameter o"))
    //       return "Parameters - Parameter O";
    //     else if (toLower(this.parameter.parameter).includes("parameter p"))
    //       return "Parameters - Parameter P";
    //     else if (toLower(this.parameter.parameter).includes("parameter q"))
    //       return "Parameters - Parameter Q";
    //     else if (toLower(this.parameter.parameter).includes("parameter r"))
    //       return "Parameters - Parameter R";
    //     else if (toLower(this.parameter.parameter).includes("parameter s"))
    //       return "Parameters - Parameter S";
    //     else return item.name;
    //   } else return item.name;
    // },
    checkLink(item) {
      if (item.link === "TaskForce") {
        if (this.taskHead === 0) return "/TaskForceHeadTask";
        if (this.taskHead === 1) return "/TaskForceTask";
      } else if (item.link === "Accreditor") {
        if (this.accreditor === 0) return "/AccreditationTask";
        if (this.accreditor === 1) return "/InternalAccreditationTask";
      } else if (item.link === "ManageUploads") {
        if (this.uploader === 0) return "/ManageSupportUploads";
        if (this.uploader === 1) return "/ManageTaskUploads";
      } else return item.link;
    },
    selectNotification(item) {
      if (item.notif_type === "declined schedule") {
        this.rescheduleApplication = true;
      } else if (
        item.notif_type === "accepted reschedule" ||
        item.notif_type === "declined reschedule"
      ) {
        this.rescheduleResponse = true;
      }
    },
    showNotification(id) {
      this.$store
        .dispatch("viewNotification", id)
        .then(result => {
          this.notification = result.data.notification;
          this.details = result.data.details;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    acceptReschedule() {
      let request_id = this.notification.id;
      let user_id = this.user.id;
      let message = `${
        this.details.institution_name
      } has accepted the new schedule on ${moment(
        this.details.preferred_start_date
      ).format("MMM Do")} to ${moment(this.details.preferred_end_date).format(
        "MMM Do YYYY"
      )} for the program ${this.details.program_name}.`;
      let decision = "accepted";
      this.$store
        .dispatch("acceptDeclineReschedule", {
          request_id,
          user_id,
          message,
          decision
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("deleteNotification", this.notification.id)
              .then(() => {
                let index = this.notifications.findIndex(
                  data => data.id === this.notification.id
                );
                this.notifications.splice(index, 1);
              });
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    declineReschedule() {
      let request_id = this.notification.id;
      let user_id = this.user.id;
      let message = `${
        this.details.institution_name
      } has declined the new schedule on ${moment(
        this.details.preferred_start_date
      ).format("MMM Do")} to ${moment(this.details.preferred_end_date).format(
        "MMM Do YYYY"
      )} for the program ${this.details.program_name}.`;
      let decision = "declined";
      this.$store
        .dispatch("acceptDeclineReschedule", {
          request_id,
          user_id,
          message,
          decision
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("deleteNotification", this.notification.id)
              .then(() => {
                let index = this.notifications.findIndex(
                  data => data.id === this.notification.id
                );
                this.notifications.splice(index, 1);
              });
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    deleteNotification() {
      this.$store
        .dispatch("deleteNotification", this.notification.id)
        .then(() => {
          let index = this.notifications.findIndex(
            data => data.id === this.notification.id
          );
          this.notifications.splice(index, 1);
        });
    },
    campusName({ campus_name }) {
      return `${campus_name}`;
    },
    setDate(date) {
      return moment(date).format("MM/DD/YYYY");
    }
  },
  created() {
    this.setUserCampus();
    this.menuTitle = this.setRole(this.role[0].role_id);

    if (this.$route.path === "/ManageApplication") {
      this.collapse1 = true;
    } else if (this.$route.path === "/PlanAccreditation") {
      this.collapse2 = true;
    } else if (this.$route.path === "/AccreditationRequests") {
      this.collapse3 = true;
    } else if (this.$route.path === "/ManageSupportUploads") {
      this.collapse4 = true;
    } else if (
      this.$route.path === "/TaskForceHeadTask" ||
      this.$route.path === "/TaskForceTask"
    ) {
      this.collapse5 = true;
    }

    if (window.innerWidth >= 768) {
      this.menuVisible = true;
    } else {
      this.menuVisible = false;
    }

    this.tabList = this.$route.meta.tab;
    this.$store
      .dispatch("showAllNotification", this.user.id)
      .then(result => {
        this.notifications = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
  }
};
</script>

<style lang="scss">
.full-height {
  height: 100vh;
}

.md-drawer {
  width: 225px;
  @media (max-width: 900px) {
    width: 200px;
  }
}

.md-drawer .md-list .md-list-item-container {
  font-size: 13px !important;
  text-transform: uppercase;
  font-weight: bold;
  @media (max-width: 900px) {
    font-size: 12px !important;
  }
  .md-toolbar-section-start {
    font-size: 14px !important;
  }
}

.md-tabs-navigation .md-button-content {
  font-size: 14px !important;
  font-weight: bold !important;
  @media (max-width: 900px) {
    font-size: 12px !important;
  }
}

.md-app-content {
  background-color: #eeeeee !important;
  padding: 0 0 20px;
}
</style>
