import React from "react";
import Child from "./child";

const Parent = () => {
  const ids = [
    {
      id: 15,
      name: "shashi",
      age: 24,
    },
    {
      id: 16,
      name: "kanth",
      age: 24,
    },
  ];
  return (
    <>
      {ids.map((u) => {
        return <Child id={u.id} name={u.name} age={u.age} />;
      })}
    </>
  );
};

export default Parent;
