import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
export default function LoginModal() {
    const [addLogin, setAddLogin] = useState(false)
    const [loginApiData, setLoginApiData] = useState({})
    const onAddLoginModel = (seleted) => {
        if(seleted){
            setLoginApiData(seleted);
        }else {
            setLoginApiData(!addLogin)
        }
        setAddLogin(!addLogin)
    }
  return (
    <>
    <Button onClick={() => onAddLoginModel("")}>Login</Button>
      <Modal centered show={addLogin} onHide={onAddLoginModel} className="">
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            // onSubmit={ad}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
            }) => {
                <Form onSubmit={handleSubmit}>
                    <input
                        placeholder="Enter Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        id="email"
                        type="text"
                    >
                    </input>
                    <input
                        placeholder="Enter Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name="password"
                        id="password"
                        type="password"
                    >
                    </input>
                    <Button>Back</Button>
                    <Button>Submit</Button>
                </Form>
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
