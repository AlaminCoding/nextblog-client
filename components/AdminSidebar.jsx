import Link from "next/link";
import styled from "styled-components";
const AdminSidebar = () => {
  return (
    <>
      <Sidebar>
        <li>
          <Link href="/admin">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/category">
            <a>Category</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/tag">
            <a>Tag</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/user">
            <a>User</a>
          </Link>
        </li>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;

const Sidebar = styled.ul`
  list-style-type: none;
  width: 250px;
  background-color: var(--box-bg-color);
  transition: 0.5s;
  margin-right: 20px;
  border-radius: 5px;
  li {
    border-bottom: 1px solid gray;
    opacity: 0.8;
    transition: 0.5s;
    &:nth-last-child(1) {
      border-bottom: none;
    }
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    a {
      padding: 10px 20px;
      display: block;
      &:hover {
        padding-left: 25px;
      }
    }
  }
`;
