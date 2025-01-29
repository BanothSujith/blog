import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideNavBar from "./components/SideNavBar";
import Routers from "./components/routes/Routers";
import BlogType from "./components/pages/BlogType";
function App() {
  return (
    <BrowserRouter>

    <div className="w-full h-screen flex overflow-hidden">
    <div className="h-full">
        <SideNavBar />
      </div>
      <div className="flex flex-col bg-[#1d1d1f] w-full h-full gap-1">
      <Navbar />
      <Routers/>

      </div>
</div>
    </BrowserRouter>

  );
}

export default App;
