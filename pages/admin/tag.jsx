import AdminTitle from "components/blocks/adminTitle";
import AdminLayout from "layouts/AdminLayout";

const Tag = () => {
  return <AdminTitle data={"Tag"} />;
};

export default Tag;

Tag.getLayout = function getLayout(Tag) {
  return <AdminLayout>{Tag}</AdminLayout>;
};
