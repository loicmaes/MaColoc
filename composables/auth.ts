const wait = async (delay: number = 1000) => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

export const useUser = () => false;

export async function sendRegisterRequest() {
  await wait();
}
export async function sendLogInRequest() {
  await wait();
}
