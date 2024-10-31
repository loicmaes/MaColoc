export default {
  btn: {
    back: "Back",
  },
  toast: {
    internalError: {
      title: "Oops 💢",
      description: "An internal error occurred, retry later.",
    },
  },
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
};
