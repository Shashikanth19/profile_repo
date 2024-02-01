import React, { lazy, Suspense, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm() {
  const [showForm, setShowForm] = useState(true);
  const Form = lazy(() => import('./components/Form'));

  const handleHideClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Click Button To Show/Hide Login Form</h1>
        <button
          onClick={handleHideClick}
          className="btn btn-primary"
        >
          {showForm ? "Hide" : "Show"}
        </button>

        {showForm && (
          <Suspense fallback={<div>Loading...</div>}>
            <Form />
          </Suspense>
        )}
      </div>
    </>
  );
}
