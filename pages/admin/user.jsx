import AdminTitle from "components/blocks/adminTitle";
import AdminLayout from "layouts/AdminLayout";

const User = () => {
  return <AdminTitle data={"User"} />;
};

export default User;

User.getLayout = function getLayout(User) {
  return <AdminLayout>{User}</AdminLayout>;
};
