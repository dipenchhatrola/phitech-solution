import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthed } from "../utils/adminAuth";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const location = useLocation();

  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
