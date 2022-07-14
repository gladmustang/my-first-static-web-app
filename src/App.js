import axios from 'axios'
import React, { useEffect, useState } from "react";


async function getUser() {
  try {
    const response = await axios.get('/api/users');
    console.log(response);
    return response.data
  } catch (error) {
    console.error(error);
  }
}



function App() {
  const [user, setUser] = useState("default user");
  useEffect( () => {
    (async () => {
      let result = await getUser()
      setUser(result)
    })();

  }, []);

  const value = 'World';
  return <div>Hello {user}</div>;
}

export default App;
