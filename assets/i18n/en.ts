export default {
  // global
  btn: {
    back: "Back",
    seeMyProfile: "See my profile",
  },
  toast: {
    internalError: {
      title: "Oops 💢",
      description: "An internal error occurred, retry later.",
    },
  },
  labels: {
    logOut: "Log Out",
  },
  // auth
  auth: {
    btn: {
      login: "Join",
      goToDashboard: "Open app",
    },
    toast: {
      conflict: {
        title: "An error occurred 💢",
        description: "Email address ({email}) is already used!",
      },
      notFound: {
        title: "Oops 💢",
        description: "Credentials doesn't match!",
      },
    },
    register: {
      title: "Register",
      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
        conditions: "I accept the terms of use",
        promotions: "I accept to receive promotions emails",
      },
      action: "Create my account",
      actionLoading: "Creating your account",
      link: "I already have an account",
      toast: {
        title: "Welcome {firstName} 🎉",
        description: "Thanks for joining our users. A confirmation link has been send by email.",
      },
    },
    login: {
      title: "Login",
      fields: {
        email: "Email Address",
        password: "Password",
      },
      action: "Take me in",
      actionLoading: "Logging you in",
      link: "I don't have an account",
      toast: {
        title: "Welcome back 🎉",
        description: "Happy to see you again {firstName}! Ready to continue to manage your house sharing?",
      },
    },
  },
  // app
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
        description: "Account verification is here to authenticate the ownership of the email entered during registration. Once your account is verified, you can enjoy the full power of the application.",
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
  navigation: {
  },
};
