import React from "react";

const Forms = ({
  AddName,
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber
}) => {
  return (
    <div>
      <form onSubmit={AddName}>
        <div>
          Name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
