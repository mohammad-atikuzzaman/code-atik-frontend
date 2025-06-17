import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <nav>this is the admin nav</nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminDashboard;
