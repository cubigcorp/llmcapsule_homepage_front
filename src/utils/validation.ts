import i18n from '@/i18n/client';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// 이메일 유효성 검사
export const validateEmail = (
  email: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !email) {
    return {
      isValid: false,
      message: i18n.t('common:validation.email.required'),
    };
  }

  if (email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: i18n.t('common:validation.email.invalid'),
      };
    }
  }

  return {
    isValid: true,
    message: '',
  };
};

// 비밀번호 유효성 검사
export const validatePassword = (
  password: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !password) {
    return {
      isValid: false,
      message: i18n.t('common:validation.password.required'),
    };
  }

  if (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message: i18n.t('common:validation.password.policy'),
      };
    }
  }

  return {
    isValid: true,
    message: '',
  };
};

// 비밀번호 확인 유효성 검사
export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !confirmPassword) {
    return {
      isValid: false,
      message: i18n.t('common:validation.confirmPassword.required'),
    };
  }

  if (confirmPassword && confirmPassword !== password) {
    return {
      isValid: false,
      message: i18n.t('common:validation.confirmPassword.mismatch'),
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

// 연락처 유효성 검사
export const validateContactNumber = (
  contactNumber: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !contactNumber) {
    return {
      isValid: false,
      message: i18n.t('common:validation.phone.required'),
    };
  }

  if (contactNumber && contactNumber.length < 7) {
    return {
      isValid: false,
      message: i18n.t('common:validation.phone.invalid'),
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

// 회사/소속기관명 유효성 검사
export const validateCompany = (company: string): ValidationResult => {
  if (company && company.trim().length < 2) {
    return {
      isValid: false,
      message: i18n.t('common:validation.company.min2'),
    };
  }

  return {
    isValid: true,
    message: '',
  };
};
