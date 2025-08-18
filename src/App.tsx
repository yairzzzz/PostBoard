import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { themeStore } from "./store/themeStore";
import AddNewPost from "./pages/AddNewPost";
import { Bounce, ToastContainer } from "react-toastify";
import ViewPostPage from "./pages/ViewPostPage";

function App() {
  const { theme } = themeStore();

  return (
    <div data-theme={theme} className="h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<AddNewPost />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
