import "./ProfilePage.scss";
import EditProfile from "./EditProfile/EditProfile";
function ProfilePage(props) {
  const { auth, setUser, user } = props;
  // const [user, setUser] = useState({
  //   displayName: auth.currentUser.displayName,
  //   email: auth.currentUser.email,
  //   password: auth.currentUser.password,
  //   photoURL: auth.currentUser.photoURL,
  // });
  return (
    <div style={{ position: "relative" }}>
      <div className="wrapperProfile">
        <div>
          <p className="title">
            <p style={{ color: "white", width: "150px", textAlign: "left" }}>
              Your Name:{" "}
            </p>
            {user.displayName}
          </p>
          <p className="title">
            <p style={{ color: "white", width: "150px", textAlign: "left" }}>
              Your Email:{" "}
            </p>
            {user.email}
          </p>
          <p className="title">
            <p style={{ color: "white", width: "150px", textAlign: "left" }}>
              Your Password:{" "}
            </p>
            *********
          </p>
          <EditProfile auth={auth} setUser={setUser} user={user} />
        </div>

        {user.photoURL != null ? (
          <img src={user.photoURL} alt="John" />
        ) : (
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="John"
          />
        )}
      </div>
      {/* {showEdit ? <EditProfile closeEdit={handleClickEditBtn} /> : ""} */}
    </div>
  );
}

export default ProfilePage;
