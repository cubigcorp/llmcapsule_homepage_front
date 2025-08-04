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
      message: '이메일을 입력해 주세요.',
    };
  }

  if (email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: '유효한 이메일을 입력해 주세요.',
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
      message: '비밀번호를 입력해 주세요.',
    };
  }

  if (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message: '8~20자, 영문/숫자/특수문자를 포함해야 합니다.',
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
      message: '비밀번호를 입력해 주세요.',
    };
  }

  if (confirmPassword && confirmPassword !== password) {
    return {
      isValid: false,
      message: '비밀번호가 일치하지 않습니다.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

// 성 필드 유효성 검사
export const validateLastName = (
  lastName: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !lastName) {
    return {
      isValid: false,
      message: '필수 항목 입니다.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

// 이름 필드 유효성 검사
export const validateFirstName = (
  firstName: string,
  isTouched: boolean = false
): ValidationResult => {
  if (isTouched && !firstName) {
    return {
      isValid: false,
      message: '필수 항목 입니다.',
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
  const contactRegex = /^[0-9]{10,11}$/;
  if (isTouched && !contactNumber) {
    return {
      isValid: false,
      message: '필수 항목 입니다.',
    };
  }

  if (contactNumber && !contactRegex.test(contactNumber)) {
    return {
      isValid: false,
      message: '올바른 연락처를 입력해 주세요.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};
