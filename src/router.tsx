import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./pages/Auth/SignUp";
import SignInSide from "./pages/Auth/SignInSide";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllOrders from "./pages/Orders/AllOrders";
import Profile from "./pages/Profile/Profile";
import DoctorList from "./pages/Profile/DoctorList";
import PatientGeneralInfoEdit from "./pages/PatientInfo/PatientGeneralInfoEdit";
import PatientInfoHistoryInfoEdit from "./pages/PatientInfo/PatientHistoryInfoEdit";
import PatientInfo from "./pages/PatientInfo/PatientGeneralInfo";
import PatientHistoryInfo from "./pages/PatientInfo/PatientHistoryInfo";
import PatientEncounterInfo from "./pages/PatientInfo/PatientEncounterInfo";

import PatientList from "./pages/PatientInfo/PatientList";
import Appointments from "./pages/Appointments/Appointments";
import Calender from "./pages/Calender/Calender";
import Kanban from "./pages/Kanban/Kanban";
import Account from "./pages/Account/Account";
import Settings from "./pages/Settings/Settings";
import { mockPatientData } from "./mockData";
import PdfViewer from "./components/Pdf";
import Encounter from "./components/Encounter";


const USER_TYPES = {
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User"
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;

const AdminElement = ({ children }: any) => {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInSide />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <SignInSide />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/forgot",
    element: <ForgotPassword />
  },
  {
    path: "/dashboard",
    element: (
      <AdminElement>
        <Dashboard />
      </AdminElement>
    )
  },
  {
    path: "/orders",
    element: (
      <AdminElement>
        <AllOrders />
      </AdminElement>
    )
  },
  {
    path: "/profile",
    element: (
      <AdminElement>
        <Profile />
      </AdminElement>
    )
  },
  {
    path: "/patient-info-general",
    element: (
      <AdminElement>
        <PatientGeneralInfoEdit/>
      </AdminElement>
    )
  },
  {
    path: "/patient-info-history",
    element: (
      <AdminElement>
        <PatientInfoHistoryInfoEdit/>
      </AdminElement>
    )
  },
  {
    path: "/patient-info-encounter",
    element: (
      <AdminElement>
        <PatientEncounterInfo/>
      </AdminElement>
    )
  },
  {
    path: "/patient-info/:id",
    element: (
      <AdminElement>
        <PatientInfo patients={mockPatientData} />
      </AdminElement>
    )
  },
  
  {
    path: "/patient-info-history/:id",
    element: (
      <AdminElement>
        <PatientHistoryInfo patients={mockPatientData} />
      </AdminElement>
    )
  },
  {
    path: "/patient-info-encounter/:id",
    element: (
      <AdminElement>
        <PatientEncounterInfo patients={mockPatientData} />
      </AdminElement>
    )
  },  
  {
    path: "/patient-list",
    element: (
      <AdminElement>
        <PatientList data={mockPatientData} />
      </AdminElement>
    )
  },
  
  {
    path: "/doctor-list",
    element: (
      <AdminElement>
        <DoctorList />
      </AdminElement>
    )
  },
  {
    path: "/appointments",
    element: (
      <AdminElement>
        <Appointments />
      </AdminElement>
    )
  },
  {
    path: "/calender",
    element: (
      <AdminElement>
        <Calender />
      </AdminElement>
    )
  },
  {
    path: "/kanban",
    element: (
      <AdminElement>
        <Kanban />
      </AdminElement>
    )
  },
  {
    path: "/account",
    element: (
      <AdminElement>
        <Account />
      </AdminElement>
    )
  },
  {
    path: "/settings",
    element: (
      <AdminElement>
        <Settings />
      </AdminElement>
    )
  },
  {
    path: "/pdf-viewer",
    element: (
      <AdminElement>
        <PdfViewer />
      </AdminElement>
    )
  },
  {
    path: "/encounter",
    element: (
      <AdminElement>
        <Encounter />
      </AdminElement>
    )
  }
]);
