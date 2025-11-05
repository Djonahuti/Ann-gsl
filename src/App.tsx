import Home from "@/pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import { Route, Routes } from "react-router-dom";
import { SupabaseProvider } from "./contexts/SupabaseContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";

function App() {
  return (
   <SupabaseProvider>
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>  
        </Routes> 
        <Toaster position="top-right" richColors />       
      </div>
    </AuthProvider>
   </SupabaseProvider> 
  );
}

export default App;