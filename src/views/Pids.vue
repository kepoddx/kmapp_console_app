<template>
  <div class="container">
    <h1>PID</h1>
    <b-table striped hover :items="pids" :fields="fields" :tbody-tr-class="rowClass">
      <template slot="link" slot-scope="data">
        <b-button variant="success" @click="goto(data.item.onsiteUrl)">iOnSite</b-button>
      </template>

      <template slot="lFod" slot-scope="data">
        <div class="d-flex">
          <div id="lFod" v-html="data.item.lFod"></div>
          <div>
            <button v-b-tooltip="{title: 'Copied!', placement: 'bottom', trigger: 'focus', delay: { 'show' : 0, 'hide' : 300}}" class="btn copy"  
            v-clipboard:copy="data.item.lFod">
              <svg
                class="octicon"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template slot="lSav" slot-scope="data">
        <div class="d-flex">
          <div id="lSav" v-html="data.item.lSav"></div>
          <div>
            <button v-b-tooltip="{title: 'Copied!', placement: 'bottom', trigger: 'focus', delay: { 'show' : 0, 'hide' : 300}}" class="btn copy"  
            v-clipboard:copy="data.item.lSav">
              <svg
                class="octicon"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template slot="hFod" slot-scope="data">
        <div class="d-flex">
          <div id="hFod" v-html="data.item.hFod"></div>
          <div>
            <button v-b-tooltip="{title: 'Copied!', placement: 'bottom', trigger: 'focus', delay: { 'show' : 0, 'hide' : 300}}" class="btn copy"  
            v-clipboard:copy="data.item.hFod">
              <svg
                class="octicon"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template slot="hSav" slot-scope="data">
        <div class="d-flex">
          <div id="hSav" v-html="data.item.hSav"></div>
          <div>
            <button v-b-tooltip="{title: 'Copied!', placement: 'bottom', trigger: 'focus', delay: { 'show' : 0, 'hide' : 300}}" class="btn copy"  
            v-clipboard:copy="data.item.hSav">
              <svg
                class="octicon"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template slot="complete" slot-scope="data">
                <b-form-group>
                    <b-form-checkbox inline v-model="data.item.checked">Done</b-form-checkbox>
                </b-form-group>
            </template>
    </b-table>
  </div>
</template>

<script>
import { getSpringPids } from "../../backend/data/pids/SpringBAU/index.js";
import { getCleanJson} from '../../backend/data'
export default {
  data() {
    return {
      fields: {
        site: {
          label: "Site",
          sortable: true
        },
        tier: {
          sortable: true
        },
        url : {
            label: "Site Url"
        },
        link: {
          label: "Links"
        },
        lFod: {},
        lSav: {},
        hFod: {},
        hSav: {},
        complete: {
            label: "QA",
        },
        checked: {
            label: "QA Done",
            sortable: true
        },
      },
      pids: getCleanJson('5DayFlashSale2019')
    };
  },
  methods: {
    goto(url) {
    //   window.open(url, "__blank");
var windowObjectReference;
var strWindowFeatures = "alwaysRaised=on,menubar=yes,location=yes,resizable=yes,scrollbars=yes,toolbar=yes";
        // window.open(
        //     url,
        //     "alwaysRaised"
        // )
        windowObjectReference = window.open(url, "CNN_WindowName", strWindowFeatures);
    },
    rowClass(item, type) {
        if (!item) return
        if (item.checked === true) return 'table-success'
    }
  }
};
</script>

<style>
.little {
  font-size: 5px;
}
.octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
.btn.copy {
    margin-top: -8px;
}
</style>