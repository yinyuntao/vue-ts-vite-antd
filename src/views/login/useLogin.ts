import { ref, computed } from 'vue';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export const useLoginState = () => {
  const setLoginState = (state: LoginStateEnum) => {
    currentState.value = state;
  };

  const handleBackLogin = () => {
    setLoginState(LoginStateEnum.LOGIN);
  };

  const getLoginState = computed(() => currentState.value);

  return { setLoginState, handleBackLogin, getLoginState };
};
