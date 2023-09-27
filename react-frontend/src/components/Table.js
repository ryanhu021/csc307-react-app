function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const { characterData, removeCharacter } = props;
  const rows = characterData.map((row, index) => (
    <tr key={index}>
      <td>{row.name}</td>
      <td>{row.job}</td>
      <td>
        <button type="button" onClick={() => removeCharacter(index)}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  const { characterData, removeCharacter } = props;
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={characterData}
        removeCharacter={removeCharacter}
      />
    </table>
  );
}

export default Table;
