import { AuthProvider } from "../context/authContext";
import { ReactQueryProvider } from "./reactQueryProvider";
import { RoutingProvider } from "./routingProvider";

export function AppProvider() {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                <RoutingProvider />
            </AuthProvider>
        </ReactQueryProvider>
    );
}
