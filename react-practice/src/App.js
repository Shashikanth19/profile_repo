import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../src/components/MyVerticallyCenteredModal'
import LoginModal from "./components/LoginModal";
export default function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
    <LoginModal></LoginModal>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
}
