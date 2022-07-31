import styled from "styled-components";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useRef } from "react";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signup } from "fetch/auth";
import { Alert } from "react-bootstrap";

const formSchema = yup.object({
  name: yup.string().required("Name required"),
  email: yup.string().email("Must be a valid email").required("Email required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Must be at least 8 character"),
});

const SignUp = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const passRef = useRef();
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    signup(data).then((data) => {
      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        Router.push("/signin");
      }
    });
  };
  return (
    <SignupForm onSubmit={handleSubmit(onSubmit)}>
      {error ? (
        <Alert className="text-center" variant="warning">
          {error}
        </Alert>
      ) : null}

      <h2>Sign Up</h2>
      <InputGroup>
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          defaultValue={"Sabbir"}
        />
        <MdOutlineDriveFileRenameOutline />
      </InputGroup>
      <p>{errors.name?.message}</p>
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
      <small>
        <input type="checkbox" name="agreecheck" /> I agree with all terms and
        conditions
      </small>
      <button type="submit" className="blog-btn">
        Sign Up
      </button>
    </SignupForm>
  );
};

export default SignUp;

const SignupForm = styled.form`
  max-width: 350px;
  border: 1px solid var(--color);
  margin: 100px auto 0px auto;
  padding: 20px;
  border-radius: 5px;
  transition: 0.5s;
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
