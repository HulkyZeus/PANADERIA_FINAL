import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useUser } from '../context/UserContext'
import { Card, Typography, message } from "antd";
import styled from '@emotion/styled';
import '../css/main.css';
import { Layout, Row, Col } from 'antd';

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
  const { login, user, loading } = useAuth();
  const { loadProfile } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Si ya hay un usuario autenticado, redirigir según su rol
    if (user) {
      console.log('Usuario autenticado:', user); // Debug log
      if (user.role === 'admin') {
        navigate('/admin/customers');
      } else {
        navigate('/user');
      }
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setError('');
    try {
      const response = await login(data.email, data.password);
      console.log('Login response:', response); // Debug log
      
      // Cargar el perfil del usuario después del login exitoso
      await loadProfile();
      message.success('Inicio de sesión exitoso');

      // Redirigir según el rol del usuario
      if (response.role === 'admin') {
        navigate('/admin/customers');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Error al iniciar sesión');
      message.error('Error al iniciar sesión');
    }
  };

  return (
    <Layout className='FondoPan'>
      <Content>
        <Row style={{ margin: '40px 0px' }}>
          <Col span={4}></Col>
          <Col span={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ backgroundColor: '#fdf9ef', height: '350px', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.25)' }}>
              {error && (
                <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
                  {error}
                </div>
              )}
              <Title level={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px 0px' }}>
                Inicio de Sesión
              </Title>
              <form onSubmit={handleSubmit(onSubmit)} style={{ height: '200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <DivInput>
                  <input 
                    type='email' 
                    {...register("email", {required: true})}
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
                    {...register("password", {required: true})}
                    placeholder='Contraseña'
                    style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                  />
                  {errors.password && (
                    <Text type="danger" style={{ margin: '2px 0px' }}>Necesitas ingresar la contraseña</Text>
                  )}
                </DivInput>

                <button 
                  type='submit' 
                  disabled={loading}
                  style={{ 
                    width: '400px', 
                    height: '40px', 
                    borderRadius: '5px', 
                    padding: '10px', 
                    margin: '5px 0px', 
                    border: '1px solid #ccc', 
                    backgroundColor: '#725D42', 
                    color: 'white', 
                    fontSize: '16px', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </form>
              <Text style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '16px', margin: '5px 0px' }}>
                ¿Aún no tienes cuenta? <Link to="/register" style={{ color: '#e9aa4e'}}>Regístrate :)</Link> 
              </Text>
            </Card>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default LoginPage