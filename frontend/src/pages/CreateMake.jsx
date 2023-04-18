import { useState } from "react";
import axios from "axios";

import "./CreateMake.css";

export default function CreateMake() {
  const [makeName, setMakeName] = useState("");
  const [makeLogo, setMakeLogo] = useState();

  const handleMakeLogo = (e) => {
    // console.log(e.target.files[0]);
    if (
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpeg"
    ) {
      setMakeLogo();
      // eslint-disable-next-line no-alert
      alert("You must select a PNG or a JPEG file");
    } else {
      setMakeLogo(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!makeName || !makeLogo) {
      // eslint-disable-next-line no-alert
      alert("You must provide a name and a file");
    } else {
      const formData = new FormData();

      formData.append("file", makeLogo);
      formData.append("data", JSON.stringify({ makeName }));

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/makes`, formData)
        .then(({ data }) => {
          // eslint-disable-next-line no-restricted-syntax
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <form className="create-make" onSubmit={handleSubmit}>
      <label htmlFor="makeName">
        Make Name:{" "}
        <input
          id="makeName"
          type="text"
          value={makeName}
          onChange={(e) => {
            setMakeName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="makeLogo">
        Make Logo:{" "}
        <input
          id="makeLogo"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleMakeLogo}
        />
      </label>
      <button type="submit">Create a new Make</button>
    </form>
  );
}
