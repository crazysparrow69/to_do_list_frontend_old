import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchAuthMe } from "./redux/slices/auth/thunk";
import ROUTES from "./routes";
import TRANSLATIONS from "./lang";
import { Language } from "./types";
import { selectTheme } from "./redux/slices/auth/selectors";

import "./styles/reset.scss";
import "./styles/typography.scss";
import "./styles/global-styles.scss";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Home = lazy(() => import("./pages/Home/Home"));
const Task = lazy(() => import("./pages/Task/Task"));

i18next.use(initReactI18next).init({
  lng: localStorage.getItem("lang") || Language.EN,
  debug: true,
  resources: TRANSLATIONS,
  fallbackLng: "en",
});

function App() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);
  document.documentElement.className = `${theme}_theme`;

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
          </Route>
          <Route path={ROUTES.HOME} element={<PageLayout />}>
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.TASK} element={<Task />} />
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
