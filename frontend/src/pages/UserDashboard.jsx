import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { message } from 'antd';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fdf9ef;
  border-radius: 8px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
`;

const ProfileCard = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#725D42' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const SuccessText = styled.p`
  color: #52c41a;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const UserDashboard = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { 
    profile, 
    loading, 
    error, 
    success,
    updateProfile,
    changePassword,
    loadProfile
  } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Cargar perfil al montar el componente
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Resetear formulario cuando cambia el modo de edición
  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username,
        email: profile.email
      });
    }
  }, [profile, isEditing, reset]);

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data);
      message.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error("🔴 Error completo:", error.response?.data); // 👈 Más detalles del error
      message.error(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword // Asegúrate de enviar este campo
      });
      message.success('Contraseña cambiada correctamente');
      setIsChangingPassword(false);
      reset({}, { keepValues: false });
    } catch (error) {
      console.error("Error detallado:", error.response?.data); // Para depuración
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else {
        message.error(error.response?.data?.message || 'Error al cambiar la contraseña');
      }
    }
  };

  if (loading && !profile) {
    return <DashboardContainer>Cargando perfil...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <ProfileCard>
        <h2>Mi Perfil</h2>
        
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}

        {isEditing ? (
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <FormGroup>
              <Label>Nombre de usuario</Label>
              <Input
                {...register("username", { 
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres'
                  }
                })}
                disabled={loading}
              />
              {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Correo electrónico</Label>
              <Input
                type="email"
                {...register("email", { 
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                disabled={loading}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </FormGroup>

            <div>
              <Button type="submit" primary disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : isChangingPassword ? (
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <FormGroup>
              <Label>Contraseña actual</Label>
              <Input
                type="password"
                {...register("currentPassword", { 
                  required: 'Este campo es requerido'
                })}
                disabled={loading}
              />
              {errors.currentPassword && <ErrorText>{errors.currentPassword.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Nueva contraseña</Label>
              <Input
                type="password"
                {...register("newPassword", { 
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres'
                  }
                })}
                disabled={loading}
              />
              {errors.newPassword && <ErrorText>{errors.newPassword.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Confirmar nueva contraseña</Label>
              <Input
                type="password"
                {...register("confirmPassword", { 
                  required: 'Este campo es requerido',
                  validate: value => 
                    value === watch('newPassword') || 'Las contraseñas no coinciden'
                })}
                disabled={loading}
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
            </FormGroup>

            <div>
              <Button type="submit" primary disabled={loading}>
                {loading ? 'Guardando...' : 'Cambiar contraseña'}
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsChangingPassword(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <>
            <FormGroup>
              <Label>Nombre de usuario</Label>
              <p>{profile?.username}</p>
            </FormGroup>

            <FormGroup>
              <Label>Correo electrónico</Label>
              <p>{profile?.email}</p>
            </FormGroup>

            <FormGroup>
              <Label>Rol</Label>
              <p>{profile?.role}</p>
            </FormGroup>

            <FormGroup>
              <Label>Miembro desde</Label>
              <p>{new Date(profile?.createdAt).toLocaleDateString()}</p>
            </FormGroup>

            <div style={{ marginTop: '20px' }}>
              <Button onClick={() => setIsEditing(true)}>Editar perfil</Button>
              <Button onClick={() => setIsChangingPassword(true)}>
                Cambiar contraseña
              </Button>
              <Button onClick={logout}>Cerrar sesión</Button>
            </div>
          </>
        )}
      </ProfileCard>
    </DashboardContainer>
  );
};

export default UserDashboard;