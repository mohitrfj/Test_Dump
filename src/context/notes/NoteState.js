import { useState } from "react";
import NoteContext from "../NoteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Mohit",
    class: "12",
  };

  const [state, setState] = useState(s1);

  const update = () => {
    setInterval(() => {
      setState({
        name: "Rohit",
        class: "11",
      });
    }, 1500);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
