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
  StepperPage,
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

const routeItems = [
  { path: "/", protected: false, component: <LoginPage /> },
  { path: "/home", protected: true, component: <HomePage /> },
  { path: "/admin", protected: true, component: <HomePage /> },
  { path: "/tech/:idTech", protected: true, component: <TechDesignForm /> },
  { path: "/tech/all", protected: true, component: <TechDesignList /> },
  { path: "/tally/:idTally", protected: true, component: <TallyDesignForm /> },
  { path: "/tally/all", protected: true, component: <TallyDesignList /> },
  { path: "/well", protected: true, component: <WellPage /> },
  { path: "/client", protected: true, component: <ClientPage /> },
  { path: "/products", protected: true, component: <ProductPage /> },
  { path: "/sales/all", protected: true, component: <SalesPage /> },
  { path: "/sales/:idSales", protected: true, component: <SalesPrintPage /> },
  { path: "/sales/:source/:id", protected: true, component: <SalesFormPage /> },
  { path: "/sim/sand", protected: true, component: <SandSimulator /> },
  { path: "/sim/gas", protected: true, component: <GasSimulator /> },
  { path: "/sim/press", protected: true, component: <PressureSimulator /> },
  { path: "/stepper", protected: true, component: <StepperPage /> },
  { path: "/*", protected: false, component: <NotFoundPage /> },
];

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <AuthProvider>
      <DataProvider>
        <SimulatorProvider>
          <Layout>
            <Navigation />
            <Routes>
              {routeItems.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.protected ? (
                      <ProtectedRoute>{route.component}</ProtectedRoute>
                    ) : (
                      <PublicRoute>{route.component}</PublicRoute>
                    )
                  }
                />
              ))}
            </Routes>
          </Layout>
        </SimulatorProvider>
      </DataProvider>
    </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;
