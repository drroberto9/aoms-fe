<template>
  <div>
    <!--Edit Password-->
    <b-modal id="app" v-model="editInformation" size="xl" hide-footer>
      <template #modal-header>
        <h5>Edit Personal Information</h5>
      </template>
      <form @submit.prevent="edit">
        <h6>Basic Info</h6>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Gender:
          </div>
          <div class="md-layout-item">
            <b-form-select v-model="gender">
              <b-form-select-option :value="null"
                >Select Gender</b-form-select-option
              >
              <b-form-select-option value="Male">Male</b-form-select-option>
              <b-form-select-option value="Female">Female</b-form-select-option>
            </b-form-select>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Civil Status:
          </div>
          <div class="md-layout-item">
            <b-form-select v-model="civil_status">
              <b-form-select-option :value="null"
                >Select Civil Status</b-form-select-option
              >
              <b-form-select-option value="Single">Single</b-form-select-option>
              <b-form-select-option value="Married"
                >Married</b-form-select-option
              >
              <b-form-select-option value="Divorced"
                >Divorced</b-form-select-option
              >
              <b-form-select-option value="Widowed"
                >Widowed</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Date of Birth:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="birthdate" type="date"></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Place of Birth:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="place_of_birth"
              placeholder="Enter birth place"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Nationality:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="nationality"
              placeholder="Enter nationality"
              type="text"
            ></b-form-input>
          </div>
        </div>

        <br />

        <h6>Address</h6>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Current Address:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="current_address"
              placeholder="Enter current address"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Home Address:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="home_address"
              placeholder="Enter home address"
              type="text"
            ></b-form-input>
          </div>
        </div>

        <br />

        <h6>Contact Info</h6>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Telephone Number:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="telephone_no"
              placeholder="Enter telephone number"
              type="number"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Mobile Number:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="contact_no"
              placeholder="Enter mobile number"
              type="number"
              required
            ></b-form-input>
          </div>
        </div>

        <br />

        <h6>Government Issued ID</h6>
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            Government Issued ID:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="government_id_type"
              placeholder="Enter gov't issued ID"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            ID Number:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="id_number"
              placeholder="Enter ID number"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Date of Issuance:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="date_of_issuance" type="date"></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Place of Issuance:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="place_of_issuance"
              placeholder="Enter place of issuance"
              type="text"
            ></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editInformation = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px; margin: 0">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item"><h5>Personal Information</h5></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              setInput();
              editInformation = true;
            "
            >Edit</md-button
          >
        </div>
      </div>
      <h6>Basic Info</h6>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Gender:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.gender"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Civil Status:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.civil_status"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Date of Birth:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.birthdate"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Place of Birth:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.place_of_birth"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Nationality:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.nationality"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>

      <br />

      <h6>Address</h6>
      <div class="md-layout">
        <div class="md-layout-item" style="max-width: 200px">
          Current Address:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.current_address"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Home Address:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.home_address"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>

      <br />

      <h6>Contact Info</h6>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Telephone Number:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.telephone_no"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Mobile Number:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.contact_no"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>

      <br />

      <h6>Government Issued ID</h6>
      <div class="md-layout">
        <div class="md-layout-item" style="max-width: 200px">
          Government Issued ID:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.government_id_type"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          ID Number:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.id_number"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Date of Issuance:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.date_of_issuance"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Place of Issuance:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.place_of_issuance"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PersonalInfo",
  data() {
    return {
      profile: [],
      gender: null,
      civil_status: null,
      place_of_birth: null,
      nationality: null,
      birthdate: null,
      current_address: null,
      home_address: null,
      telephone_no: null,
      contact_no: null,
      government_id_type: null,
      id_number: null,
      date_of_issuance: null,
      place_of_issuance: null,
      editInformation: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      account_id: "account_id"
    })
  },
  methods: {
    makeToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    },
    setInput() {
      this.gender = this.profile.gender;
      this.civil_status = this.profile.civil_status;
      this.place_of_birth = this.profile.place_of_birth;
      this.nationality = this.profile.nationality;
      this.birthdate = this.profile.birthdate;
      this.current_address = this.profile.current_address;
      this.home_address = this.profile.home_address;
      this.telephone_no = this.profile.telephone_no;
      this.contact_no = this.profile.contact_no;
      this.government_id_type = this.profile.government_id_type;
      this.id_number = this.profile.id_number;
      this.date_of_issuance = this.profile.date_of_issuance;
      this.place_of_issuance = this.profile.place_of_issuance;
    },
    edit() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let gender = this.gender;
      let civil_status = this.civil_status;
      let place_of_birth = this.place_of_birth;
      let nationality = this.nationality;
      let birthdate = this.birthdate;
      let current_address = this.current_address;
      let home_address = this.home_address;
      let telephone_no = this.telephone_no;
      let contact_no = this.contact_no;
      let government_id_type = this.government_id_type;
      let id_number = this.id_number;
      let date_of_issuance = this.date_of_issuance;
      let place_of_issuance = this.place_of_issuance;
      this.$store
        .dispatch("savePersonalInfo", {
          user_id,
          gender,
          civil_status,
          place_of_birth,
          nationality,
          birthdate,
          current_address,
          home_address,
          telephone_no,
          contact_no,
          government_id_type,
          id_number,
          date_of_issuance,
          place_of_issuance
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showPersonalInfo", this.account_id)
              .then(result => {
                this.profile = result.data.user;
              });
            this.editInformation = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showPersonalInfo", this.account_id)
      .then(result => {
        this.profile = result.data.user;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>

<style lang="scss" scoped>
input:disabled {
  background: white !important;
}
</style>
