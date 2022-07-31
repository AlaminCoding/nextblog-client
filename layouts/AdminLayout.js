import Navbar from "components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "components/AdminSidebar";
import styled from "styled-components";
const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setMessage("You are not Admin");
    }, 1000);
  });
  return user && user.role === 1 ? (
    <>
      <Title>Hello {user.name}</Title>
      <AdminPanel>
        <AdminSidebar />
        <AdminContent>{children}</AdminContent>
      </AdminPanel>
    </>
  ) : (
    <h2>{message}</h2>
  );
};

export default AdminLayout;

const AdminPanel = styled.section`
  display: flex;
  margin-top: 30px;
`;

const AdminContent = styled.div`
  flex: 1;
  background-color: var(--box-bg-color);
  padding: 15px 20px;
  border-radius: 5px;
  transition: 0.5s;
`;

const Title = styled.h2`
  font-size: 26px;
  color: var(--color);
  background-color: var(--box-bg-color);
  padding: 20px;
  text-transform: uppercase;
  border-radius: 5px;
  transition: 0.5s;
`;
