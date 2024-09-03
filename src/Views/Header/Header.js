import { ReactComponent as Logo } from "../../assest/logo.svg";
import "./Header.css";
import IdeaSearch from "./IdeaSearch/IdeaSearch";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar/Avatar";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchModel from "../../Models/SearchModel";

function Header(props) {
  const { user } = props;
  console.log(user);
  const [value, setValue] = useState("");
  const [ideaSearch, setIdeaSearch] = useState([]);
  const [showIdea, setShowIdea] = useState(true);
  let idTimer = useRef(0);
  function handleSearch(e) {
    setValue(e.target.value);
  }

  function handleBlurSearch() {
    setShowIdea(false);
  }

  function handleClickSearch() {
    setShowIdea(true);
  }

  useEffect(() => {
    clearTimeout(idTimer.current);
    idTimer.current = setTimeout(async () => {
      const results = await SearchModel(value);
      setIdeaSearch(results);
    }, 400);
  }, [value]);
  return (
    <div className="header">
      <Link to="/" style={{ height: "100%" }}>
        <Logo className="logo"></Logo>
      </Link>

      <InputGroup id="search-header">
        <Form.Control
          onBlur={handleBlurSearch}
          value={value}
          onChange={handleSearch}
          onClick={handleClickSearch}
          placeholder="Tìm kiếm"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <IdeaSearch data={ideaSearch} check={showIdea} />
        <Button variant="secondary" id="button-addon2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
      <div className="wrapperRightHeader">
        <FontAwesomeIcon icon={faBell} />
        <Avatar user={user} />
      </div>
    </div>
  );
}

export default Header;
