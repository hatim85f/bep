import { configureStore } from "@reduxjs/toolkit";
import { aboutReducer } from "./about/aboutReducer";
import { adminReducer } from "./admin/adminReducers";
import { authReducer } from "./auth/authReducer";
import { coursesReducer } from "./courses/coursesReducer";
import { groupsReducer } from "./groups/groupsReducer";
import { helpersReducer } from "./helpers/helpersReducer";
import { homeReducer } from "./homeData/homeReducer";
import { paymentsReducer } from "./payments/paymentsReducer";
import { usersReducer } from "./users/usersReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    helpers: helpersReducer,
    admin: adminReducer,
    users: usersReducer,
    courses: coursesReducer,
    groups: groupsReducer,
    payments: paymentsReducer,
    home: homeReducer,
    about: aboutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }),
});

export default store;
