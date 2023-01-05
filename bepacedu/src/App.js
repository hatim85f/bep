import { Route, Routes } from "react-router-dom";
import AddUsers from "./pages/admin/AddUsers";
import Dashboard from "./pages/admin/Dashboard";
import MainAdminPage from "./pages/admin/MainAdminPage";
import ManageUsers from "./pages/admin/ManageUsers";
import ShowUsers from "./pages/admin/ShowUsers";
import AdminAuth from "./pages/auth/AdminAuth";
import Registeration from "./pages/registeration/Registeration";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Registeration />} />
      <Route path="/admin_auth" element={<AdminAuth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admins_data" element={<MainAdminPage />} />
      <Route path="/users" element={<ShowUsers />} />
      <Route path="/users/add_users" element={<AddUsers />} />
      <Route path="/users/manage" element={<ManageUsers />} />
    </Routes>
  );
}

export default App;
