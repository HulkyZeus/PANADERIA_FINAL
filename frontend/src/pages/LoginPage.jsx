import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react"

import { Card, Typography } from "antd";

import styled from '@emotion/styled';
import '../css/main.css';
import { Layout, Row, Col } from 'antd';
import React from 'react'

const { Title, Text } = Typography;

const { Content } = Layout;

const DivInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 70px;
`

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
    <Layout className='FondoPan'>
      <Content>
        <Row style={{ margin: '40px 0px' }}>
          <Col span={4}>
          </Col>
          <Col span={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ backgroundColor: '#fdf9ef', height: '350px', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.25)' }}>
              {signinErrors.map((error, i) => (
                <div key={i}>
                  {error}
                </div>
              ))}
              <Title level={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px 0px' }}>
                Inicio de Sesión
              </Title>
              <form onSubmit={onSubmit} style={{ height: '200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <DivInput>
                  <input 
                      type='email' 
                      { ...register("email", {required: true})}
                      placeholder='Correo Electrónico'
                      style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                  />
                  {errors.email && (
                      <Text type="danger" style={{ margin: '2px 0px' }}>Necesitas ingresar el correo electrónico</Text>
                  )}
                </DivInput>
                <DivInput>
                  <input 
                      type='password' 
                      { ...register("password", {required: true})}
                      placeholder='Contraseña'
                      style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                  />
                  {errors.password && (
                      <Text type="danger" style={{ margin: '2px 0px' }}>Necesitas ingresar la contraseña</Text>
                  )}
                </DivInput>

                <button type='submit' style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', margin: '5px 0px', border: '1px solid #ccc', backgroundColor: '#725D42', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    Iniciar Sesión
                </button>
              </form>
              <Text style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '16px', margin: '5px 0px' }}>
                ¿Aún no tienes cuenta? <Link to="/register" style={{ color: '#e9aa4e'}}>Regístrate :)</Link> 
              </Text>
            </Card>
          </Col>
          <Col span={4}>
          </Col>
        </Row>
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