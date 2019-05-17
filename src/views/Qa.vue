<template>
    <div class="container-fluid">
        <b-table striped hover :items="sites" :fields="fields" :tbody-tr-class="rowClass">
            <template slot="links" slot-scope="data">
                <b-button-group>
                    <b-button v-if="data.item.ionOnsite" variant="primary" @click="goto(data.item.ionOnsite)">iOnSite</b-button>
                    <b-button variant="warning" @click="goto('https://' + data.item.website)">Home Page</b-button>
                    <b-button variant="success" @click="goto('https://offers.' + data.item.website + '/specialoffer')">S-Offer</b-button>
                    <b-button variant="info" @click="goto('https://offers.' + data.item.website + '/digitaloffer')">D-Offer</b-button>
                </b-button-group>
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
    import { getCleanJson, getQaJson } from '../../backend/data'
    
    export default {
        name: "Qa",
        data () {
            return {
                fields: {
                    site: {
                        sortable: true
                    },
                    bauBuild: {
                        label: "Builder",
                        sortable: true
                    },
                    market_type: {
                        label: 'Tier',
                        sortable: true
                    },
                    siteName: {},
                    website: {
                        sortable: true
                    },
                    links: {},
                    complete: {
                        label: "QA",
                    },
                    checked: {
                        label: "QA Done",
                        sortable: true
                    },
                },
                sites: getQaJson('allSites', "Keith")
            }
        },
        methods: {
            goto(url) {
                window.open(url, '__blank')
            },
            rowClass(item, type) {
                if (!item) return
                if (item.checked === true) return 'table-success'
            }
        }
    }
</script>

<style scoped>

</style>