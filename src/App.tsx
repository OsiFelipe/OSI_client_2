import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProductPage,
  TallyDesignForm,
  TallyDesignList,
  TechDesignForm,
  TechDesignList,
  SalesPage,
  SalesFormPage,
  WellPage,
  ClientPage,
  LoginPage,
  SalesPrintPage,
  SandSimulator,
  GasSimulator,
  PressureSimulator,
} from "./pages";
import { Navigation } from "./routes/Navigation";
import { Layout, NotFoundPage } from "./components";
import DataProvider from "./context/DataProvider";
import SimulatorProvider from "./context/SimulatorProvider";
import { ThemeProvider, createTheme } from "@mui/system";
import AuthProvider from "./context/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { PublicRoute } from "./routes/PublicRoutes";
import { ChemSimulator } from "./components/solution/simulators/chem/ChemSimulator";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
      primary: "#F1ECE7",
    },
    color: {
      primary: "rgb(90, 100, 119)",
      complementary: "rgb(251, 171, 53)",
      danger: "rgb(237, 79, 50)",
      warning: "rgb(255, 169, 0)",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <AuthProvider>
      <DataProvider>
        <SimulatorProvider>
          <Layout>
            <Navigation />
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tech/:idTech"
                element={
                  <ProtectedRoute>
                    <TechDesignForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tech/all"
                element={
                  <ProtectedRoute>
                    <TechDesignList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tally/:idTally"
                element={
                  <ProtectedRoute>
                    <TallyDesignForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tally/all"
                element={
                  <ProtectedRoute>
                    <TallyDesignList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/well"
                element={
                  <ProtectedRoute>
                    <WellPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client"
                element={
                  <ProtectedRoute>
                    <ClientPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales/all"
                element={
                  <ProtectedRoute>
                    <SalesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales/:idSales"
                element={
                  <ProtectedRoute>
                    <SalesPrintPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales/:source/:id"
                element={
                  <ProtectedRoute>
                    <SalesFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sim/sand"
                element={
                  <ProtectedRoute>
                    <SandSimulator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sim/gas"
                element={
                  <ProtectedRoute>
                    <GasSimulator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sim/press"
                element={
                  <ProtectedRoute>
                    <PressureSimulator />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </SimulatorProvider>
      </DataProvider>
    </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;
