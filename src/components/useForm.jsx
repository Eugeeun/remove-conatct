import { useState } from 'react';

const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = name => {
    if (name.length < 2) {
      setNameError('이름은 두 글자 이상 입력해야 합니다.');
    } else {
      setNameError('');
    }
  };

  const validatePhone = phone => {
    const phonePattern = /^010-\d{4}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('전화번호는 010-0000-0000 형식이어야 합니다.');
    } else {
      setPhoneError('');
    }
  };

  const handleInputChange = field => e => {
    const value = e.target.value;
    setValues({
      ...values,
      [field]: value,
    });
    if (field === 'name') validateName(value);
    if (field === 'phone') validatePhone(value);
  };

  const handleGroupChange = e => {
    setValues({
      ...values,
      group: e.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setNameError('');
    setPhoneError('');
  };

  const validateForm = () => {
    validateName(values.name);
    validatePhone(values.phone);
    return !nameError && !phoneError && values.name && values.phone;
  };

  return {
    ...values,
    nameError,
    phoneError,
    handleInputChange,
    handleGroupChange,
    resetForm,
    validateForm,
  };
};

export default useForm;
