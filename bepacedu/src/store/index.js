import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./admin/adminReducers";
import { authReducer } from "./auth/authReducer";
import { coursesReducer } from "./courses/coursesReducer";
import { groupsReducer } from "./groups/groupsReducer";
import { helpersReducer } from "./helpers/helpersReducer";
import { usersReducer } from "./users/usersReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    helpers: helpersReducer,
    admin: adminReducer,
    users: usersReducer,
    courses: coursesReducer,
    groups: groupsReducer,
  },
});

export default store;
