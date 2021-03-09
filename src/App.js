import "./styles.css";
import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({ active: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("You have submitted the form with data: ", formData);
  };

  const getValue = (target) => {
    const { name, type, value, checked } = target;
    const isCheckbox = type === "checkbox";
    if (isCheckbox) {
      return checked;
    }

    if (name === "pm") {
      return { location: value };
    }

    return value;
  };

  const handleChange = (event) => {
    const eventTarget = event.target;
    const { name } = eventTarget;

    setFormData({
      ...formData,
      [name]: getValue(eventTarget)
    });
  };

  console.log("formData = ", formData);
  const { ccyPair } = formData;
  const isPm = ccyPair === "XAUUSD";
  console.log("isPM ", isPm, ccyPair);

  return (
    <div className="wrapper">
      <h1>How about them currencies</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <span>Currency pair</span>
            <select name="ccyPair" onChange={handleChange}>
              <option value="">--Please select a ccy pair--</option>
              <option value="EURUSD">EURUSD</option>
              <option value="GBPUSD">GBPUSD</option>
              <option value="XAUUSD">XAUUSD</option>
            </select>
          </label>
          {isPm && (
            <label>
              <span>Location</span>
              <select name="pm" onChange={handleChange}>
                <option value="">--Please select a location--</option>
                <option value="London">London</option>
                <option value="Zurich">Zurich</option>
              </select>
            </label>
          )}
          <label>
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              step="1000"
            />
          </label>
          <label>
            <span>Active</span>
            <input type="checkbox" name="active" onChange={handleChange} />
          </label>
          <label>
            <span>Comment</span>
            <textarea name="comment" onChange={handleChange} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
