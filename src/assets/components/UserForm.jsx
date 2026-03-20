import { useState } from "react";

function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px"
        }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px"
        }}
      />

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserForm;
