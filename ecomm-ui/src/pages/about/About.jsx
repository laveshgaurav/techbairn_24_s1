import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";
import axios from "axios";

function About() {
  const [userInput, setUserInput] = useState({});

  const handleUserInput = (e) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowOutput = () => {
    console.log(userInput);
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      // Get current position
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          // Success callback
          const latitude = position.coords.latitude.toFixed(2);
          const longitude = position.coords.longitude.toFixed(2);
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);

          try {
            let { data } = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=21c5218c8432673195dc2ac2002a1e53`
            );

            console.log(data);
          } catch (e) {
            console.log(e);
          }

          // Here, you can do whatever you want with the latitude and longitude data
        },
        function (error) {
          // Error callback
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // Geolocation not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <Navbar pageTitle="About Us" />

      <input
        placeholder="Enter Name"
        name="userName"
        onChange={handleUserInput}
        value={userInput.userName}
      />

      <input
        placeholder="Enter Email"
        name="userEmal"
        onChange={handleUserInput}
        value={userInput.userEmail}
      />

      <select
        name="userGender"
        onChange={handleUserInput}
        value={userInput.userGender}
      >
        <option value="" disabled selected>
          Select Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button onClick={handleShowOutput}>Output</button>
    </div>
  );
}

export default About;
