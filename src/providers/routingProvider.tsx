import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home, NotFound, Login, Register } from "../pages";
import { AppLayout } from "../pages/AppLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} errorElement={<NotFound />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export function RoutingProvider() {
    return <RouterProvider router={router} />;
}
