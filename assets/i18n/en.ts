export default {
  // global
  btn: {
    back: "Back",
    seeMyProfile: "View my profile",
  },
  toast: {
    loggedOut: {
      title: "Oh no 👀",
      description: "Your session has expired... Please log in again to continue enjoying the tool!",
    },
    userNotFound: {
      title: "Oops 💢",
      description: "User not found!",
    },
    internalError: {
      title: "Oops 💢",
      description: "An internal error occurred, please try again later.",
    },
  },
  labels: {
    logOut: "Log out",
    gender: {
      man: "Man",
      woman: "Woman",
      other: "Other",
    },
    jobStatus: {
      permanent: "Permanent contract",
      fixedTerm: "Fixed-term contract",
      student: "Student",
      selfEmployed: "Self-employed",
      unemployed: "Unemployed",
    },
    maritalStatus: {
      single: "Single",
      relationship: "In a relationship",
    },
    dayMoment: {
      day: "During the day",
      evening: "In the evening",
      night: "At night",
      weekend: "On weekends",
    },
    historyStatus: {
      new: "New",
      experienced: "Experienced",
    },
    languages: {
      french: "French",
      english: "English",
      german: "German",
      italian: "Italian",
      spanish: "Spanish",
      portuguese: "Portuguese",
      russian: "Russian",
      polish: "Polish",
      indian: "Indian",
      chinese: "Chinese",
      japanese: "Japanese",
      arabic: "Arabic",
      algerian: "Algerian",
    },
    frequency: {
      regularly: "Regularly",
      socially: "Socially",
      never: "Never",
    },
    diet: {
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      flexitarian: "Flexitarian",
      omnivore: "Omnivore",
      carnivore: "Carnivore",
    },
  },
  // auth
  auth: {
    btn: {
      login: "Join",
      goToDashboard: "Open the app",
    },
    toast: {
      conflict: {
        title: "An issue occurred 💢",
        description: "The email address ({email}) is already in use!",
      },
      notFound: {
        title: "Oops 💢",
        description: "The login information does not match!",
      },
    },
    register: {
      title: "Registration",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        password: "Password",
        conditions: "I accept the terms of use",
        promotions: "I wish to receive information about promotions and platform news.",
      },
      action: "Create my account",
      actionLoading: "Creating your account",
      link: "I already have an account!",
      toast: {
        title: "Welcome {firstName} 🎉",
        description: "Thank you for joining our users. A confirmation link has been sent to your email.",
      },
    },
    login: {
      title: "Login",
      fields: {
        email: "Email address",
        password: "Password",
      },
      action: "Log in",
      actionLoading: "Logging in",
      link: "I don't have an account!",
      toast: {
        title: "Welcome back 🎉",
        description: "Happy to see you again {firstName}! Ready to continue managing your flatshare?",
      },
    },
  },
  // navigation
  nav: {
    sections: {
      social: "Social",
      flatSharing: "Flat Sharing",
    },
  },
  // showcase
  showcase: {
    home: {
      tabLabel: "flat sharing reinvented",
    },
  },
  // app
  notifications: {
    noStatement: "You don't have new notifications.",
    readAll: "Mark all as read",
  },
  overview: {
    navigationLabel: "Overview",
    tabLabel: "Overview",
  },
  rentalProfile: {
    navigationLabel: "Tenant profile",
    tabLabel: "My tenant profile",
    create: {
      navigationLabel: "Create my profile",
      tabLabel: "Creating my tenant profile",
      title: "Create your tenant profile",
      description: "It's the core of the application and allows you to: manage a flatshare with another member, find a rental listing available for flatsharing, find a reliable flatmate, and more.",
    },
    default: {
      noProfile: {
        title: "You don't have a tenant profile!",
        caption: "Your tenant profile is your showcase on the platform! It will be useful for matchmaking, searching for listings, and simply for your social profile. Create your account in 5 minutes to access more features!",
        action: "Create my profile",
      },
    },
    toast: {
      created: {
        title: "Congratulation 🎉",
        description: "Your tenant profile has been created! You'll be able to start searching a 'bien' or a roommate.",
      },
    },
    form: {
      mobility: {
        title: "Mobility",
        fields: {
          driverLicense: {
            label: "Driving licence",
            caption: "Indicate on your profile if you have a driving licence (car, motorcycle, etc.)",
          },
          car: {
            label: "I have a car",
          },
          motorcycle: {
            label: "I have a motorcycle",
          },
        },
      },
      personalSituation: {
        title: "Personal situation",
        fields: {
          smoker: {
            label: "I smoke",
            placeholder: "Choose a frequency",
          },
          drinker: {
            label: "I drink",
            placeholder: "Choose a frequency",
          },
          maritalStatus: {
            label: "Marital status",
            caption: "Specify your marital status to inform others about the potential presence of a third person in your future flatshare.",
            placeholder: "Choose a status",
          },
          diet: {
            label: "Diet",
            caption: "Specify your diet to make matchmaking easier with other potential flatmates.",
            placeholder: "Choose a diet",
          },
          animals: {
            label: "I have pets",
          },
          historyStatus: {
            label: "In flatsharing, I am",
            caption: "New: 1 to 2, Experienced: 3 and more.",
            placeholder: "Choose a level",
          },
        },
      },
      professionalSituation: {
        title: "Professional situation",
        fields: {
          jobStatus: {
            label: "Nature of profession",
            caption: "Reassure future landlords and flatmates about your ability to meet your obligations.",
            placeholder: "Choose a status",
          },
          monthlyIncome: {
            label: "Average monthly income",
            caption: "Provide your landlord with an indication of your monthly income (will not be publicly disclosed).",
          },
        },
      },
      communication: {
        title: "Communication",
        fields: {
          availability: {
            label: "Availability",
            caption: "Specify your availability to arrange a time to communicate with flatmates or a landlord.",
            placeholder: "Choose a time period",
          },
        },
      },
    },
  },
  settings: {
    appearance: {
      label: "Appearance",
      theme: {
        light: "Light",
        dark: "Dark",
      },
    },
    language: {
      label: "Language",
      locales: {
        fr: "French",
        en: "English",
      },
    },
    verification: {
      notVerified: "Account not verified",
      action: "Verify my account",
      form: {
        title: "Verification",
        description: "Account verification ensures the authenticity of the email address used during registration. Once verified, you can fully enjoy the app's features.",
        label: "Code",
        actionLoading: "Verification in progress...",
        requestNewCode: "Send a new code.",
        toast: {
          verified: {
            title: "Congratulations 🎉",
            description: "Your account has been verified! You can now fully enjoy the platform.",
          },
          unauthorized: {
            title: "Oops 💢",
            description: "The code you provided does not exist or is no longer valid. Remember, the code is only valid for 15 minutes!",
          },
        },
      },
    },
  },
  flatSharing: {
    home: {
      navigationLabel: "My space",
      tabLabel: "My space",
      emptyStatus: {
        title: "You are not in a flatshare yet",
        caption: "Create your space, invite your flatmates, and start managing your shared life! Organize your shopping, expenses, schedules, and more.",
        action: "Create my space",
      },
    },
    new: {
      navigationLabel: "Create my space",
      tabLabel: "Creating my space",
      title: "Create your space",
      description: "Managing your flatshare helps you avoid a number of conflicts in the future. Plan expenses, draft a flatshare agreement with your flatmates to agree on how to organize household tasks. Take care to configure it meticulously.",
      form: {
        name: {
          label: "Display name",
          placeholder: "The Boys",
        },
        address: {
          label: "Property address",
          street: {
            label: "Street",
            placeholder: "8 rue des Paquerettes",
          },
          additional: {
            label: "Address complement",
            placeholder: "3rd floor",
          },
          zipCode: {
            label: "Postcode",
            placeholder: "71000",
          },
          city: {
            label: "City",
            placeholder: "Paris",
          },
          country: {
            label: "Country",
            placeholder: "France",
          },
        },
        action: "Create my space",
      },
    },
    members: {
      navigationLabel: "Members",
      tabLabel: "Members",
    },
  },
};
