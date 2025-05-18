import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Typography, message } from "antd"
import styled from '@emotion/styled'
import '../css/main.css'
import { Layout, Row, Col } from 'antd'

const { Content } = Layout
const { Title, Text } = Typography

const DivInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 70px;
`

const RegisterPage = () => {
  const { 
    register: authRegister,
    loading,
    error: authError,
    isAuthenticated,
    user
  } = useAuth()
  
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError
  } = useForm();

  useEffect(() => {
    if(isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin' : '/')
    }
  }, [isAuthenticated, user, navigate])

  const onSubmit = async (values) => {
    try {
      const userData = await authRegister(values)
      
      // Si el registro incluyó login automático
      if (userData && userData.role) {
        message.success(`¡Bienvenido ${userData.username || ''}!`)
        return // El useEffect manejará la redirección
      }
      
      // Si solo fue registro sin login automático
      message.success('Registro exitoso. Por favor inicia sesión.')
      navigate('/login')
    } catch (error) {
      // Manejo de errores específicos del formulario
      if (error.errors) {
        error.errors.forEach(err => {
          setFormError(err.path, { message: err.message })
        })
      } else {
        message.error(error.message || 'Error en el registro')
      }
    }
  }

  return (
    <Layout className='FondoPan'>
      <Content>
        <Row style={{ margin: '40px 0px' }}>
          <Col span={4}></Col>
          <Col span={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ 
              backgroundColor: '#fdf9ef', 
              minHeight: '450px', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.25)' 
            }}>
              {authError && (
                <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
                  {authError}
                </div>
              )}
              
              <Title level={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px 0px' }}>
                Regístrate
              </Title>
              
              <form onSubmit={handleSubmit(onSubmit)} style={{ 
                height: '300px', 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'space-evenly' 
              }}>
                <DivInput>
                  <input 
                    type='text' 
                    {...register("username")} 
                    placeholder='Nombre de usuario'
                    style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                  />
                  {errors.username && (
                    <Text type="danger" style={{ margin: '2px 0px' }}>
                      {errors.username.message}
                    </Text>
                  )}
                </DivInput>
                
                <DivInput>
                  <input 
                    type='email' 
                    {...register("email")}
                    placeholder='Correo Electrónico'
                    style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }} 
                  />
                  {errors.email && (
                    <Text type="danger" style={{ margin: '2px 0px' }}>
                      {errors.email.message}
                    </Text>
                  )}
                </DivInput>
                
                <DivInput>
                  <input 
                    type='password' 
                    {...register("password")}
                    placeholder='Contraseña'
                    style={{ width: '400px', height: '40px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}
                  />
                  {errors.password && (
                    <Text type="danger" style={{ margin: '2px 0px' }}>
                      {errors.password.message}
                    </Text>
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
                    backgroundColor: '#f0ca83', 
                    color: 'black', 
                    fontSize: '16px', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Registrando...' : 'Registrar'}
                </button>
              </form>
              
              <Text style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '16px', margin: '5px 0px' }}>
                ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#e9aa4e'}}>Iniciar Sesión :)</Link> 
              </Text>                
            </Card>
          </Col>
          <Col span={4}></Col>            
        </Row>       
      </Content>
    </Layout>
  )
}

export default RegisterPage