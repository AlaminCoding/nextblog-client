import AdminTitle from "components/blocks/adminTitle";
import AdminLayout from "layouts/AdminLayout";

const Admin = () => {
  return <AdminTitle data={"Dashboard"} />;
};

export default Admin;

Admin.getLayout = function getLayout(Admin) {
  return <AdminLayout>{Admin}</AdminLayout>;
};
