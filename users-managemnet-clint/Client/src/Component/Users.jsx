import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  console.log(users);

  const handleAdduser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    const newUser = { name, email };
    console.log(name, email);

    //send data to the server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        event.target.reset()
      });
  };
  return (
    <div>
      <div>
        <h3>add a user</h3>

        <form onSubmit={handleAdduser}>
          <input name="name" type="text" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <button>Add user</button>
        </form>
      </div>

      <div>
        {users.map((user, index) => (
          <div key={index}>
            <h1>{user.Name}</h1>
            <p>{user.Email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

/* 
if you want to this into the server . Then you must follow this process

Have to send request object to the server

1. mention method : post 

2. mention header : about json data in the property of content-type : apllication/json

3. body : JSON.Stringify(newuser);

------------------------------
on the server side use json as middleware

app.use(express.json())



*/
