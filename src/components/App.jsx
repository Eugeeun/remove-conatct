import { useState, useEffect } from 'react';
import InputField from './InputField';
import GroupSelect from './GroupSelect';
import ContactList from './ContactList';
import GroupModal from './GroupModal';
import ContactDetailModal from './ContactDetailModal';
import '../css/App.css';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [memo, setMemo] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [groups, setGroups] = useState(
    () => JSON.parse(localStorage.getItem('groups')) || ['친구', '가족']
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

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

  const handleNameChange = e => {
    const newName = e.target.value;
    setName(newName);
    validateName(newName);
  };

  const handlePhoneChange = e => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    validatePhone(newPhone);
  };

  const handleSave = () => {
    if (!nameError && !phoneError && name && phone) {
      const isDuplicate = contacts.some(contact => contact.name === name);
      if (isDuplicate) {
        alert('이미 같은 이름의 연락처가 존재합니다.');
        return;
      }

      const newContact = { name, phone, group, memo };
      setContacts([newContact, ...contacts]);
      setName('');
      setPhone('');
      setGroup('');
      setMemo('');
    }
  };

  const handleAddGroup = newGroup => {
    setGroups([...groups, newGroup]);
  };

  const handleDeleteGroup = groupToDelete => {
    const isGroupUsed = contacts.some(contact => contact.group === groupToDelete);

    if (isGroupUsed) {
      alert('이 그룹은 현재 사용 중입니다. 삭제할 수 없습니다.');
      return;
    }
    setGroups(groups.filter(g => g !== groupToDelete));
  };

  const handleDeleteContact = index => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleViewDetails = contact => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedContact(null);
  };

  const handleUpdateContact = updatedContact => {
    const updatedContacts = contacts.map(contact =>
      contact.name === updatedContact.name ? updatedContact : contact
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.includes(searchTerm) ||
      contact.phone.includes(searchTerm) ||
      contact.group.includes(searchTerm)
    );
  });

  const handleResetSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='app'>
      <div className='input-wrap'>
        <InputField label='이름' value={name} onChange={handleNameChange} placeholder='이름' />
        {nameError && <div className='error-message'>{nameError}</div>}
        <InputField
          label='전화번호'
          value={phone}
          onChange={handlePhoneChange}
          placeholder='전화번호 (예: 010-1234-5678)'
        />
        {phoneError && <div className='error-message'>{phoneError}</div>}
        <GroupSelect
          groups={groups}
          selectedGroup={group}
          onGroupChange={e => setGroup(e.target.value)}
          onAddGroup={() => setModalOpen(true)}
        />
        <InputField
          label='메모'
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder='메모'
        />
        <button onClick={handleSave}>저장</button>
      </div>

      <div className='list-wrap'>
        <div className='search-field'>
          <InputField
            label=''
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='이름, 전화번호, 그룹으로 검색'
          />
          <button onClick={handleResetSearch}>전체 리스트</button>
        </div>

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
          onViewDetails={handleViewDetails}
        />
      </div>

      <GroupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        groups={groups}
        onAddGroup={handleAddGroup}
        onDeleteGroup={handleDeleteGroup}
      />
      <ContactDetailModal
        isOpen={detailModalOpen}
        onClose={closeDetailModal}
        contact={selectedContact}
        onUpdate={handleUpdateContact}
        groups={groups}
      />
    </div>
  );
};

export default App;
