import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import DrinkDetails from "./pages/drinkdetails/DrinkDetails";
import NotFound from "./pages/notfound/NotFound";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />}> 

      <Route path="" element={<Home />}/> 

      <Route path='search' element={<Search />}/>

      <Route path='search/:templatedSearch' element={<DrinkDetails />}/>
    
      <Route path="*" element={<NotFound />}/>

    </Route> 
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;