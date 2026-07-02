// import Dashboard from "./Pages/Dashboard";

// function App() {

//     return (

//         <div className="app">

//             <Dashboard />

//         </div>

//     );

// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import NVianDashboard from "./Pages/NVianDashboard.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/nvian" element={<NVianDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;