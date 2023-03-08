import { Avatar } from 'antd';
import { useState } from 'react';

const Home = () => {
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Upload the image file to a database or file storage service
    // and get the URL of the uploaded file.
    const url = 'https://example.com/images/' + file.name;
    setImageURL(url);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated name, username, and bio to the database.
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the name, username, and bio to the original values.
  };

  return (
    <main>
      <div style={{ display: isEditing ? 'none' : 'block' }}>
        <Avatar size={104} src={imageURL} />
        <h2>{name}</h2>
        <p>@{username}</p>
        <p>{bio}</p>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      </div>
      <div style={{ display: isEditing ? 'block' : 'none' }}>
        <Avatar size={104} src={imageURL} />
        <input type="file" onChange={handleImageUpload} />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </main>
  );
};

export default Home;

