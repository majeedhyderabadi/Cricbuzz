// import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import NVianDashboard from "./Pages/NVianDashboard.tsx";
import MatchDetailsPage from "./Pages/MatchDetailsPage/MatchDetailsPage.tsx";
import Admin from "./Pages/Admin.tsx";
import Login from "./Pages/Login.tsx";
import AccessDenied from "./Pages/AccessDenied.tsx";
import SuperAdmin from "./Pages/SuperAdmin.tsx";



function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/nvian" element={<NVianDashboard />} />
                    <Route path="/match/:id" element={<MatchDetailsPage/>} />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute 
                                element={<Admin />} 
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