import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./EditProfile.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";

function EditProfile(props) {
  const { auth, setUser, user } = props;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Name");
  const [showLoading, setShowLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateInfo = async () => {
    if (value === "Name") {
      if (document.querySelector('input[name="name"]').value != "") {
        let name = document.querySelector('input[name="name"]').value;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            console.log(`ga${name}`);
            setUser({
              ...user,
              displayName: name,
            });
            console.log("update name successful!");
            handleClose();
            setShowLoading(false);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
    } else if (value === "Password") {
      if (
        document.querySelector('input[name="newPassword"]').value ===
        document.querySelector('input[name="reNewPassword"]').value
      ) {
        // const credential = promptForCredentials();
        const credential = EmailAuthProvider.credential(
          user.email,
          document.querySelector('input[name="currentPassword"]').value
        );
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            updatePassword(
              auth.currentUser,
              document.querySelector('input[name="newPassword"]').value
            )
              .then(() => {
                console.log("update password successful!");
                handleClose();
                setShowLoading(false);
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`Your current password is invalid`);
          });
      }
    } else {
      if (document.querySelector('input[name="fileImg"]').value) {
        const oldPhotoURL = user.photoURL;
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const storageRef = ref(storage, `images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          document.querySelector('input[name="fileImg"]').files[0],
          metadata
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              // ...
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateProfile(auth.currentUser, {
                photoURL: downloadURL,
              })
                .then(() => {
                  setUser({
                    ...user,
                    photoURL: downloadURL,
                  });
                  console.log("update photo successful!");
                  const desertRef = ref(storage, oldPhotoURL);
                  // Delete the old file
                  deleteObject(desertRef)
                    .then(() => {
                      console.log("File deleted successfully");
                    })
                    .catch((error) => {
                      console.log(`${error}`);
                    });

                  handleClose();
                  setShowLoading(false);
                })
                .catch((error) => {
                  console.log(`${error}`);
                });
            });
          }
        );

        //
      }
    }
    // setTimeout(() => {
    //   handleClose();
    //   setShowLoading(false);
    // }, 5000);
  };

  const ContentEdit = () => {
    if (value === "Name") {
      return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Your new name</Form.Label>
          <Form.Control
            style={{ paddingLeft: "10px" }}
            type="text"
            name="name"
            placeholder="Enter your name"
            autoFocus
          />
        </Form.Group>
      );
    } else if (value === "Password") {
      return (
        <>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter current password</Form.Label>
            <Form.Control
              style={{ paddingLeft: "10px" }}
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your new password</Form.Label>
            <Form.Control
              style={{ paddingLeft: "10px" }}
              type="password"
              name="newPassword"
              placeholder="Enter new password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              style={{ paddingLeft: "10px" }}
              type="password"
              name="reNewPassword"
              placeholder="Confirm password"
            />
          </Form.Group>
        </>
      );
    } else {
      return (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose your picture</Form.Label>
          <Form.Control
            name="fileImg"
            style={{ height: "31px", padding: "0 0 0 12px", margin: "0" }}
            type="file"
            accept="image/*"
          />
        </Form.Group>
      );
    }
  };

  return (
    <>
      <Button
        style={{ transform: "translateX(70%)" }}
        variant="info"
        onClick={handleShow}
      >
        Edit your profile
      </Button>
      <Modal show={showLoading} fullscreen={true}>
        <Modal.Body
          className="modalLoading"
          style={{ backgroundColor: "#111111", display: "flex" }}
        >
          <Spinner
            className="loadingSpinner"
            style={{ margin: "auto" }}
            animation="border"
            variant="light"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>

      <Modal variant="dark" show={show} onHide={handleClose}>
        <Modal.Header variant="dark">
          <Modal.Title>
            <DropdownButton id="dropdown-item-button" title={value}>
              <Dropdown.Item as="button" onClick={() => setValue("Name")}>
                Name
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setValue("Password")}>
                Password
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setValue("Picture")}>
                Picture
              </Dropdown.Item>
            </DropdownButton>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ContentEdit />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowLoading(true);
              updateInfo();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
