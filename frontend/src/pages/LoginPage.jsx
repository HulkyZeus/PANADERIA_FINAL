import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react"

// import { Card, Typography, Input, Button, Alert, Form, Space } from "antd";

import styled from '@emotion/styled';
import '../css/main.css';
import { Layout, Flex, Row, Col } from 'antd';
import React from 'react'

// const { Title, Text } = Typography;

const { Content } = Layout;

const LoginPage = () => {

  const {register, 
    handleSubmit,
    formState: {errors},
  } = useForm()
  const {signin, errors: signinErrors, isAuthenticated} = useAuth()

  const navigate = useNavigate() 

  const onSubmit = handleSubmit(data => {
  signin(data)
  })

  useEffect(() => {
  if(isAuthenticated) navigate("/prueba")
  }, [isAuthenticated])

  return (
    <>
    <Layout>
      <Content style={{backgroundColor:'#e8e8e8'}}>
        {signinErrors.map((error, i) => (
          <div key={i}>
            {error}
          </div>
        ))}
        <h1>Login</h1>
        <form onSubmit={onSubmit} >
          <input 
              type='email' 
              { ...register("email", {required: true})}
              placeholder='Email' 
          />
          {errors.email && (
              <p>Email is Required</p>
          )}

          <input 
              type='password' 
              { ...register("password", {required: true})}
              placeholder='Password' 
          />
          {errors.password && (
              <p>Password is Required</p>
          )}
          <button type='submit'>
              Login
          </button>
      </form>
      <p>
          Dont have an account <Link to="/register">Sign up</Link> 
      </p>
      </Content>
    </Layout>
    </>
  )
}

export default LoginPage

// function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { signin, errors: signinErrors, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     signin(data);
//   };

//   useEffect(() => {
//     if (isAuthenticated) navigate("/tasks");
//   }, [isAuthenticated, navigate]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "calc(100vh - 100px)",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Card style={{ maxWidth: 400, width: "100%", padding: 20, borderRadius: 8 }}>
//         <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//           {/* Mostrar errores de inicio de sesión */}
//           {signinErrors.map((error, i) => (
//             <Alert key={i} message={error} type="error" showIcon closable />
//           ))}

//           <Title level={3} style={{ textAlign: "center" }}>
//             Login
//           </Title>

//           {/* Formulario */}
//           <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
//             <Form.Item
//               label="Email"
//               validateStatus={errors.email ? "error" : ""}
//               help={errors.email && "Email is required"}
//             >
//               <Input
//                 type="email"
//                 {...register("email", { required: true })}
//                 placeholder="Enter your email"
//                 size="large"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               validateStatus={errors.password ? "error" : ""}
//               help={errors.password && "Password is required"}
//             >
//               <Input.Password
//                 {...register("password", { required: true })}
//                 placeholder="Enter your password"
//                 size="large"
//               />
//             </Form.Item>

//             <Button type="primary" htmlType="submit" size="large" block>
//               Login
//             </Button>
//           </Form>

//           <Text style={{ textAlign: "center", display: "block" }}>
//             Don't have an account?{" "}
//             <Link to="/register">
//               <Text type="success">Sign up</Text>
//             </Link>
//           </Text>
//         </Space>
//       </Card>
//     </div>
//   );
// }

// export default LoginPage;