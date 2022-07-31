import styled from "styled-components";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useRef } from "react";
import Router from "next/router";
import { Alert } from "react-bootstrap";
import { signin, setAuthData } from "fetch/auth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addUser } from "store/slicers/userSlice";
import { useDispatch } from "react-redux";

const formSchema = yup.object({
  email: yup.string().email("Must be a valid email").required("Email required"),
  password: yup
    .string()
    .required("Password required")
    .min(4, "Must be at least 4 character"),
});

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const passRef = useRef();
  const dispatch = useDispatch();

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    signin(data).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAuthData(data, () => {
          setError("");
          dispatch(addUser(data.user));
          if (Router?.query?.redirect) {
            Router.push(Router.query.redirect);
          } else {
            Router.push("/");
          }
        });
      }
    });
  };

  return (
    <SigninForm onSubmit={handleSubmit(onSubmit)}>
      {error ? (
        <Alert className="text-center" variant="warning">
          {error}
        </Alert>
      ) : null}
      <h2>Sign In</h2>
      <InputGroup>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          defaultValue={"abcd@gmail.com"}
        />
        <MdOutlineMail />
      </InputGroup>
      <p>{errors.email?.message}</p>
      <InputGroup>
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          ref={passRef}
          {...register("password")}
          defaultValue={"11111111"}
        />
        <RiLockPasswordLine />
        {showPass ? (
          <AiOutlineEyeInvisible
            className="eye"
            onClick={() => handleShowPass()}
          />
        ) : (
          <AiOutlineEye className="eye" onClick={() => handleShowPass()} />
        )}
      </InputGroup>
      <p>{errors.password?.message}</p>
      <button type="submit" className="blog-btn">
        Sign In
      </button>
    </SigninForm>
  );
};

export default SignIn;

const SigninForm = styled.form`
  max-width: 350px;
  border: 1px solid var(--color);
  margin: 100px auto 0px auto;
  padding: 20px;
  border-radius: 5px;
  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: var(--color);
  }
  p {
    font-size: 12px;
    color: red;
    margin-bottom: 30px;
    margin-top: 5px;
  }
  small {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    color: var(--color);
    input {
      margin-right: 5px;
      position: relative;
      top: -1px;
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    color: var(--color);
  }
  input {
    width: 100%;
    height: 35px;
    border: none;
    border-bottom: 2px solid var(--color);
    background-color: transparent;
    padding-left: 35px;
    color: var(--color);
    &:focus {
      outline: none;
    }
  }
  svg {
    color: var(--color);
    position: absolute;
    bottom: 7px;
    left: 0;
    font-size: 26px;
  }
  .eye {
    left: auto;
    right: 0;
    cursor: pointer;
  }
`;
