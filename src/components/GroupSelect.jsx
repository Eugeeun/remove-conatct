const GroupSelect = ({ groups, selectedGroup, onGroupChange, onAddGroup }) => {
  return (
    <div className='group-select-field'>
      <label htmlFor='group-select'>그룹 선택</label>
      <div>
        <select id='group-select' value={selectedGroup} onChange={onGroupChange}>
          <option value=''>그룹 선택</option>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <button onClick={onAddGroup}>그룹 추가</button>
      </div>
    </div>
  );
};

export default GroupSelect;
