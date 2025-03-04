import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

// تعريف الرواتر
let Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'navbar', // المسار الفرعي
        element: <Navbar />
      },
      {
        path: 'footer', // المسار الفرعي
        element: <Footer />
      }
    ]
  }
]);