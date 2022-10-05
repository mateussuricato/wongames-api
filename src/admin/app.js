import AuthLogo from './extensions/logoWon.png';
import favicon from './extensions/favicon.png';
import MenuLogo from './extensions/logoMenu.png';



export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
   // Replace the favicon

    // Add a new locale, other than 'en'
    locales: ['pt-BR'],
    // Replace the Strapi logo in the main navigation

    // Override or extend the theme
    theme: {
      colors: {
        primary100: '#f6ecfc',
        primary200: '#e0c1f4',
        primary500: '#ac73e6',
        primary600: '#9736e8',
        primary700: '#8312d1',
        danger700: '#b72b1a'
      },
    },
    // Extend the translations

    theme: {
      colors: {
     
      },
    },

    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome',
        'Auth.form.welcome.subtitle': 'Log into your WomGames account',
        'app.components.LeftMenu.navbrand.title': "WonGames Panel"
        // Users: 'Utilisateurs',
        // City: 'CITY (FRENCH)',
        // // Customize the label of the Content Manager table.
        // Id: 'ID french',
      },
      'pt-BR': {
        'Auth.form.welcome.title': 'Bem Vindo(a)',
        'Auth.form.welcome.subtitle': 'Faça login na sua conta WomGames',
        'app.components.LeftMenu.navbrand.title': "Painel WonGames"
      },
    },

   // Disable video tutorials
    tutorials: false,
   // Disable notifications about new Strapi releases
    notifications: { release: false },
  },

  bootstrap() {},
};

 