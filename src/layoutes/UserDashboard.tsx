import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div>
      <section>this is navigation</section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default UserDashboard;
