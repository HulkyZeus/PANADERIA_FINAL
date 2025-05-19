import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Input, message, Radio, Card, Space } from "antd";
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

const RealizarPedido = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isUpdatingClient, setIsUpdatingClient] = useState(false);
  const [cart, setCart] = useState([]);

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
        message.error('Error al buscar el cliente');
      }
    }
  };

  const handleSubmit = async (values, paymentValues) => {
    try {
      // Validar datos del cliente
      if (!values.nombre || !values.apellido || !values.direccion || !values.cedula || !values.celular) {
        throw new Error('Todos los campos del cliente son requeridos');
      }

      // Validar carrito
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Validar método de pago
      if (!paymentValues.metodo_pago) {
        throw new Error('Debe seleccionar un método de pago');
      }

      // Preparar datos del cliente
      const clienteData = {
        name: `${values.nombre} ${values.apellido}`.trim(),
        address: values.direccion,
        cedula: values.cedula,
        celular: values.celular,
        email: values.email || user?.email || ''
      };

      // Obtener o crear cliente
      let clienteResponse;
      try {
        // Primero intentamos obtener el cliente
        const clienteExistente = await getClienteByCedula(values.cedula);
        
        if (clienteExistente.data && clienteExistente.data.cliente) {
          // Si el cliente existe, usamos sus datos directamente
          clienteResponse = { data: { success: true, cliente: clienteExistente.data.cliente } };
        } else {
          // Si el cliente no existe, lo creamos
          clienteResponse = await createClienteRequest(clienteData);
          if (!clienteResponse.data || !clienteResponse.data.success) {
            throw new Error('Error al crear el cliente');
          }
        }

      } catch (clienteError) {
        console.error('Error en operación de cliente:', clienteError);
        // Si hay un error al obtener el cliente, intentamos crearlo
        try {
          clienteResponse = await createClienteRequest(clienteData);
          if (!clienteResponse.data || !clienteResponse.data.success) {
            throw new Error('Error al crear el cliente');
          }
        } catch (createError) {
          throw new Error('Error al procesar los datos del cliente: ' + (createError.response?.data?.message || createError.message));
        }
      }

      // Verificar la estructura de la respuesta y extraer el cliente
      const cliente = clienteResponse.data.data || clienteResponse.data.cliente;
      
      if (!cliente || !cliente._id) {
        console.error('Respuesta del servidor:', clienteResponse.data);
        throw new Error('No se pudo obtener el ID del cliente');
      }

      // Mostrar alerta de procesamiento de pago
      await Swal.fire({
        title: 'Dirigiendo al pago',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      // Crear el pedido
      const pedidoData = {
        cliente_id: cliente._id,
        cedula: values.cedula,
        metodo_pago: paymentValues.metodo_pago,
        productos: cartItems,
        total: calculateTotal(),
        estado: 'pendiente',
        fecha: new Date().toISOString()
      };

      console.log("Datos que se enviarán al backend:", pedidoData);

      try {
        const response = await createPedidoRequest(pedidoData);
        if (!response.data.success) {
          throw new Error('Error al crear el pedido');
        }
        
        toast.success('Pedido creado exitosamente');
        
        // Preparar datos para la página de confirmación
        const pedidoConfirmado = {
          name: `${values.nombre} ${values.apellido}`.trim(),
          address: values.direccion,
          cedula: values.cedula,
          celular: values.celular,
          metodo_pago: paymentValues.metodo_pago,
          productos: cartItems,
          total: calculateTotal(),
          estado: 'pendiente'
        };

        localStorage.removeItem('cart');
        navigate('/pedido-confirmado', { state: { pedido: pedidoConfirmado } });
      } catch (pedidoError) {
        console.error('Error al crear pedido:', pedidoError);
        throw new Error('Error al crear el pedido: ' + (pedidoError.response?.data?.message || pedidoError.message));
      }
    } catch (error) {
      console.error('Error en el proceso de pedido:', error);
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
      // Validar el carrito primero
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Validar los productos del carrito
      const cartErrors = cart.map((item, index) => {
        const errors = [];
        if (!item.name) errors.push("El nombre del producto es requerido");
        if (!item.price || typeof item.price !== 'number') errors.push("El precio debe ser un número");
        if (!item.quantity || typeof item.quantity !== 'number') errors.push("La cantidad debe ser un número");
        return errors.length > 0 ? { index, errors } : null;
      }).filter(Boolean);

      if (cartErrors.length > 0) {
        throw new Error('Hay errores en los productos del carrito');
      }

      // Validar formularios
      await form.validateFields();
      const paymentValues = await paymentForm.validateFields();
  
      const clienteData = {
        name: `${values.nombre} ${values.apellido}`.trim(),
        address: values.direccion,
        cedula: values.cedula,
        celular: values.celular,
        email: values.email || user?.email || ''
      };
  
      if (!clienteData.name || !clienteData.address || !clienteData.celular) {
        throw new Error('Por favor complete todos los campos requeridos');
      }
  
      // Si todo está correcto, proceder a crear el pedido
      await handleSubmit(values, paymentValues);
  
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error al realizar el pedido';
      const errorDetails = error.response?.data?.errors || [];
  
      message.error(errorMessage);
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
                      { required: true, message: 'Por favor ingrese su cédula' }
                    ]}
                  >
                    <Input 
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

                  <div className="realizarPedido-formulario-boton">
                    <Button type="submit">{t("Comprar")}</Button>
                  </div>
                </Form>

                <PaymentCard>
                  <div className="realizarPedido-titulo">
                    <H1>{t("Método de Pago")}</H1>
                  </div>
                  <Form
                    form={paymentForm}
                    layout="vertical"
                    className="realizarPedido-formulario"
                  >
                    <Form.Item
                      name="metodo_pago"
                      rules={[{ required: true, message: 'Por favor seleccione un método de pago' }]}
                    >
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio value="PSE">
                            <PaymentMethod>
                              <img src="/pse-logo.png" alt="PSE" />
                              PSE
                            </PaymentMethod>
                          </Radio>
                          <Radio value="Tarjeta">
                            <PaymentMethod>
                              <img src="/credit-cards.png" alt="Tarjetas" />
                              Tarjeta crédito/débito
                            </PaymentMethod>
                          </Radio>
                          <Radio value="Efectivo">
                            <PaymentMethod>
                              <img src="/cash.png" alt="Efectivo" />
                              Efectivo
                            </PaymentMethod>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </PaymentCard>
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