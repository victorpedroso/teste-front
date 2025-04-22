import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'src/hooks/useReduxStore';



// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
    const { isLogged } = useAppSelector((state) => state.auth);
    const { pathname } = useLocation();

    if (!isLogged) {
        return <Navigate to="/sign-in" state={{ from: pathname }} replace />;
    }

    return <>{children}</>;
} 