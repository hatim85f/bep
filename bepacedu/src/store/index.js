import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./admin/adminReducers";
import { authReducer } from "./auth/authReducer";
import { coursesReducer } from "./courses/coursesReducer";
import { helpersReducer } from "./helpers/helpersReducer";
import { usersReducer } from "./users/usersReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    helpers: helpersReducer,
    admin: adminReducer,
    users: usersReducer,
    courses: coursesReducer,
  },
});

export default store;
