import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Input, message, Radio, Card, Space, notification } from "antd";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPedidoRequest } from "../api/pedidos";
import { createClienteRequest, updateClienteRequest, getClienteByCedula } from "../api/clientes";
import Swal from 'sweetalert2';
import "../css/main.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Icon } from '@iconify/react';


const { Content } = Layout;

const H1 = styled.h1`
  color: #fff;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const Button = styled.button`
  background-color: #bb8f51;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a0522d;
  }
`;

const TD = styled.td`
  font-weight: bold;
  font-size: 16px;
`;

const PaymentCard = styled(Card)`
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  img {
    width: 40px;
    height: 25px;
    margin-right: 10px;
  }
`;

const PaymentContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 2rem 1rem 1rem;
  position: relative;
  margin-top: 2rem;
  background-color: #fff;
`;

const PaymentTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 1rem;
`;

const PaymentButton = styled.button`
  background-color: #f2f2f2;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    border-color: #bb8f51;
  }

  span {
    margin-top: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .icon-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const RealizarPedido = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isUpdatingClient, setIsUpdatingClient] = useState(false);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Si el usuario está autenticado, intentar obtener sus datos
    if (isAuthenticated && user) {
      form.setFieldsValue({
        email: user.email
      });
    }
  }, [isAuthenticated, user, form]);

  const handleCedulaChange = async (e) => {
    const cedula = e.target.value;
    if (cedula.length === 10) {
      try {
        const response = await getClienteByCedula(cedula);
        if (response.data.success && response.data.cliente) {
          const cliente = response.data.cliente;
          // Establecer los valores del formulario
          const nombres = cliente.name.split(' ');
          form.setFieldsValue({
            cedula: cliente.cedula,
            nombre: nombres[0],
            apellido: nombres.slice(1).join(' '),
            direccion: cliente.address,
            celular: cliente.celular,
            email: cliente.email || user?.email || ''
          });
          setIsUpdatingClient(true);
          
          // Validar el formulario después de establecer los valores
          try {
            await form.validateFields(['nombre', 'apellido', 'direccion', 'celular']);
          } catch (validationError) {
            console.log('Errores de validación:', validationError);
          }
        } else {
          // Limpiar los campos si el cliente no existe
          form.setFieldsValue({
            nombre: '',
            apellido: '',
            direccion: '',
            celular: '',
            email: user?.email || ''
          });
          setIsUpdatingClient(false);
        }
      } catch (error) {
        console.error('Error al buscar cliente:', error);
      }
    }
  };

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    celular: '',
    direccion: '',
    metodo_pago: ''
  });

  const validarCampos = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const values = form.getFieldsValue();
    
    if (
      !values.nombre ||
      !values.apellido ||
      !values.cedula ||
      !values.celular ||
      !values.direccion ||
      !selected ||
      cartItems.length === 0
    ) {
      return false;
    }
    return true;
  };
  

  const handleSubmit = async (values) => {
    if (!validarCampos()) {
      notification.error({
        message: "Campos incompletos",
        description:
          "Por favor, completa todos los campos obligatorios antes de enviar.",
      });
      return;
    }
    if (!selected) {
      notification.error({
        message: "Método de pago requerido",
        description: "Por favor, seleccione un método de pago."
      });
      return;
    }
    try {
      // Validar carrito
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Preparar datos del cliente
      const clienteData = {
        name: `${values.nombre} ${values.apellido}`.trim(),
        address: values.direccion,
        cedula: values.cedula,
        celular: values.celular,
        email: values.email || user?.email || ''
      };

      // Crear o actualizar cliente
      let clienteResponse;
      try {
        const clienteExistente = await getClienteByCedula(values.cedula);
        if (clienteExistente.data?.cliente) {
          // Actualizar cliente existente
          clienteResponse = { data: { success: true, cliente: clienteExistente.data.cliente } };
        } else {
          // Crear nuevo cliente
          clienteResponse = await createClienteRequest(clienteData);
        }
      } catch (error) {
        // Si hay error 404, significa que el cliente no existe, entonces lo creamos
        if (error.response?.status === 404) {
          clienteResponse = await createClienteRequest(clienteData);
        } else {
          throw error; // Re-lanzar otros errores
        }
      }

      const cliente = clienteResponse.data?.cliente || clienteResponse.data?.data;
      if (!cliente?._id) throw new Error('Error al procesar los datos del cliente');

      // Mostrar alerta de procesamiento
      await Swal.fire({
        title: 'Procesando pedido',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => Swal.showLoading()
      });

      // Crear el pedido
      const pedidoData = {
        cliente_id: cliente._id,
        cedula: values.cedula,
        metodo_pago: selected,
        productos: cartItems,
        total: calculateTotal(),
        estado: 'confirmado',
        fecha: new Date().toISOString()
      };

      const response = await createPedidoRequest(pedidoData);
      if (!response.data.success) throw new Error('Error al crear el pedido');

      toast.success('Pedido creado exitosamente');
      
      // Preparar datos para confirmación y redireccionar
      const pedidoConfirmado = {
        name: clienteData.name,
        address: clienteData.address,
        cedula: clienteData.cedula,
        celular: clienteData.celular,
        metodo_pago: selected,
        productos: cartItems,
        total: calculateTotal(),
        estado: 'confirmado'
      };

      localStorage.removeItem('cart');
      navigate('/pedido-confirmado', { state: { pedido: pedidoConfirmado } });

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al procesar el pedido');
      
      if (error.response?.data?.errors) {
        Swal.fire({
          title: 'Error de validación',
          html: error.response.data.errors.map(err => `<p>${err.message}</p>`).join(''),
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    }
  };

  const onFinish = async (values) => {
    try {
      await handleSubmit(values);
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error al procesar el pedido');
    }
  };
  

  const onFormValuesChange = (changedValues, allValues) => {
    const requiredFields = ['nombre', 'apellido', 'cedula', 'celular', 'direccion'];
    const isComplete = requiredFields.every(field => allValues[field]);
    setIsFormComplete(isComplete);
  };

  const calculateTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <Layout style={{ backgroundColor: "#e8e8e8", paddingBottom: "30px" }}>  
        <Content>
          <div style={{margin:"90px"}}> </div>
          <Row className="realizarPedido-row">
            <Col span={1}> </Col>
              <Col span={11} offset={1} className="realizarPedido-col-formulario">
                <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}>
                  <div className="realizarPedido-titulo"> 
                    <H1>{t("Detalles de Compra")}</H1>
                  </div>
                
                  <Form
                      form={form}
                      onFinish={onFinish}
                      layout="vertical"
                      className="realizarPedido-formulario"
                      onValuesChange={onFormValuesChange}
                    >
                      <Form.Item
                        name="cedula"
                        label={<Label>{t("Cedula")}</Label>}
                        rules={[
                          { required: true, message: 'Por favor ingrese su cédula' },
                          { max: 10, message: 'El número de celular no puede tener más de 10 dígitos' },
                          { pattern: /^\d+$/, message: 'El número de cedula solo debe contener números' }
                        ]}
                      >
                        <Input
                          type="text"
                          maxLength={10}
                          placeholder="Ingrese su Número de Cédula"
                          className="realizarPedido-input"
                          onChange={handleCedulaChange}
                        />
                      </Form.Item>

                      <Form.Item
                        name="nombre"
                        label={<Label>{t("Nombre(s)")}</Label>}
                        rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
                      >
                        <Input placeholder="Ingrese su Nombre Completo" className="realizarPedido-input" />
                      </Form.Item>

                      <Form.Item
                        name="apellido"
                        label={<Label>{t("Apellido(s)")}</Label>}
                        rules={[{ required: true, message: 'Por favor ingrese su apellido' }]}
                      >
                        <Input placeholder="Ingrese su Apellido Completo" className="realizarPedido-input" />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label={<Label>{t("Email")}</Label>}
                        rules={[{ required: true, message: 'Por favor ingrese su email' }]}
                      >
                        <Input placeholder="Su email" className="realizarPedido-input" />
                      </Form.Item>

                      <Form.Item
                        name="celular"
                        label={<Label>{t("No. Celular")}</Label>}
                        rules={[
                          { required: true, message: 'Por favor ingrese su número de celular' },
                          { max: 10, message: 'El número de celular no puede tener más de 10 dígitos' },
                          { pattern: /^\d+$/, message: 'El número de celular solo debe contener números' }
                        ]}
                      >
                        <Input placeholder="Ingrese su Número de Celular" className="realizarPedido-input" />
                      </Form.Item>

                      <Form.Item
                        name="direccion"
                        label={<Label>{t("Dirección")}</Label>}
                        rules={[{ required: true, message: 'Por favor ingrese su dirección' }]}
                      >
                        <Input placeholder="Ingrese su Dirección" className="realizarPedido-input" />
                      </Form.Item>

                    <div>
                      <PaymentContainer>
                        <PaymentTitle>{t("Método de Pago")}</PaymentTitle>
                        <PaymentOptions>
                          <PaymentButton
                            type="button"
                            className={selected === 'Tarjeta' ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelected('Tarjeta');
                            }}
                          >
                            <div className="icon-group">
                              <Icon icon="logos:visa" />
                              <Icon icon="logos:mastercard" />
                            </div>
                            <span>Tarjeta crédito/débito</span>
                          </PaymentButton>

                          <PaymentButton
                            type="button"
                            className={selected === 'PSE' ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelected('PSE');
                            }}
                          >
                            <img
                              src="/pse-seeklogo.svg"
                              alt="PSE"
                              style={{ width: "30px", height: "30px" }}
                            />
                            <span>PSE</span>
                          </PaymentButton>

                          <PaymentButton
                            type="button"
                            className={selected === 'Efectivo' ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelected('Efectivo');
                            }}
                          >
                            <Icon icon="tdesign:money" style={{ color: 'green', fontSize: '24px' }} />
                            <span>Efectivo</span>
                          </PaymentButton>
                        </PaymentOptions>
                      </PaymentContainer>
                    </div>

                    <div style={{ paddingTop: '2%' }}>
                      <Form.Item>
                        <div className="realizarPedido-formulario-boton">
                          <Button type="submit" onClick={() => {}}>
                            {t("Continuar al pago")}
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                  </Form>
                </div>

                
              </Col>
           <Col span={1}> </Col>
          

            <Col span={8} className="realizarPedido-col-resumen">
              <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}>
                <div className="realizarPedido-titulo"> 
                  <H1>{t("Resumen de tu Pedido")}</H1>
                </div>
                <div className="realizarPedido-tabla-contenedor"> 
                  <table className="realizarPedido-tabla">
                    <thead>
                      <tr>
                        <TD> </TD>
                        <TD>{t("Producto")}</TD>
                        <TD>{t("Cantidad")}</TD>
                        <TD>{t("Subtotal")}</TD>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.parse(localStorage.getItem('cart') || '[]').map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="realizarPedido-carritoTotal">
                    <p className="totalLabel">Total A Pagar:</p>
                    <p className="total-precio">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={1}> </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default RealizarPedido;