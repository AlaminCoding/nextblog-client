import AdminTitle from "components/blocks/adminTitle";
import AdminLayout from "layouts/AdminLayout";

const Category = () => {
  return (
    <>
      <AdminTitle data={"Category"} />
    </>
  );
};

export default Category;

Category.getLayout = function getLayout(Category) {
  return <AdminLayout>{Category}</AdminLayout>;
};
