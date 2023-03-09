import { Avatar } from 'antd';

const UserProfile = ({ name, username, bio, avatarUrl, setIsEditing, handleScreenshot }) => {

  return (
    <>
      <Avatar size={104} src={avatarUrl} />
      <h2>{name}</h2>
      <p>@{username}</p>
      <p>{bio}</p>
      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      <button onClick={handleScreenshot}>Save Screenshot</button>
    </>
  );
};

export default UserProfile;
