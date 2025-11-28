import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { User } from "./authSlice";
import { login, logout } from "./authSlice";
import type { RootState } from "./store";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data: {
    access_token: string;
    refresh_token: string;
    user: User;
  }) => {
    dispatch(login(data));
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return {
    ...auth,
    isAuthenticated: !!auth.access_token && !!auth.refresh_token && !!auth.user,
    login: handleLogin,
    logout: handleLogout
  };
}
