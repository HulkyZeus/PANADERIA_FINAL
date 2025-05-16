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

const DivInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 70px;
`

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
      <Layout className='FondoPan'>
        <Content>
          <Row style={{ margin: '40px 0px' }}>
            <Col span={4}>
            </Col>
            <Col span={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card style={{ backgroundColor: '#fdf9ef', height: '450px', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.25)' }}>
                {
                  registerErrors.map((error, i) => (
                    <div key={i}>
                      {error}
                    </div>
                  ))
                }
                <Title level={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px 0px' }}>
                Regístrate
                </Title>
                <form onSubmit={onSubmit} style={{ height: '300px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <DivInput>
                      <input 
                          type='text' 
                          { ...register("username", {required: true})} 
                          placeholder='Nombre de usuario'
                          style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                      />
                      {errors.username && (
                          <Text type="danger" style={{ margin: '2px 0px' }}>Necesitas ingresar tu nombre de usuario</Text>
                      )}
                    </DivInput>
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
                        Registrar
                    </button>
                </form>
                <Text style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '16px', margin: '5px 0px' }}>
                  ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#e9aa4e'}}>Iniciar Sesión :)</Link> 
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

export default RegisterPage