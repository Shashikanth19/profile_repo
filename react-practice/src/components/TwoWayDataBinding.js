import { useState } from "react";

export default function TwoWayDataBinding() {
  const [number, updateNumber] = useState(120);
  return (
    <>
      <h1>Number is : {number}</h1>
      {/**Example for one way data binding(useState funtion is an example for one way data binding already we know) */}
      <button
        onClick={() => {
          updateNumber(150);
        }}
      >
        Update Numbe using one way data binding
      </button>
      <br />
      <br />
      {/**Example for two way data binding using onChange */}
      <input
        onChange={(e) => {
          let num = e.target.value;
          updateNumber(num);
        }}
      />
    </>
  );
}
