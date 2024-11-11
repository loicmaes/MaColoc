export default {
  // global
  btn: {
    back: "Retour",
    seeMyProfile: "Voir mon profil",
  },
  toast: {
    internalError: {
      title: "Oups 💢",
      description: "Une erreur interne est survenue, ré-essaye plus tard.",
    },
  },
  labels: {
    logOut: "Déconnexion",
  },
  // auth
  auth: {
    btn: {
      login: "Rejoindre",
      goToDashboard: "Ouvrir l'application",
    },
    toast: {
      conflict: {
        title: "Un problème est survenu 💢",
        description: "L'adresse e-mail ({email}) est déjà utilisée !",
      },
      notFound: {
        title: "Oups 💢",
        description: "Les informations de connexions ne correspondent pas !",
      },
    },
    register: {
      title: "Inscription",
      fields: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse e-mail",
        password: "Mot de passe",
        conditions: "J'accepte les conditions d'utilisation",
        promotions: "Je souhaite recevoir des informations sur les promotions et les nouveautés de la plateforme.",
      },
      action: "Créer mon compte",
      actionLoading: "Création de ton compte",
      link: "J'ai déjà un compte !",
      toast: {
        title: "Bienvenue {firstName} 🎉",
        description: "Merci d'avoir rejoins nos utilisateurs. Un lien de confirmation t'as été envoyé par e-mail.",
      },
    },
    login: {
      title: "Connexion",
      fields: {
        email: "Adresse e-mail",
        password: "Mot de passe",
      },
      action: "Je me connecte",
      actionLoading: "Connexion en cours",
      link: "Je n'ai pas de compte !",
      toast: {
        title: "Bon retour parmi nous 🎉",
        description: "Heureux de te revoir {firstName} ! Prêt à continuer à gérer ta colocation ?",
      },
    },
  },
  // app
  settings: {
    appearance: {
      label: "Apparence",
      theme: {
        light: "Clair",
        dark: "Sombre",
      },
    },
    language: {
      label: "Langue",
      locales: {
        fr: "Français",
        en: "Anglais",
      },
    },
    verification: {
      notVerified: "Compte non vérifié",
      action: "Vérifier mon compte",
      form: {
        title: "Vérification",
        description: "La vérification du compte est là pour authentifier de la possession du mail entré à l'inscription. Une fois ton compte vérifier, tu pourras jouir de toute la puissance de l'application.",
        label: "Code",
      },
    },
  },
  navigation: {
  },
};
