import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, OG, NotFound, Team, Minting } from "./pages";
import styles from "./App.module.scss";
import { GlobalContextProvider } from "./utils/context";
import "./App.css";

function App() {
  return (
    <div className={styles.container}>
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<NotFound />} />
            <Route path="/og" element={<OG />} />
            <Route path="/team" element={<Team />} />
            <Route path="/minting" element={<Minting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
