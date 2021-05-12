<template>
  <v-navigation-drawer id="app-drawer" v-model="inputValue" app dark floating persistent mobile-break-point="991"
                       width="260">
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="48" contain/>
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Gamexarena
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile v-if="responsive">
          <v-text-field class="purple-input search-input" label="Search..." color="purple"/>
        </v-list-tile>
        <v-list>
          <div v-for="(link, i) in links" :key="i" >
            <v-list-tile v-if="!link.subLinks" :active-class="color" avatar :to="link.to" class="v-list-item">
              <v-list-tile-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="link.text"/>
            </v-list-tile>

            <v-list-group
                v-else
                :key="link.text"
                no-action
                
            >
              
               <v-list-tile slot='activator'>
                 <v-list-tile-action>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-text="link.text"/>
              </v-list-tile>
              
            <div v-for="sublink in link.subLinks" :key="sublink.text" class="list-item">
            <v-list-tile
                :to="sublink.to"
            >
                <v-list-tile-action>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-text="sublink.text"/>
            </v-list-tile>
            </div>
            

        </v-list-group>

        </div>
          
        </v-list>

      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    data: () => ({
      logo: './img/gamex_logo.png',
      links: [{
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
        {
          icon:'mdi-cogs',
          text:'Manage',
          subLinks:[
            {
              to: '/user-list',
              icon: 'mdi-account-multiple',
              text: 'User List'
            },
            {
              to: '/tournaments',
              icon: 'mdi-theater',
              text: 'Tournaments'
            },
            {
              to: '/platforms',
              icon: 'mdi-xbox',
              text: 'Manage Platforms'
            },
            {
              to: '/objections',
              icon: 'mdi-bug',
              text: 'Objections'
            },
            {
              to: '/reports',
              icon: 'mdi-chart-bar',
              text: 'Reports'
            },
            {
              to: '/withdraw',
              icon: 'mdi-currency-eur',
              text: 'Withdraw'
            },
            {
              to: '/reference',
              icon: 'mdi-account-star',
              text: 'Reference'
            },
            {
              to: '/banners',
              icon: 'mdi-image',
              text: 'Banners'
            },
          ]
        },
        
        {
          icon: 'mdi-settings',
          text: 'Settings',
          subLinks:[
            {
              to: '/commission',
              icon: 'mdi-chart-pie',
              text: 'Commission-Settings'
            },
            {
              to: '/paypal',
              icon: 'mdi-paypal',
              text: 'Paypal-Settings'
            },
          ]
        },
        {
          icon:'mdi-book',
          text: 'Static Pages',
          subLinks: [
            {
              to: '/faq',
              icon: 'mdi-help-circle',
              text: 'F.A.Q'
            },
            {
              to: '/about-us',
              icon: 'mdi-clipboard-outline',
              text: 'About Us'
            },
            {
              to: '/privacy-policy',
              icon: 'mdi-clipboard-outline',
              text: 'Privacy Policy'
            },
            {
              to: '/rules',
              icon: 'mdi-format-list-bulleted',
              text: 'Rules'
            },
            {
              to: '/support',
              icon: 'mdi-help-circle',
              text: 'Support'
            },

          ]
        },
        

      ],
      responsive: false
    }),
    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.setDrawer(val)
        }
      },
      items() {
        return this.$t('Layout.View.items')
      }
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
    }
  }
</script>

<style lang="scss">
  #app-drawer {
    .v-list .v-list__tile__title{
      font-size:16px !important;
    }
    .v-list__group .v-list__tile{
      margin-left:15px !important;
    }
    .v-list__group .v-list__tile__action, .v-list__tile__avatar {
      min-width: 41px;
    }
    .v-list__group div.list-item .v-list__tile{
      padding-left:18px;
    }
    .v-list__group div.list-item .v-list__tile__title{
      font-size:14px !important;
    }
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
    
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
