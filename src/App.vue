<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.md-icon-button {
  outline: 0 !important;
}

body,
html,
main {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

p {
  word-wrap: break-word;
}

h6 {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 14px !important;
  word-wrap: break-word;
}

h5 {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 17px !important;
  word-wrap: break-word;
}

h4 {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 20px !important;
  word-wrap: break-word;
}

h3 {
  text-transform: uppercase;
  font-size: 20px !important;
  word-wrap: break-word;
}

input,
select,
button {
  font-size: 14px !important;
}

#app {
  font-family: "Calibri", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px !important;
  @media (max-width: 900px) {
    font-size: 12px !important;
  }
}

@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: #1f1a4f,
    accent: #b71c1c
  )
);
@import "~vue-material/dist/theme/all";

.a:focus,
.button:focus,
.input:focus,
.textarea:focus {
  outline: none !important;
}
$primary: #1f1a4f;
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

$tag-margin: 3px;

.multiselect {
  color: $input-color;

  .multiselect__tags {
    border-color: $input-border-color;
    border-radius: $input-border-radius;
    font-size: 14px;
    padding: $input-padding-y $input-padding-x;
    min-height: unset;

    .multiselect__tag {
      font-size: 14px;
      background-color: $primary;
      margin-top: $tag-margin;
      margin-bottom: -$tag-margin;

      &-icon {
        &:after {
          color: $light;
        }

        &:hover {
          background: darken($primary, 5%);
        }
      }
    }

    .multiselect__placeholder {
      font-size: 14px;
      margin-bottom: 0;
      color: $input-placeholder-color;
      padding: 0;
    }

    .multiselect__input,
    .multiselect__single {
      font-size: 14px;
      line-height: $input-line-height;
      padding: 0;
      margin-bottom: 0;
    }
  }

  .multiselect__option {
    font-size: 14px;
  }
  .multiselect__option--highlight {
    font-size: 14px;
    background-color: gray;
  }
  .multiselect__option--highlight:after {
    display: none;
  }
}

.multiselect--disabled {
  background: none;
}
</style>
