// import "./Home.css";
// import { styles } from "./Home.module.css";

import { Link } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar";

function Home() {
  const page_title = "HOME";

  return (
    <div>
      <Navbar pageTitle="Home" />
    </div>
  );
}

export default Home;
