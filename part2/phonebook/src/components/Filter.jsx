const Filter = ({ newSearch, handleShowAll }) => {
  return (
    <div>
      <input
        value={newSearch}
        onChange={handleShowAll}
      />
    </div>
  );
};

export default Filter;