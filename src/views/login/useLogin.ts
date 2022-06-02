import { ref, computed, unref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RuleObject } from 'ant-design-vue/lib/form/interface';

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

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }
  return { validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')));
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
  const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')));
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));

  const getFormRules = computed(() => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    const validatePolicy = async (_: RuleObject, value: boolean) => {
      return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
    };

    const validateConfirmPassword = (password: string) => {
      return async (_: RuleObject, value: string) => {
        if (!value) {
          return Promise.reject(t('sys.login.passwordPlaceholder'));
        }
        if (value !== password) {
          return Promise.reject(t('sys.login.diffPwd'));
        }
        return Promise.resolve();
      };
    };

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    };

    switch (unref(currentState)) {
      case LoginStateEnum.MOBILE:
        return mobileRule;
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        };
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
          ...mobileRule,
        };
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule,
        };
    }
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
