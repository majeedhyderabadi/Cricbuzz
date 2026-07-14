// import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import NVianDashboard from "./Pages/NVianDashboard.tsx";
import MatchDetailsPage from "./Pages/MatchDetailsPage/MatchDetailsPage.tsx";
import Login from "./Pages/Login.tsx";
import AccessDenied from "./Pages/AccessDenied.tsx";
import SuperAdmin from "./Pages/SuperAdmin.tsx";
import Fixtures from "./Pages/Admin/Fixtures.tsx";
import Commentary from "./Pages/Admin/Commentary.tsx";
import TeamsPlayers from "./Pages/Admin/TeamAndPlayersTab/TeamsPlayers.tsx";
import RegistrationForm from "./Pages/RegistrationForm.tsx";



function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/nvian" element={<NVianDashboard />} />
                    <Route path="/match/:matchId" element={<MatchDetailsPage/>} />
                    <Route 
                        path="/admin/fixtures" 
                        element={
                            <ProtectedRoute 
                                element={<Fixtures />} 
                                requireAdmin={true}
                            />
                        } 
                    />
                    <Route 
                        path="/admin/teams-players" 
                        element={
                            <ProtectedRoute 
                                element={<TeamsPlayers />} 
                                requireAdmin={true}
                            />
                        } 
                    />
                    <Route 
                        path="/admin/commentary" 
                        element={
                            <ProtectedRoute 
                                element={<Commentary />} 
                                requireAdmin={true}
                            />
                        } 
                    />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute 
                                element={<Navigate to="/admin/fixtures" replace />} 
                                requireAdmin={true}
                            />
                        } 
                    />
                    <Route 
                        path="/superadmin" 
                        element={
                            <ProtectedRoute 
                                element={<SuperAdmin />} 
                                requireAdmin={true}
                            />
                        } 
                    />
                    <Route path="/access-denied" element={<AccessDenied />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;