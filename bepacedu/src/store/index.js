import { configureStore } from "@reduxjs/toolkit";
import { aboutReducer } from "./about/aboutReducer";
import { adminReducer } from "./admin/adminReducers";
import { articlesReducer } from "./articles/articlesReducer";
import { authReducer } from "./auth/authReducer";
import { coursesReducer } from "./courses/coursesReducer";
import { eventsReducer } from "./events/eventsReducer";
import { formsReducer } from "./forms/formsReducser";
import { groupsReducer } from "./groups/groupsReducer";
import { helpersReducer } from "./helpers/helpersReducer";
import { homeReducer } from "./homeData/homeReducer";
import { notificationsReducer } from "./notifications/notificationsReducer";
import { paymentsReducer } from "./payments/paymentsReducer";
import { userReducer } from "./user/userReducer";
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
    notifications: notificationsReducer,
    articles: articlesReducer,
    events: eventsReducer,
    forms: formsReducer,
    profile: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }),
});

export default store;
