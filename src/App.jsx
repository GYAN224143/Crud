import { useState } from "react";

const App = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [clickEdit, setClickEdit] = useState(false);
  const [updateValue, setUpdateVlaue] = useState();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clickEdit) {
      const tempTableData = tableData;
      Object.assign(tempTableData[updateValue], inputs);
      setTableData([...tempTableData]);
      setClickEdit(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({
      name: tempData.name,
      email: tempData.email,
    });
    setClickEdit(true);
    setUpdateVlaue(index);
  };

  return (
    <div className="aapWrapper p-5">
      <div className="formCotainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
          />
          <button type="submit">{clickEdit ? "Update" : "Add"}</button>
        </form>
      </div>
      <div className="tableContainer px-5">
        <table className="w-100 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => {
              return (
                <>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button onClick={() => handleEdit(i)}>Edit</button>
                      <button onClick={() => handleDelete(i)}>Delete</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
