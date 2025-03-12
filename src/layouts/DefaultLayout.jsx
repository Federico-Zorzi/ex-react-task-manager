import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
//import Main from "../components/layout/Main";
//import Footer from "../components/layout/Footer";

export default function DefaultLayout() {
  return (
    <div id="wrapper">
      <Header></Header>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
}
