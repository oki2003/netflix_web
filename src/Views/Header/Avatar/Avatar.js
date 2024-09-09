import { Link, useNavigate } from "react-router-dom";
import "./Avatar.scss";
import { getAuth, signOut } from "firebase/auth";

function Avatar(props) {
  const navigate = useNavigate();
  const { user } = props;
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log(`Error:${error}`);
      });
  };
  return (
    <div className="wrapperAvatar">
      {user.photoURL != null ? (
        <img alt="Ảnh ko tải được" src={user.photoURL} className="avatar" />
      ) : (
        <img
          alt="Ảnh ko tải được"
          src="https://yt3.ggpht.com/ytc/AIf8zZQXbNVQ62-nmg3oiXjPxOfyF5jNDEcOnKTjGEgFqP19SNz68Z3_5smY3nwYv32dnA=s88-c-k-c0x00ffffff-no-rj"
        />
      )}
      <div className="wrapperContentAvatar">
        <Link to="/MainPage/ProfilePage" className="contentAvatar">
          Your Profile
        </Link>
        <div
          style={{ height: "1px", width: "100%", backgroundColor: "#4d4d4d" }}
        ></div>
        <button className="contentAvatar" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Avatar;
