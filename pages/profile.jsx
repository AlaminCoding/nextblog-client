import { useSelector } from "react-redux";
import styled from "styled-components";
import { isAuth } from "fetch/auth";
import Router from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  return user ? (
    <>
      <Text>{user.name} Profile</Text>
    </>
  ) : null;
};

export default Profile;

const Text = styled.h2`
  color: var(--color);
`;
