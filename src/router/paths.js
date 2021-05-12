/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import Login from '../views/Login';
export default [
  {
    path: '',
    name:'main',
    view: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name:'Logout',
    view: 'Logout',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    view: 'Dashboard',
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile',
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/user-list',
    name: 'User List',
    view: 'UserList',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    view: 'Tournaments',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tournament-new',
    name: 'Add Tournament',
    view: 'TournamentsAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tournament-edit/:id',
    name: 'Edit Tournament',
    view: 'TournamentsEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-edit/:id',
    name: 'User Edit',
    view: 'UserEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/platforms',
    name: 'Platforms',
    view: 'GamePlatforms',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/platform-new',
    name: 'Add Platform',
    view: 'GamePlatformsAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/platforms/:platform_id/edit',
    name: 'Edit Platform',
    view: 'GamePlatformsEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/games/:platform_id',
    name: 'Manage Games',
    view: 'Games',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/games/:platform_id/new',
    name: 'Add Game',
    view: 'GamesAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/games/:platform_id/edit',
    name: 'Edit Game',
    view: 'GamesEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-types/:id',
    name: 'Manage Game Types',
    view: 'GameTypes',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-types/:game_id/new',
    name: 'Add Game Type',
    view: 'GameTypesAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-types/:game_id/edit',
    name: 'Edit Game Type',
    view: 'GameTypesEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-rules/:game_type_id',
    name: 'Manage Game Rules',
    view: 'GameRules',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-rules/:game_type_id/new',
    name: 'Add Game Rule',
    view: 'GameRulesAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-rules/:game_rule_id/edit',
    name: 'Edit Game Rule',
    view: 'GameRulesEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-options/:game_rule_id',
    name: 'Manage Game Options',
    view: 'GameOptions',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-options/:game_rule_id/new',
    name: 'Add Game Options',
    view: 'GameOptionsAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-options/:game_rule_id/edit',
    name: 'Edit Game Options',
    view: 'GameOptionsEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/objections',
    name: 'Objections',
    view: 'Objections',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    view: 'Reports',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    view: 'Withdraw',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reference',
    name: 'Reference',
    view: 'Reference',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/banners',
    name: 'Banners',
    view: 'Banner',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/banners/new',
    name: 'Banner New',
    view: 'BannerAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/banners/:id/edit',
    name: 'Banner Edit',
    view: 'BannerAdd',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/faq',
    name: 'F.A.Q',
    view: 'Faq',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/faq-edit/:id',
    name: 'Faq Edit',
    view: 'FaqEdit',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about-us',
    name: 'About Us',
    view: 'AboutUs',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    view: 'PrivacyPolicy',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rules',
    name: 'Rules',
    view: 'Rules',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/support',
    name: 'Support',
    view: 'Support',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/commission',
    name: 'Commission',
    view: 'Commission',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/paypal',
    name: 'Paypal-Settings',
    view: 'Paypal',
    meta: {
      requiresAuth: true
    }
  }
]
