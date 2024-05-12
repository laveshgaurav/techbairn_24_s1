// import "./Home.css";
// import { styles } from "./Home.module.css";

import { Link } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";
import { useEffect, useState } from "react";
import Test from "../../components/Test";
import axios from "axios";

function Home() {
  const [userData, setUserData] = useState([]);
  const [userInput, setUserInput] = useState({});

  const handleUserInput = (e) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const newData = {
      ...userInput,
      id: userData.length + 1,
    };

    setUserData((prev) => [...prev, newData]);
  };

  const handleDataFetch = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUserData(response?.data);
    } catch (e) {}
  };

  const handleDataDelete = (id) => {
    console.log("Id is", id);
    setUserData(userData.filter((d) => d.id !== id));
  };

  useEffect(() => {
    handleDataFetch();

    return () => {
      console.log("Component Destroyed");
    };
  }, []);

  const TableHeaders = [
    "Id",
    "Name",
    "Username",
    "City",
    // "Zipcode",
    // "Phone",
    // "Website",
    // "Company Name",
    "Delete",
  ];

  return (
    <div>
      <Navbar pageTitle="Home" />
      <table id="customers">
        <thead>
          <tr>
            {TableHeaders.map((item, key) => (
              <th key={key}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData?.map((data, key) => (
            <tr key={key}>
              <td>{data?.id}</td>
              <td>
                {/* <input
                  value={data?.name}
                  onChange={(e) =>
                    setUserData((prev) =>
                      prev.map((i) =>
                        i.id === data.id
                          ? {
                              ...i,
                              name: e.target.value,
                            }
                          : i
                      )
                    )
                  }
                /> */}
                {data?.name}
              </td>
              <td>{data?.username}</td>
              <td>{data?.address?.city}</td>
              {/* <td>{data?.address?.zipcode}</td>
              <td>{data?.phone}</td>
              <td>{data?.website}</td>
              <td>{data?.company?.name}</td> */}
              <td>
                <button
                  className="Delete"
                  onClick={() => handleDataDelete(data?.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input
                value={userInput.name}
                onChange={handleUserInput}
                name="name"
                placeholder="Name"
              />
            </td>

            <td>
              <input
                value={userInput.username}
                onChange={handleUserInput}
                name="username"
                placeholder="Username"
              />
            </td>

            <td>
              <input
                value={userInput.city}
                onChange={handleUserInput}
                name="city"
                placeholder="City"
              />
            </td>
            <td>
              <button className="Delete" onClick={handleSave}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
