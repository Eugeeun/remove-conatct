import { useState, useEffect } from 'react';
import '../css/ContactDetailModal.css'; // css 폴더 경로로 수정

const ContactDetailModal = ({ isOpen, onClose, contact, onUpdate, groups }) => {
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [memo, setMemo] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (isOpen && contact) {
      setPhone(contact.phone);
      setGroup(contact.group);
      setMemo(contact.memo);
    }
  }, [isOpen, contact]);

  if (!isOpen) return null;

  const validatePhone = phone => {
    const regex = /^010-\d{4}-\d{4}$/;
    return regex.test(phone);
  };

  const handlePhoneChange = e => {
    const newPhone = e.target.value;
    setPhone(newPhone);

    if (validatePhone(newPhone)) {
      setPhoneError(''); // 유효하면 오류 메시지 초기화
    } else {
      setPhoneError('전화번호는 010-0000-0000 형식이어야 합니다.');
    }
  };

  const handleUpdate = () => {
    if (phoneError) return;
    const updatedContact = { ...contact, phone, group, memo };
    onUpdate(updatedContact);
    onClose();
  };

  const handleClose = () => {
    setPhoneError('');
    onClose();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>연락처 세부사항</h2>
        <p>
          <strong>이름</strong> {contact.name}
        </p>
        <div>
          <strong>전화번호</strong>
          <input
            type='text'
            value={phone}
            onChange={handlePhoneChange}
            placeholder='전화번호 (예: 010-xxxx-xxxx)'
          />
        </div>
        {phoneError && <p className='error-message'>{phoneError}</p>}
        <div>
          <strong>그룹</strong>
          <select value={group} onChange={e => setGroup(e.target.value)}>
            {groups.map((g, index) => (
              <option key={index} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <strong>메모</strong>
          <input
            type='text'
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder='메모'
          />
        </div>
        <div className='button-container'>
          <button onClick={handleUpdate} disabled={!!phoneError}>
            수정 완료
          </button>
          <button onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailModal;
