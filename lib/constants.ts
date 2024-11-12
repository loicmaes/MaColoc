export const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PhoneNumberRegex = /^(\+33|0)[1-9](\s|-|\.)?(\d{2}(\s|-|\.)?){4}$/;

export const bindRoute = (path: string): string => {
  const { appUrl } = useRuntimeConfig().public;
  return `${appUrl}${path}`;
};
