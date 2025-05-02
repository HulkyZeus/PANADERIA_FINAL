import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Card, Typography, Input, Button, Alert, Form, Space } from "antd";
import styled from '@emotion/styled';
import '../css/main.css';
import { Layout, Flex, Row, Col } from 'antd';
import React from 'react'

const { Content } = Layout;
const { Title, Text } = Typography;


const RegisterPage = () => {
  const { register, 
          handleSubmit, 
          formState: {errors}, } 
          = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
  if(isAuthenticated) navigate("/login")
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async(values) => {
  signup(values)
  })
  return (
    <>
      <Layout style={{backgroundColor:'#e8e8e8'}}>
        <Content>
          {
            registerErrors.map((error, i) => (
                <div className='bg-red-500 p-2 text-white' key={i}>
                    {error}
                </div>
            ))
          }
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    { ...register("username", {required: true})} 
                    placeholder='Username'
                />
                {errors.username && (
                    <p>Username is Required</p>
                )}
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
                    Register
                </button>
            </form>
            <p>
                Already have an account
                <Link to="/login">Login</Link>
            </p>          
        </Content>
      </Layout>
    </>
  )
}

export default RegisterPage

// function RegisterPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({name: "Arekkasu"});
//   const { signup, isAuthenticated, errors: registerErrors } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) navigate("/tasks");
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     console.log(data)
//     signup(data);
//   };

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
//           {/* Mostrar errores de registro */}
//           {registerErrors.map((error, i) => (
//             <Alert key={i} message={error} type="error" showIcon closable />
//           ))}

//           <Title level={3} style={{ textAlign: "center" }}>
//             Register
//           </Title>

//           {/* Formulario */}
//           <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
//             {/* Campo Username */}
//             <Form.Item
//               label="Username"
//               validateStatus={errors.username ? "error" : ""}
//               help={errors.username && "Username is required"}
//             >
//               <Input
//                 type="text"
//                 {...register("username", { required: true })}
//                 placeholder="Enter your username"
//                 size="large"
//               />
//             </Form.Item>

//             {/* Campo Email */}
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

//             {/* Campo Password */}
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
//               Register
//             </Button>
//           </Form>

//           <Text style={{ textAlign: "center", display: "block" }}>
//             Already have an account?{" "}
//             <Link to="/login">
//               <Text type="success">Login</Text>
//             </Link>
//           </Text>
//         </Space>
//       </Card>
//     </div>
//   );
// }

// export default RegisterPage;