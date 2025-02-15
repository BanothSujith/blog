import { React, lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SideNavBar from "./components/SideNavBar";
import Routers from "./routes/Routers";
import { setSettingsPageRequest } from "./reduxstore/slices";
const Settingspage = lazy(() => import("./components/pages/SettingsPage"));

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
  const isSettingspageOpen = useSelector((state) => state.videoPlaying.isSettingsPageRequest);
  const dispatch = useDispatch(); 
  const settingsRef = useRef(null);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target) && !event.target.closest(".settings") ){
        dispatch(setSettingsPageRequest()); 
      }
    };

    if (isSettingspageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingspageOpen, dispatch]); 

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[var(--bg-body)]">
      <div className="w-full">{!hideLayout && <Navbar />}</div>

      <div className="h-full lg:flex justify-center items-center">
        <div className="hidden lg:block">{!hideLayout && <SideNavBar />}</div>
        <div className="relative w-full h-full">
          <Routers />

          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <AnimatePresence>
              {isSettingspageOpen && (
                <motion.div
                  ref={settingsRef}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="absolute h-full top-0 right-0 w-fit"
                >
                  <Settingspage />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function App() {
  const theme = useSelector((state) => state.theme.currentTheme);
  return (
    <BrowserRouter>
      <div className={`${theme} font-[Nunito]`}>
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
