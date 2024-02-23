import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

export const WalletGuard = () => {
    const account = useAccount();
    if (account.status == "disconnected") {
        return <Navigate to='/wallet' />
    }

    return <Outlet />
}