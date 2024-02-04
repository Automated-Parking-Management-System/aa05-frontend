import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmThePasswordReset } from "../firebase/Firebase";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

function PasswordReset() {
  /**
   * Extract oobCode from the URL.
   * Delete console.log in production.
   */
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;

  const oobCode = searchParams.get("oobCode");

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords did not match.");
      return;
    }

    try {
      if (oobCode) {
        await confirmThePasswordReset(oobCode, confirmPassword);
        resetFormFields();
        setSuccessMessage(true);
      } else {
        alert("Something is wrong; try again later!");
        console.log("missing oobCode");
      }
    } catch (error) {
      if (error.code === "auth/invalid-action-code") {
        alert("Something is wrong; try again later.");
      }
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      {successMessage ? (
        <div>
          <h3>Success! Your Password change successfully</h3>
          <button onClick={() => navigate("/")}>Go to the Login page</button>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="New Password"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
