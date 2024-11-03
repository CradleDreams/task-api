import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}

export default App;
