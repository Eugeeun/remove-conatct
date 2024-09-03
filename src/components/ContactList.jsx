import '../css/ContactList.css'; // css 폴더에서 스타일 파일 import
import ContactItem from './ContactItem'; // ContactItem 컴포넌트 import

const ContactList = ({ contacts, onDeleteContact, onViewDetails }) => {
  return (
    <div className='contact-list'>
      <ul>
        {contacts.map((contact, index) => (
          <ContactItem
            key={index}
            contact={contact}
            onViewDetails={onViewDetails}
            onDeleteContact={onDeleteContact}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
