import { BrowserRouter, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideNavBar from "./components/SideNavBar";
import Routers from "./components/routes/Routers";
import { useSelector } from "react-redux";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="w-full h-screen flex overflow-hidden bg-sujith">
      {!hideLayout  && <div className="h-full"><SideNavBar /></div>}
      <div className="flex flex-col bg-[var(--bg-body)] w-full h-full">
        {!hideLayout  && <Navbar />}
        <Routers />
      </div>
    </div>
  );
}

function App() {
const theme= useSelector((state)=>state.theme.currentTheme)

  return (
    <BrowserRouter>
    <div className={`${theme}`}>
    <Layout />
    </div>
      
    </BrowserRouter>
  );
}

export default App;
