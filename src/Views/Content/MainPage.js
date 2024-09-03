import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function MainPage(props) {
  const { user } = props;
  console.log(user);
  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}

export default MainPage;
