import React, { useEffect, useState } from "react";
import { getProfile } from "../../firebase";

const Profile = ()=>{

  const [user,setUser] = useState(null);

  useEffect(()=>{
    const load = async ()=>{
      const d = await getProfile();
      setUser(d);
    };
    load();
  },[]);

  if(!user) return <h1>Loading...</h1>;

  return (
    <div style={{color:"white"}}>
      <h1>{user.name}</h1>
      <h2>Favorites</h2>

      {user.favorites?.map((f,i)=>(
        <p key={i}>{f.title}</p>
      ))}
    </div>
  );
};

export default Profile;
