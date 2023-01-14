import "./App.css";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import NavContext from "./Context/NavContext";
import DashboardPage from "./Pages/DashboardPage";
import WorkspacePage from "./Pages/WorkspacePage";
import DocumentPage from "./Pages/DocumentPage";
import UserPage from "./Pages/UserPage";
import UserProfile from "./components/User/UserProfile";
import AddUser from "./components/User/AddUser";
import DocumentDetail from "./components/Document/DocumentDetail";
import WorkspaceDetail from "./components/Workspace/WorkspaceDetail";
import Login from "./components/Login/Login";
import NotFound from "./Pages/NotFound";
import Profile from "./components/RightNavbar/Submenus/Profile";
import RouteAuth from "./components/Route/RouteAuth";
import DepartemenPage from "./Pages/DepartemenPage";
import UnitPage from "./Pages/UnitPage";
import RekapPage from "./Pages/RekapPage";

function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="loginform">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
        <NavContext.Provider value={value}>
          <Navbar />
          <Container
            stickyNav={<RightNavbar />}
            content={
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <RouteAuth>
                      <DashboardPage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/settings/profile/:userId"
                  element={
                    <RouteAuth>
                      <Profile />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/department"
                  element={
                    <RouteAuth>
                      <DepartemenPage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/department/:departemenId/unit"
                  element={
                    <RouteAuth>
                      <UnitPage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/department/:departemenId/unit/:unitId/workspace"
                  element={
                    <RouteAuth>
                      <WorkspacePage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/department/:departemenId/unit/:unitId/workspace/:workspaceId/detail"
                  element={
                    <RouteAuth>
                      <WorkspaceDetail />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/workspace/:workspaceId/detail/documents"
                  element={
                    <RouteAuth>
                      <DocumentPage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/workspace/:workspaceId/detail/documents/document-detail/:documentId"
                  element={
                    <RouteAuth>
                      <DocumentDetail />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <RouteAuth>
                      <UserPage />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/users/add-user"
                  element={
                    <RouteAuth>
                      <AddUser />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/users/profile/:userId"
                  element={
                    <RouteAuth>
                      <UserProfile />
                    </RouteAuth>
                  }
                />
                <Route
                  path="/export"
                  element={
                    <RouteAuth>
                      <RekapPage />
                    </RouteAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            }
          />
          {/* <ReactQueryDevtools position="bottom-right" /> */}
        </NavContext.Provider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
