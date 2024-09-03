const ContactItem = ({ contact, onViewDetails, onDeleteContact, index }) => {
  return (
    <li className='contact-item'>
      <div className='contact-info'>
        <span>{contact.name}</span>
        <span>{contact.phone}</span>
        <span>{contact.group}</span>
      </div>
      <div className='contact-btns'>
        <button onClick={() => onViewDetails(contact)}>세부사항</button>
        <button onClick={() => onDeleteContact(index)}>삭제</button>
      </div>
    </li>
  );
};

export default ContactItem;
