import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const nameRef = useRef();
  const selecedtDataRef = useRef();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = {
      name: nameRef.current.value,
      selecedtData: selecedtDataRef?.current?.value,
    };
    console.log(info);
    // add data info the mongodb
    try {
      setMessage("");
      const url = "http://localhost:8000/addData";
      const option = {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      if (data) {
        setMessage("Your data added into database successfully.");
        nameRef.current.value = "";
        selecedtDataRef.current.value = "";
        window.location.reload();
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="fname" className="form-label">
              Name
            </label>
          </div>
          <div>
            <input
              ref={nameRef}
              type="text"
              id="fname"
              name="name"
              placeholder="name.."
              className="form-control"
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="select" className="form-label">
              select data
            </label>
          </div>

          <div>
            <select
              id="select"
              name="selectedData"
              className="input-group form-select"
              ref={selecedtDataRef}
            >
              <option value="">Choose</option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
