import { Route, Routes } from "react-router-dom";
import auth from "./Firebase Initializer";
import HomeController from "./Controller/HomeController";
import VideoPlayerController from "./Controller/VideoPlayerController";
import VideoNotFoundPage from "./Views/Content/VideoNotFoundPage/VideoNotFoundPage";
import SignInPage from "./Views/Content/AuthenticationPage/SignInPage";
import SignUpPage from "./Views/Content/AuthenticationPage/SignUpPage";
import MainPage from "./Views/Content/MainPage";
import ProfilePage from "./Views/Content/ProfilePage/ProfilePage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          password: auth.currentUser.password,
          photoURL: auth.currentUser.photoURL,
        });
        console.log("daxacthuc" + user.displayName);
      }
      console.log("chua xac thuc" + user.displayName);
    });
  }, []);
  console.log(user);
  return (
    <div className="App" style={{ width: "1475px", marginTop: "88px" }}>
      <Routes>
        <Route path="/" element={<SignInPage auth={auth} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/MainPage" element={<MainPage auth={auth} user={user} />}>
          <Route index element={<HomeController />} />
          <Route path="VideoPlayer/:id" element={<VideoPlayerController />} />
          <Route path="VideoNotFound" element={<VideoNotFoundPage />} />
          <Route
            path="ProfilePage"
            element={<ProfilePage auth={auth} user={user} setUser={setUser} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
