import { Route, Routes } from "react-router-dom";
import AddUsers from "./pages/admin/AddUsers";
import Dashboard from "./pages/admin/Dashboard";
import MainAdminPage from "./pages/admin/MainAdminPage";
import ManageUsers from "./pages/admin/ManageUsers";
import ShowUsers from "./pages/admin/ShowUsers";
import AdminAuth from "./pages/auth/AdminAuth";
import Registeration from "./pages/registeration/Registeration";
import CoursesData from "./pages/admin/CoursesData";
import CoursesShow from "./pages/admin/CoursesShow";
import Groups from "./pages/admin/Groups";
import Payments from "./pages/admin/Payments";
import EditCourse from "./pages/admin/EditCourse";
import HomePage from "./pages/home/HomePage";
import UserHome from "./pages/userHomePage/UserHome";
import Resolve from "./pages/auth/Resolve";
import ModifyHome from "./pages/admin/modifyHome/ModifyHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registeration" element={<Registeration />} />
      <Route path="/resolve" element={<Resolve />} />
      <Route path="/home" element={<UserHome />} />
      <Route path="/auth" element={<AdminAuth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admins_data" element={<MainAdminPage />} />
      <Route path="/users" element={<ShowUsers />} />
      <Route path="/users/add_users" element={<AddUsers />} />
      <Route path="/users/manage" element={<ManageUsers />} />
      <Route path="/admin/courses" element={<CoursesData />} />
      <Route path="/admin/courses/course_details" element={<CoursesShow />} />
      <Route path="admin/groups" element={<Groups />} />
      <Route path="/admin/payments" element={<Payments />} />
      <Route path="/admin/edit_course" element={<EditCourse />} />
      <Route path="/admin/modify_home" element={<ModifyHome />} />
    </Routes>
  );
}

export default App;
