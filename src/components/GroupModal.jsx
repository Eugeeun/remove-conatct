import { useState, useRef } from 'react';
import '../css/GroupModal.css';

const GroupModal = ({ isOpen, onClose, groups, onAddGroup, onDeleteGroup }) => {
  const [newGroup, setNewGroup] = useState('');
  const inputRef = useRef(null);

  const handleAddGroup = () => {
    if (newGroup.trim()) {
      onAddGroup(newGroup);
      setNewGroup('');
      inputRef.current.focus();
    }
  };

  return (
    isOpen && (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <h2>그룹 관리</h2>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>
                {group}
                <button onClick={() => onDeleteGroup(group)}>삭제</button>
              </li>
            ))}
          </ul>
          <div className='input-field'>
            <input
              type='text'
              value={newGroup}
              onChange={e => setNewGroup(e.target.value)}
              placeholder='새 그룹 이름'
              ref={inputRef}
            />
            <button onClick={handleAddGroup}>추가</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    )
  );
};

export default GroupModal;
