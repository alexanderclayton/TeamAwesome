import { useState } from "react";
import AvatarAdd from "../UploadAvatar/UploadAvatar";

const EditProfile = ({
  name,
  setName,
  username,
  setUsername,
  bio,
  setBio,
  onSave,
  onCancel,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [imageUrl, setImageURL] = useState("");

  const handleAvatarChange = (imageURL) => {
    setImageURL(imageURL);
  };
  return (
    <div>
      <AvatarAdd onChange={handleAvatarChange} />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Bio:</label>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditProfile;
