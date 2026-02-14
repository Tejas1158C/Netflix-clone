import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getProfile, removeFromMyList } from "../../firebase";
import { Link } from "react-router-dom";
import "./MyList.css";

const MyList = () => {

  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getProfile();
    setUser(data);
    setList(data?.myList || []);
  };

  const removeMovie = async (movie) => {
    await removeFromMyList(user.id, movie);
    load();
  };

  return (
    <>
      <Navbar />

      <div className="mylist-page">
        <h1>My List</h1>

        <div className="mylist-grid">
          {list.map((m, i) => (
            <div className="mylist-card" key={i}>

              <Link to={`/player/${m.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.poster}`}
                />
              </Link>

              <div className="overlay">
                <button onClick={() => removeMovie(m)}>
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyList;
