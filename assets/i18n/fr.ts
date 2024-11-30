export default {
  // global
  btn: {
    back: "Retour",
    seeMyProfile: "Voir mon profil",
  },
  toast: {
    loggedOut: {
      title: "Oh non 👀",
      description: "Ta session a expirée... Re-connecte toi pour continuer à profiter de l'outil !",
    },
    userNotFound: {
      title: "Oups 💢",
      description: "L'utilisateur n'est pas trouvé !",
    },
    internalError: {
      title: "Oups 💢",
      description: "Une erreur interne est survenue, ré-essaye plus tard.",
    },
  },
  labels: {
    logOut: "Déconnexion",
    gender: {
      man: "Homme",
      woman: "Femme",
      other: "Autre",
    },
    jobStatus: {
      permanent: "CDI",
      fixedTerm: "CDD",
      student: "Étudiant",
      selfEmployed: "Indépendant",
      unemployed: "Sans emploi",
    },
    maritalStatus: {
      single: "Célibataire",
      relationship: "En couple",
    },
    dayMoment: {
      day: "En journée",
      evening: "En soirée",
      night: "De nuit",
      weekend: "Le week-end",
    },
    historyStatus: {
      new: "Nouveau",
      experienced: "Expérimenté",
    },
    languages: {
      french: "Français",
      english: "Anglais",
      german: "Allemand",
      italian: "Italien",
      spanish: "Espagnol",
      portuguese: "Portugais",
      russian: "Russe",
      polish: "Polonais",
      indian: "Indien",
      chinese: "Chinois",
      japanese: "Japonais",
      arabic: "Arabe",
      algerian: "Algérien",
    },
    frequency: {
      regularly: "Régulièrement",
      socially: "Socialement",
      never: "Jamais",
    },
    diet: {
      vegetarian: "Végétarien",
      vegan: "Végan",
      flexitarian: "Flexitarien",
      omnivore: "Omnivore",
      carnivore: "Carnivore",
    },
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
  // navigation
  nav: {
    sections: {
      social: "Social",
      flatSharing: "Colocation",
    },
  },
  // app
  overview: {
    navigationLabel: "Vue d'ensemble",
  },
  rentalProfile: {
    navigationLabel: "Profil locataire",
    create: {
      title: "Créer ton profil locataire",
      description: "Il est au coeur de l'application et te permet de : gérer une colocation avec un autre membre, trouver une annonce immobilière disponible en colocation, trouver un colocataire fiable, et j'en passe.",
    },
    default: {
      noProfile: {
        title: "Tu n'as pas de profil locataire !",
        caption: "Ton profil locataire est ta vitrine sur la plateforme ! Il te sera utile pour le match-making, pour la recherche d'annonces mais simplement pour ton profil social. Créer ton compte en 5 minutes pour accéder à plus de fonctionnalités !",
        action: "Créer mon profil",
      },
    },
    toast: {
      created: {
        title: "Féliciation 🎉",
        description: "Ton profil locataire a été créé ! Tu pourras désormais commencer à chercher un bien ou un colocataire.",
      },
    },
    form: {
      mobility: {
        title: "Mobilité",
        fields: {
          driverLicense: {
            label: "Permis de conduire",
            caption: "Indique sur ton profil si tu es doté d'un permis de conduire (auto, moto, etc.)",
          },
          car: {
            label: "J'ai une voiture",
          },
          motorcycle: {
            label: "J'ai une moto",
          },
        },
      },
      personalSituation: {
        title: "Situation personnelle",
        fields: {
          smoker: {
            label: "Je fume",
            placeholder: "Choisis une fréquence",
          },
          drinker: {
            label: "Je bois",
            placeholder: "Choisis une fréquence",
          },
          maritalStatus: {
            label: "Statut marital",
            caption: "Précise ta situation marital aux autres utilisateurs afin d'avertir de la présence potentiel d'une tierce personne dans votre future colocation.",
            placeholder: "Choisis un statut",
          },
          diet: {
            label: "Régime alimentaire",
            caption: "Précise ton régime alimentaire pour faciliter le match-making avec d'autres potentiels colocataires.",
            placeholder: "Choisis un régime",
          },
          animals: {
            label: "J'ai des animaux",
          },
          historyStatus: {
            label: "En colocation, je suis",
            caption: "Nouveau : 1 à 2, Expérimenté : 3 et plus.",
            placeholder: "Choisis un niveau",
          },
        },
      },
      professionalSituation: {
        title: "Situation professionnelle",
        fields: {
          jobStatus: {
            label: "Nature de la profession",
            caption: "Permet de rassurer vos futurs propriétaires et colocataires sur votre capacité à régulariser vos obligations.",
            placeholder: "Choisis une situation",
          },
          monthlyIncome: {
            label: "Revenu mensuel moyen",
            caption: "Donne une indication à votre propriétaire sur votre revenu mensuel (ne sera pas annoncé publiquement).",
          },
        },
      },
      communication: {
        title: "Communication",
        fields: {
          availability: {
            label: "Disponibilités",
            caption: "Précise tes disponibilités pour convenir d'un temps d'échange entre colocataires ou avec un propriétaire.",
            placeholder: "Choisis une période",
          },
        },
      },
    },
  },
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
        actionLoading: "Vérification en cours...",
        requestNewCode: "Envoyer un nouveau code.",
        toast: {
          verified: {
            title: "Félicitation 🎉",
            description: "Ton compte a été vérifié ! Tu peux maintenant de jouir pleinement de la plateforme.",
          },
          unauthorized: {
            title: "Oups 💢",
            description: "Le code que tu as fourni n'existe pas ou n'est plus valide. N'oublie pas que le code n'est valable que 15 minutes !",
          },
        },
      },
    },
  },
  flatSharing: {
    home: {
      navigationLabel: "Mon espace",
      emptyStatus: {
        title: "Tu n'es pas encore en colocation",
        caption: "Créer ton espace, invite tes colocataires, et commencez à gérer votre idylle à plusieurs ! Organisez vos courses, vos dépenses, vos agendas, etc.",
        action: "Créer mon espace",
      },
      createSpace: {
        title: "Créer mon espace",
        caption: "Ton espace est le lieu de toutes les actions concernant ta colocation. Il est le coeur même de l'application.",
        form: {
          fields: {
            name: "Nom d'affichage",
          },
          action: "Confirmer",
        },
      },
    },
    members: {
      navigationLabel: "Membres",
    },
  },
};
