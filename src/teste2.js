import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import Timer from "./store/teste";

export const TestePage2 = observer(() => {
  const [timer2, setTimer2] = useState(0);
  function addTimer2(params) {}
  return (
    <div>
      <h1>Pagina 2</h1>
      <h3>Score: {Timer.secondsPassed}</h3>
      <h3>Score2: {timer2}</h3>
      <button onClick={() => setTimer2((old) => old + 1)}>Timer 2</button>
    </div>
  );
});
