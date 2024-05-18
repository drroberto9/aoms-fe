<template>
  <div>
    <b-modal id="app" v-model="createUser" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create User</h5>
      </template>
      <form @submit.prevent="submit">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-1"
              label="*First Name:"
              label-for="createUser-1"
            >
              <b-form-input
                id="createUser-1"
                v-model="first_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createUser-group-2"
              label="MI:"
              label-for="createUser-2"
            >
              <b-form-input
                id="createUser-2"
                v-model="middle_initial"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-3"
              label="*Last Name:"
              label-for="createUser-3"
            >
              <b-form-input
                id="createUser-3"
                v-model="last_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createUser-group-4"
              label="Ext:"
              label-for="createUser-4"
            >
              <b-form-input
                id="createUser-4"
                v-model="name_extension"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-5"
              label="*Email:"
              label-for="createUser-5"
            >
              <b-form-input
                id="createUser-5"
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-6"
              label="*Contact Number:"
              label-for="createUser-6"
            >
              <b-form-input
                id="createUser-6"
                v-model="contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createUser-group-7"
          label="*Password:"
          label-for="createUser-7"
        >
          <b-input-group>
            <b-form-input
              id="createUser-7"
              v-model="password"
              type="password"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="password = 'password'"
                >Default</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="createUser-group-8"
          label="*Role:"
          label-for="createUser-8"
        >
          <multiselect
            v-model="role"
            :options="options"
            :custom-label="roleText"
            :placeholder="null"
            required
          ></multiselect>
          <!--              <b-form-select-->
          <!--                id="createUser-8"-->
          <!--                v-model="role"-->
          <!--                :options="options"-->
          <!--                required-->
          <!--              ></b-form-select>-->
        </b-form-group>

        <b-form-group
          id="createUser-group-9"
          label="*Office:"
          label-for="createUser-9"
        >
          <multiselect
            v-model="officeSelect"
            :options="officeList"
            :custom-label="officeName"
            :placeholder="null"
            required
          ></multiselect>
          <!--              <b-form-select id="createUser-9" v-model="officeSelect" required>-->
          <!--                <option-->
          <!--                  v-for="(item, index) in officeList"-->
          <!--                  :key="index"-->
          <!--                  :value="item"-->
          <!--                >-->
          <!--                  {{ item.office_name }}-->
          <!--                </option>-->
          <!--              </b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="createUser = false"
            >Cancel</md-button
          >
          <md-button
            v-if="checkSupportHead()"
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              officeHead = 0;
              createUser = false;
              officeHeadPrompt = true;
            "
            >Submit</md-button
          >
          <md-button
            v-else
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <b-modal id="app" v-model="editUser" size="lg" hide-footer>
      <template #modal-header>
        <h5>Add Role</h5>
      </template>
      <form @submit.prevent="addRole(user.user_id)">
        <b-form-group
          id="editUser-group-1"
          label="Role:"
          label-for="editUser-1"
        >
          <multiselect
            v-model="role"
            :options="options"
            :custom-label="roleText"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="editUser-1" v-model="role" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in options"-->
          <!--              :key="index"-->
          <!--              :value="item.value"-->
          <!--              >{{ item.text }}</option-->
          <!--            >-->
          <!--          </b-form-select>-->
        </b-form-group>

        <div>
          <b-form-group
            id="editUser-group-2"
            label="Office:"
            label-for="editUser-2"
          >
            <multiselect
              v-model="officeSelect"
              :options="officeList"
              :custom-label="officeName"
              :placeholder="null"
              required
            ></multiselect>
            <!--            <b-form-select id="editUser-2" v-model="officeSelect" required>-->
            <!--              <option-->
            <!--                v-for="(item, index) in officeList"-->
            <!--                :key="index"-->
            <!--                :value="item"-->
            <!--              >-->
            <!--                {{ item.office_name }}-->
            <!--              </option>-->
            <!--            </b-form-select>-->
          </b-form-group>
        </div>

        <md-card-actions>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="editUser = false"
            >Cancel</md-button
          >
          <md-button
            v-if="checkSupportHead()"
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              officeHead = 1;
              editUser = false;
              officeHeadPrompt = true;
            "
            >Add</md-button
          >
          <md-button
            v-else
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Add</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <b-modal id="app" v-model="addOffice" size="lg" hide-footer>
      <template #modal-header>
        <h5>Add Office</h5>
      </template>
      <form @submit.prevent="addToOffice()">
        <b-form-group
          id="addOffice-group-1"
          label="Office:"
          label-for="addOffice-1"
        >
          <multiselect
            v-model="officeSelect"
            :options="officeList"
            :custom-label="officeName"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="addOffice-1" v-model="officeSelect" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in officeList"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ item.office_name }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="addOffice = false"
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

    <b-modal id="app" v-model="activatePrompt">
      <template #modal-header>
        <h5>Activate User</h5>
      </template>
      Are you sure you want to activate this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="activatePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              activateUser();
              activatePrompt = false;
            "
            >Activate</md-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Deactivate User</h5>
      </template>
      Are you sure you want to deactivate this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deletePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              deleteUser();
              deletePrompt = false;
            "
            >Deactivate</md-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal id="app" v-model="deleteRolePrompt">
      <template #modal-header>
        <h5>Remove Role</h5>
      </template>
      Are you sure you want to remove this role?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteRolePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeRole();
              deleteRolePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal id="app" v-model="deleteOfficePrompt">
      <template #modal-header>
        <h5>Remove Office</h5>
      </template>
      Are you sure you want to remove this office?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteOfficePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeOffice();
              deleteOfficePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Accreditor Prompt-->
    <b-modal id="app" v-model="existingAccreditorPrompt">
      <template #modal-header>
        <h5>Existing User</h5>
      </template>
      {{ concatName(user) }} already exist as an Accreditor. Do you want to add
      the role {{ this.role }}?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="existingAccreditorPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="addRole(user.id)"
            >Proceed</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Campus Prompt-->
    <b-modal id="app" v-model="existingCampusPrompt" size="lg">
      <template #modal-header>
        <h5>Existing User</h5>
      </template>
      <div>
        {{ concatName(user) }} already exist in the following campus/es:
      </div>
      <br />
      <div v-for="(item, index) in campusList" :key="index">
        {{ item.campus_name }}
      </div>
      <br />
      <div>Do you want to register {{ concatName(user) }} to this campus?</div>
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="existingCampusPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="addToOtherCampus()"
            >Proceed</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Office Head-->
    <b-modal id="app" v-model="officeHeadPrompt">
      <template #modal-header>
        <h5>Existing Office Head</h5>
      </template>
      The office you have selected already has an assigned office head. Do you
      want to procced with the role of office staff?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              officeHeadPrompt = false;
              officeHead === 0 ? (createUser = true) : (editUser = true);
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="officeHead === 0 ? submit() : addRole(user.user_id)"
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Application-->
    <b-modal id="app" v-model="createUserPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous user registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              first_name = null;
              last_name = null;
              middle_initial = null;
              name_extension = null;
              email = null;
              contact_no = null;
              password = null;
              role = null;
              officeSelect = null;
              createUserPrompt = false;
              createUser = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createUserPrompt = false;
              createUser = true;
            "
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ campus.institution_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
          <h5>List of Users</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: 65px">
              <b-form-select v-model="perPage" class="mb-3">
                <b-form-select-option :value="5">5</b-form-select-option>
                <b-form-select-option :value="10">10</b-form-select-option>
                <b-form-select-option :value="20">20</b-form-select-option>
              </b-form-select>
            </div>
            <div class="md-layout-item" style="max-width: 330px">
              <b-form-input
                placeholder="Search User"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 200px; margin: 0;"
                class="md-primary md-raised"
                @click="continueCreateUser()"
                >Add User</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="users"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(name)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(role)="row">
          <div class="md-layout">
            <div class="md-layout-item">
              <b-form-tags style="border: none" add-on-change no-outer-focus>
                <template>
                  <div>
                    <span
                      v-for="(item, index) in row.item.office_roles"
                      :key="index"
                    >
                      <b-form-tag
                        @remove="
                          user = row.item;
                          roleSelect = item;
                          deleteRolePrompt = true;
                        "
                        variant="primary"
                      >
                        {{
                          item.role.includes("external")
                            ? "accreditor"
                            : item.role
                        }}
                        {{
                          item.office_name ? "(" + item.office_name + ")" : ""
                        }}
                      </b-form-tag>
                    </span>
                  </div>
                </template>
              </b-form-tags>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Assign Task"
                class="md-icon-button md-dense md-primary"
                @click="
                  user = row.item;
                  role = null;
                  officeSelect = null;
                  editUser = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
            </div>
          </div>

          <!-- <div class="md-layout" v-if="!roleEdit[row.index].status">
            <div class="md-layout-item">
              <span
                v-for="(item, index) in row.item.office_roles"
                :key="index"
              >
                {{ item.role.includes("external") ? "accreditor" : item.role }}
                {{ item.office_name ? "(" + item.office_name + ")" : "" }}
                <a v-if="row.item.office_roles[index + 1]">,</a>
              </span>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="roleEdit[row.index].status = true"
                ><md-icon>edit</md-icon></md-button
              >
            </div>
          </div>
          <div class="md-layout" v-if="roleEdit[row.index].status">
            <div class="md-layout-item">
              <span
                v-for="(item, index) in row.item.office_roles"
                :key="index"
              >
                {{ item.role.includes("external") ? "accreditor" : item.role }}
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="
                    user = row.item;
                    roleSelect = item;
                    deleteRolePrompt = true;
                  "
                  ><md-icon>close</md-icon></md-button
                >
                <a v-if="row.item.office_roles[index + 1]">,</a>
              </span>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Assign Task"
                class="md-icon-button md-dense md-primary"
                @click="
                  user = row.item;
                  role = null;
                  officeSelect = null;
                  editUser = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Close Edit"
                class="md-icon-button md-dense md-accent"
                @click="roleEdit[row.index].status = false"
                ><md-icon>edit</md-icon></md-button
              >
            </div>
          </div> -->
        </template>

        <!--        <template #cell(office)="row">-->
        <!--          <div class="md-layout" v-if="checkOffice(row.item)">-->
        <!--            <div-->
        <!--              v-for="(item, index) in row.item.office_roles"-->
        <!--              :key="index"-->
        <!--            >-->
        <!--              {{ item.office_name }}-->
        <!--              <div class="md-layout-item" style="max-width: max-content">-->
        <!--                <md-button-->
        <!--                  v-b-tooltip.hover-->
        <!--                  title="Delete"-->
        <!--                  class="md-icon-button md-dense md-accent"-->
        <!--                  @click="-->
        <!--                    officeSelect = item;-->
        <!--                    deleteOfficePrompt = true;-->
        <!--                  "-->
        <!--                  ><md-icon>close</md-icon></md-button-->
        <!--                >-->
        <!--                <a v-if="row.item.office_roles[index + 1]">,</a>-->
        <!--              </div>-->

        <!--              &lt;!&ndash;            <div class="md-layout-item">&ndash;&gt;-->
        <!--              &lt;!&ndash;              {{ row.item.office_roles.office_name }}&ndash;&gt;-->
        <!--              &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--              &lt;!&ndash;            <div class="md-layout-item" style="max-width: max-content">&ndash;&gt;-->
        <!--              &lt;!&ndash;              <md-button&ndash;&gt;-->
        <!--              &lt;!&ndash;                v-b-tooltip.hover&ndash;&gt;-->
        <!--              &lt;!&ndash;                title="Delete"&ndash;&gt;-->
        <!--              &lt;!&ndash;                class="md-icon-button md-dense md-accent"&ndash;&gt;-->
        <!--              &lt;!&ndash;                @click="&ndash;&gt;-->
        <!--              &lt;!&ndash;                  user = row.item;&ndash;&gt;-->
        <!--              &lt;!&ndash;                  deleteOfficePrompt = true;&ndash;&gt;-->
        <!--              &lt;!&ndash;                "&ndash;&gt;-->
        <!--              &lt;!&ndash;                ><md-icon>close</md-icon></md-button&ndash;&gt;-->
        <!--              &lt;!&ndash;              >&ndash;&gt;-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <md-button-->
        <!--            v-else-->
        <!--            v-b-tooltip.hover-->
        <!--            title="Assign Office"-->
        <!--            class="md-icon-button md-dense md-primary"-->
        <!--            @click="-->
        <!--              user = row.item;-->
        <!--              officeSelect = {};-->
        <!--              addOffice = true;-->
        <!--            "-->
        <!--            ><md-icon>add_circle</md-icon></md-button-->
        <!--          >-->
        <!--        </template>-->

        <template #cell(status)="row">
          <div v-if="row.value === 'active'" style="color: green">Active</div>
          <div v-else style="color: red">Inactive</div>
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Deactivate"
            v-if="row.item.status === 'active'"
            class="md-icon-button md-dense md-accent"
            @click="
              user = row.item;
              deletePrompt = true;
            "
            ><md-icon>lock_open</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Activate"
            v-else
            class="md-icon-button md-dense md-primary"
            @click="
              user = row.item;
              activatePrompt = true;
            "
            ><md-icon>lock</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-auto"
      ></b-pagination>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.first_name.concat(" ", item.last_name)).includes(
        toLower(term)
      )
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "contact_no", label: "Contact Number" },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      users: [],
      roles: [],
      user: {},
      first_name: null,
      last_name: null,
      middle_initial: null,
      name_extension: null,
      email: null,
      contact_no: null,
      password: null,
      role: null,
      roleSelect: null,
      options: [
        { value: "accreditation task force", text: "Accreditation Task Force" },
        {
          value: "college task force head",
          text: "College Task Force Head"
        },
        {
          value: "program task force chair",
          text: "Program Task Force Chair"
        },
        { value: "support head", text: "Support Head" },
        { value: "support staff", text: "Support Staff" },
        { value: "QA director", text: "QA Director" },
        { value: "QA staff", text: "QA Staff" }
      ],
      offices: [{}],
      officeList: [{}],
      officeSelect: null,
      campusList: [],
      search: null,
      officeHead: null,
      roleEdit: [{ status: false }],
      createUser: false,
      createUserPrompt: false,
      editUser: false,
      addOffice: false,
      activatePrompt: false,
      deletePrompt: false,
      deleteRolePrompt: false,
      deleteOfficePrompt: false,
      officeHeadPrompt: false,
      existingAccreditorPrompt: false,
      existingCampusPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus"
    })
  },
  methods: {
    continueCreateUser() {
      if (
        this.first_name !== null ||
        this.last_name !== null ||
        this.middle_initial !== null ||
        this.name_extension !== null ||
        this.email !== null ||
        this.contact_no !== null ||
        this.password !== null ||
        this.role !== null ||
        this.officeSelect !== null
      ) {
        this.createUserPrompt = true;
      } else this.createUser = true;
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
    setRole(setRoles) {
      let roles = this.options;
      // for (let y = 0; y < this.options.length; y++) {
      //   let value = this.options[y].value;
      //   let text = this.options[y].text;
      //   roles.push({ value, text });
      // }
      if (setRoles?.length) {
        for (let x = 0; x < setRoles.length; x++) {
          roles = roles.filter(data => data.value !== setRoles[x].role);
        }
      }
      return roles;
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showCampusUser", this.campus.campus_id)
        .then(result => {
          this.users = searchByName(result.data.users, this.search);
          this.totalRows = this.users.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    setRoles(user_id) {
      return this.roles.filter(item => item.user_id === user_id);
    },
    checkOffice(item) {
      if (item.office_roles?.length) return true;
    },
    checkSupportHead() {
      if (this.role === "support head" && this.officeSelect) {
        return !!(this.officeSelect.first_name || this.officeSelect.last_name);
      } else return false;
    },
    getOffice(user_id) {
      let result = this.offices.find(item => item.user_id === user_id);
      if (result) return result;
    },
    submit() {
      this.$isLoading(true);
      let campus_id = this.campus.campus_id;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let email = this.email;
      let contact_no = this.contact_no;
      let password = this.password;
      let role = this.role.value;
      let office_id = this.officeSelect.id;
      this.$store
        .dispatch("registerSucUser", {
          campus_id,
          first_name,
          last_name,
          middle_initial,
          name_extension,
          email,
          contact_no,
          password,
          role,
          office_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
            this.$isLoading(false);
            this.createUser = false;
            this.officeHeadPrompt = false;
            if (result.data.message === "Accreditor") {
              this.user = result.data.user;
              this.existingAccreditorPrompt = true;
            } else if (result.data.message === "campus") {
              this.user = result.data.user;
              this.campusList = result.data.campuses;
              this.existingCampusPrompt = true;
            } else {
              this.first_name = null;
              this.last_name = null;
              this.middle_initial = null;
              this.name_extension = null;
              this.email = null;
              this.contact_no = null;
              this.password = null;
              this.role = null;
              this.officeSelect = null;
              this.snackbarText = result.data.message;
              this.makeToast("Success!", "primary");
            }
          } else {
            this.officeHeadPrompt = false;
            this.createUser = true;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.officeHeadPrompt = false;
          this.createUser = true;
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    addRole(user_id) {
      this.$isLoading(true);
      // let user_id = this.user.user_id;
      let role = this.role.value;
      let office_id = this.officeSelect.id;
      this.$store
        .dispatch("setRole", { user_id, role, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.email = null;
            this.contact_no = null;
            this.password = null;
            this.role = null;
            this.officeSelect = null;
            this.editUser = false;
            this.officeHeadPrompt = false;
            this.existingAccreditorPrompt = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.officeHeadPrompt = false;
            this.editUser = true;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.officeHeadPrompt = false;
          this.editUser = true;
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    addToOffice() {
      this.$isLoading(true);
      let office_id = this.officeSelect.id;
      let user_id = this.user.id;
      this.$store
        .dispatch("addToOffice", { user_id, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
            this.officeSelect = {};
            this.addOffice = false;
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
    addToOtherCampus() {
      this.$isLoading(true);
      let campus_id = this.campus.campus_id;
      let user_id = this.user.id;
      let role = this.role.value;
      let office_id = this.officeSelect.id;
      this.$store
        .dispatch("addToOtherCampus", { campus_id, user_id, role, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.email = null;
            this.contact_no = null;
            this.password = null;
            this.role = null;
            this.officeSelect = null;
            this.existingCampusPrompt = false;
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
    deleteUser() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteUser", this.user.user_id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.users.findIndex(
              data => data.user_id === this.user.user_id
            );
            this.users[index].status = "inactive";
            this.totalRows = this.users.length;
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
    activateUser() {
      this.$isLoading(false);
      this.$store
        .dispatch("activateUser", this.user.user_id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.users.findIndex(
              data => data.user_id === this.user.user_id
            );
            this.users[index].status = "active";
            this.totalRows = this.users.length;
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
    removeRole() {
      this.$isLoading(true);
      let user_id = this.user.user_id;
      let role_id = this.roleSelect.role_id;
      let office_id = this.roleSelect.office_id;
      this.$store
        .dispatch("deleteSetRole", { user_id, role_id, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
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
    removeOffice() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeFromOffice", this.officeSelect.office_user_id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
                this.setRoleEdit();
              });
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
    },
    officeName({ office_name }) {
      return `${office_name}`;
    },
    roleText({ text }) {
      return `${text}`;
    },
    setOffice() {
      this.$store
        .dispatch("showOffice", this.campus.campus_id)
        .then(result => {
          this.officeList = result.data.office;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setRoleEdit() {
      if (this.users?.length) {
        for (let x = 0; x < this.users.length; x++) {
          let status = false;
          this.roleEdit.push({ status });
        }
      }
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveUserAccount", item);
        this.$store.commit("saveAccountID", item.user_id);
        this.$router.push("/Profile_SUC");
      }
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showCampusUser", this.campus.campus_id)
      .then(result => {
        this.users = result.data.users;
        this.totalRows = this.users.length;
        this.setRoleEdit();
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.setOffice();
    await this.$isLoading(false);
  }
};
</script>
