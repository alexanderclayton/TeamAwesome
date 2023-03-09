import React, { useState } from "react";
import { useFileUploadAvatar } from "../utils/firebase";

const AvatarAdd = () => {
  const [avatar, setAvatar] = useState(null);
  const { fileUpload } = useFileUploadAvatar();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!avatar) {
      return;
    }
    fileUpload(avatar);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="avatar">Choose an avatar:</label>
      <input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
      <button type="submit" onClick={handleSubmit}>Upload Avatar</button>
    </form>
  );
};

export default AvatarAdd;