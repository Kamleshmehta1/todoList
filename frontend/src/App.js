import { useEffect, useState } from "react";
import axios from "axios";
import { InputGroup } from "react-bootstrap";

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [input, setInput] = useState({
    name: "",
    subject: "",
    userChecked: false,
  });

  const sendRequest = async () => {
    let data;
    await axios
      .post("/api/data/add", {
        name: input.name,
        subject: input.subject,
        userChecked: false,
      })
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => fetchData());
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchData = async () => {
    await axios
      .get("/api/data/")
      .then((response) => setDataArray(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputData = (id) => {
    axios
      .put(`/api/data/update/${id}`)
      .then((response) => {
        setInput({
          name: response.data.data.name,
          subject: response.data.data.subject,
          userChecked: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    let id = localStorage.getItem("id");

    await axios.put(`/api/data/update/${id}`, {
      name: input.name,
      subject: input.subject,
      userChecked: true,
    });
    localStorage.removeItem("id");
    fetchData();
  };

  const handleDelete = async (e) => {
    await axios
      .delete(`/api/data/delete/${e}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-book-open text-primary"></i> My
        <span className="text-primary">Data</span>List
      </h1>
      <form id="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="suject"
            value={input.subject}
            name="subject"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">User Agree</label>
          <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        </div>
        <button type="submit" id="submit" className="btn btn-primary btn-block">
          Add Data
        </button>
      </form>
      <button
        style={{ position: "absolute", right: "150px", top: "275px" }}
        className="btn btn-primary btn-block mt-2"
        onClick={handleUpdate}
      >
        Update data
      </button>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        {dataArray.map((ele) => (
          <tbody id="book-list" key={ele._id}>
            <tr>
              <td>{ele.name.slice(0, 1).toUpperCase() + ele.name.slice(1)}</td>
              <td>
                {ele.subject.slice(0, 1).toUpperCase() + ele.subject.slice(1)}
              </td>
              <td>{ele.userChecked}</td>
              <td>
                <a
                  href="#"
                  style={{ backgroundColor: "#DC3545" }}
                  className="btn btn-danger btn-sm delete"
                  onClick={() => {
                    handleDelete(ele._id);
                  }}
                >
                  X
                </a>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-success btn-block"
                  onClick={() => {
                    handleInputData(ele._id);
                    localStorage.setItem("id", ele._id);
                  }}
                >
                  update
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default App;