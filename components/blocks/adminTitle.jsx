import styled from "styled-components";
const AdminTitle = (props) => {
  return <Title>{props.data}</Title>;
};

export default AdminTitle;

const Title = styled.h2`
  color: var(--color);
  font-size: 28px;
  text-transform: uppercase;
  font-size: 20px;
  transition: 0.5s;
`;
