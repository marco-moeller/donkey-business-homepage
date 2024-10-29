import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Team from "./pages/Team";
import About from "./pages/About";
import Stream from "./pages/Stream";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import Archive from "./pages/Archive";
import Error from "./pages/Error";
import Impressum from "./pages/Impressum";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<Protected />}>
              <Route path="/archive" element={<Archive />} />
            </Route>
            <Route index element={<Home />} />
            <Route path="/stream" element={<Stream />} />

            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
            <Route path="/impressum" element={<Impressum />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
