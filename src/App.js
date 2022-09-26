import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, OG, NotFound } from "./pages";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/og" element={<OG />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
