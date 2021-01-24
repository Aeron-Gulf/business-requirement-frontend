import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from "./components/register.component";
import ListUser from "./components/listUser.component";

function App() {

  const [status, setStatus] = useState(false)
  
    return (
      <div>
        <div className="container-fluid">
          <Register setStatus={setStatus}/>
          <ListUser status={status}/>
        </div>
      </div>
    );
};

export default App;