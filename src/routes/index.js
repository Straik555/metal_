import React from 'react';

const routes = {
  Root: {
    path: `/`,
  },

  Home: {
    path: `/home`,
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/HomePage' /* webpackChunkName: "HomePage" */
      ),
    ),
  },
  Auth: {
    Login: {
      path: '/login',
      component: React.lazy(() =>
        import(
          '../components/Pages/Auth/LoginPage' /* webpackChunkName: "LoginPage" */
        ),
      ),
    },
    Signup: {
      path: '/signup',
      component: React.lazy(() =>
        import(
          '../components/Pages/Auth/SignupPage' /* webpackChunkName: "SignupPage" */
        ),
      ),
    },
    Recovery: {
      path: '/recovery',
      component: React.lazy(() =>
        import(
          '../components/Pages/Auth/ForgotPasswordPage' /* webpackChunkName: "ForgotPasswordPage" */
        ),
      ),
    },
    ResetPassword: {
      path: '/password_recovery',
      component: React.lazy(() =>
        import(
          '../components/Pages/Auth/RecoveryPasswordPage' /* webpackChunkName: "RecoveryPasswordPage" */
        ),
      ),
    },
    NewIP: {
      path: '/confirm_IP',
      component: React.lazy(() =>
        import(
          '../components/Pages/Auth/NewIPLogged' /* webpackChunkName: "NewIPLogged" */
        ),
      ),
    },
  },

  Pairs: {
    path: '/pairs',
    component: React.lazy(() =>
      import(
        '../components/Pages/Trade/PairsPage' /* webpackChunkName: "PairsPage" */
      ),
    ),
    Favorites: {
      path: '/pairs/favorites',
      SpotFavorites: {
        path: '/pairs/favorites/spot',
      },
    },
    Spot: {
      path: '/pairs/spot',
    },
  },

  AboutUs: {
    path: '/about-us',
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/AboutUsPage' /* webpackChunkName: "AboutUsPage" */
      ),
    ),
  },

  BuyCrypto: {
    // BankTransfer: {
    //   path: '/bank-transfer',
    //   component: React.lazy(() =>
    //     import(
    //       '../components/Pages/BuyCrypto/BankTransfer' /* webpackChunkName: "BankTransfer" */
    //     ),
    //   ),
    // },
    Exchange: {
      path: '/exchange',
      component: React.lazy(() =>
        import(
          '../components/Pages/BuyCrypto/Exchange' /* webpackChunkName: "Exchange" */
        ),
      ),
    },
  },

  Trade: {
    // path: '/trade',
    SpotTrade: {
      path: '/trade/spot',
      component: React.lazy(() =>
        import(
          '../components/Pages/Trade/SpotTrade' /* webpackChunkName: "SpotTrade" */
        ),
      ),
    },

    ChartPage: {
      path: `/trade/chart`,
      component: React.lazy(() =>
        import(
          '../components/Pages/Trade/ChartPage' /* webpackChunkName: "ChartPage" */
        ),
      ),
    },
    // MarginTrade: {
    //   path: '/trade/margin',
    //   component: React.lazy(() =>
    //     import(
    //       '../components/Pages/Trade/MarginTrade' /* webpackChunkName: "MarginTrade" */
    //     ),
    //   ),
    // },
  },

  // Analytics: {
  //   ValueAnalytics: {
  //     path: '/value-analytics',
  //     component: React.lazy(() =>
  //       import(
  //         '../components/Pages/Analytics/ValueAnalytics' /* webpackChunkName: "ValueAnalyticsPages" */
  //       ),
  //     ),
  //   },
  //   CopyTrading: {
  //     path: '/copy-trading',
  //     component: React.lazy(() =>
  //       import(
  //         '../components/Pages/Analytics/CopyTrading' /* webpackChunkName: "CopyTrading" */
  //       ),
  //     ),
  //   },
  // },

  FAQs: {
    path: '/FAQs',
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/FAQsPage' /* webpackChunkName: "FAQsPage" */
      ),
    ),
  },

  ContactUs: {
    path: '/contact_us',
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/ContactUsPages' /* webpackChunkName: "ContactUsPage" */
      ),
    ),
  },

  TermsConditions: {
    path: '/terms_conditions',
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/TermsConditionsPages' /* webpackChunkName: "TermsConditionsPages" */
      ),
    ),
  },

  User: {
    path: '/user',
    component: React.lazy(() =>
      import('../components/Pages/Users' /* webpackChunkName: "Users" */),
    ),
    Dashboard: {
      path: '/user/dashboard',
      component: React.lazy(() =>
        import(
          '../components/Pages/Users/Dashboard' /* webpackChunkName: "Dashboard" */
        ),
      ),
    },
    ApiManagement: {
      path: '/user/api_management',
      component: React.lazy(() =>
        import(
          '../components/Pages/Users/ApiManagement' /* webpackChunkName: "ApiManagement" */
        ),
      ),
    },
    Identification: {
      path: '/user/identification',
      component: React.lazy(() =>
        import(
          '../components/Pages/Users/Identification' /* webpackChunkName: "Identification" */
        ),
      ),
    },

    // RewardCenter: {
    //   path: '/user/reward_center',
    //   component: React.lazy(() =>
    //     import(
    //       '../components/Pages/Users/RewardCenter' /* webpackChunkName: "RewardCenter" */
    //     ),
    //   ),
    // },
    Security: {
      path: '/user/security',
      component: React.lazy(() =>
        import(
          '../components/Pages/Users/Security' /* webpackChunkName: "Security" */
        ),
      ),
    },
  },
  Wallets: {
    path: '/wallets',
    component: React.lazy(() =>
      import('../components/Pages/Wallets' /* webpackChunkName: "Wallets" */),
    ),

    SpotWallets: {
      path: '/wallets/spot',
      component: React.lazy(() =>
        import(
          '../components/Pages/Wallets/SpotWallets' /* webpackChunkName: "SpotWallets" */
        ),
      ),
      Options: {
        path: '/wallets/spot/options',
        component: React.lazy(() =>
          import(
            '../components/Pages/Wallets/SpotWallets/Options' /*  webpackChunkName: "Options" */
          ),
        ),

        Deposit: {
          path: '/wallets/spot/options/deposit',
          component: React.lazy(() =>
            import(
              '../components/Pages/Wallets/SpotWallets/Options/Deposit' /* webpackChunkName: "Deposit" */
            ),
          ),
        },
        Withdraw: {
          path: '/wallets/spot/options/withdraw',
          component: React.lazy(() =>
            import(
              '../components/Pages/Wallets/SpotWallets/Options/Withdraw' /* webpackChunkName: "Withdraw" */
            ),
          ),
        },
      },
    },

    TransactionHistory: {
      path: '/wallets/transaction',
      DepositWithdrawal: {
        path: '/wallets/transaction/deposit-withdrawal',
      },
      Transfer: {
        path: '/wallets/transaction/transfer',
      },
      component: React.lazy(() =>
        import(
          '../components/Pages/Wallets/TransactionHistory' /* webpackChunkName: "TransactionHistory" */
        ),
      ),
    },
  },
  PrivacyPolicy: {
    path: '/privacy_policy',
    component: React.lazy(() =>
      import(
        '../components/Pages/Statics/PrivacyPolicyPages' /* webpackChunkName: "PrivacyPolicyPages" */
      ),
    ),
  },
  TestingDnD: {
    path: '/dnd',
    component: React.lazy(() =>
      import(
        '../components/Pages/TestingDnD' /* webpackChunkName: "TestingDnD" */
      )),
  },
  WhitePaper: {
    path: '/whitepaper',
    component: React.lazy(() =>
      import(
        '../components/Pages/WhitePaper' /* webpackChunkName: "WhitePaper" */
      )),
  },
};
export default routes;
