import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Row,
  Col,
  Card,
  notification,
} from "antd";
import styled from "@emotion/styled";
import { createEventoRequest } from "../api/eventos"; 
import { getProducts } from "../api/products"; 

const { Option } = Select;
const { TextArea } = Input;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0ecec;
  padding: 50px 0; /* Espacio adicional arriba y abajo */
`;

const StyledCard = styled(Card)`
  width: 50%;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const FormularioEvento = () => {
  // Obtén el usuario desde localStorage (ajusta según tu lógica real)
  const usuario = JSON.parse(localStorage.getItem("usuario")); // o como lo guardes
  const usuario_id = usuario ? usuario._id : ""; // o usuario.id según tu backend

  const valoresIniciales = {
    usuario_id: usuario_id,
    nombre_evento: "",
    tipo_evento: "Matrimonio",
    descripcion: "",
    direccion_evento: "",
    fecha_evento: null,
    hora_evento: null,
    cantidad_personas: 0,
    productos: [{ producto_id: "", cantidad: 0 }],
  };

  const [formData, setFormData] = useState(valoresIniciales);

  const [productosDisponibles, setProductosDisponibles] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProductosDisponibles(response.data); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleProductoChange = (index, name, value) => {
    const productos = [...formData.productos];
    productos[index][name] = value;
    setFormData({ ...formData, productos });
  };

  const addProducto = () => {
    setFormData({
      ...formData,
      productos: [...formData.productos, { producto_id: "", cantidad: 0 }],
    });
  };

  const removeProducto = (index) => {
    const productos = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos });
  };

  // Función para validar campos requeridos
  const validarCampos = () => {
    if (
      !formData.nombre_evento ||
      !formData.tipo_evento ||
      !formData.descripcion ||
      !formData.direccion_evento ||
      !formData.fecha_evento ||
      !formData.hora_evento ||
      !formData.cantidad_personas ||
      formData.cantidad_personas < 1 ||
      formData.productos.some(
        (p) => !p.producto_id || !p.cantidad || p.cantidad < 1
      )
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarCampos()) {
      notification.error({
        message: "Campos incompletos",
        description:
          "Por favor, completa todos los campos obligatorios antes de enviar.",
      });
      return;
    }
    try {
      const eventoData = {
        ...formData,
        fecha_evento: formData.fecha_evento
          ? formData.fecha_evento.format("YYYY-MM-DD")
          : "",
        hora_evento: formData.hora_evento
          ? formData.hora_evento.format("HH:mm")
          : "",
      };
      await createEventoRequest(eventoData);
      notification.success({
        message: "Evento creado",
        description: "El evento fue creado exitosamente.",
      });
      setFormData(valoresIniciales); // Limpia el formulario
      window.scrollTo({ top: 0, behavior: "smooth" }); // Lleva al principio de la página
    } catch (error) {
      alert("Error al crear el evento");
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <StyledCard title="Formulario de Evento" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Nombre del Evento" required>
            <Input
              placeholder="Ingrese el nombre del evento"
              value={formData.nombre_evento}
              onChange={(e) => handleChange("nombre_evento", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Tipo de Evento" required>
            <Select
              value={formData.tipo_evento}
              onChange={(value) => handleChange("tipo_evento", value)}
            >
              <Option value="Matrimonio">Matrimonio</Option>
              <Option value="Baby Shower">Baby Shower</Option>
              <Option value="Aniversario">Aniversario</Option>
              <Option value="Cumpleaños">Cumpleaños</Option>
              <Option value="Otros">Otros</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Descripción" required>
            <TextArea
              rows={4}
              placeholder="Ingrese una descripción del evento"
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Dirección del Evento" required>
            <Input
              placeholder="Ingrese la dirección del evento"
              value={formData.direccion_evento}
              onChange={(e) => handleChange("direccion_evento", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Fecha del Evento" required>
            <DatePicker
              style={{ width: "100%" }}
              value={formData.fecha_evento}
              onChange={(date) => handleChange("fecha_evento", date)}
            />
          </Form.Item>

          <Form.Item label="Hora del Evento" required>
            <TimePicker
              style={{ width: "100%" }}
              value={formData.hora_evento}
              onChange={(time) => handleChange("hora_evento", time)}
            />
          </Form.Item>

          <Form.Item label="Cantidad de Personas" required>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              value={formData.cantidad_personas}
              onChange={(value) => handleChange("cantidad_personas", value)}
            />
          </Form.Item>

          <Form.Item label="Productos">
            {formData.productos.map((producto, index) => (
              <Row gutter={16} key={index} align="middle">
                <Col span={10}>
                  <Select
                    placeholder="Seleccione un producto"
                    value={producto.producto_id}
                    onChange={(value) =>
                      handleProductoChange(index, "producto_id", value)
                    }
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {productosDisponibles.map((prod) => (
                      <Option key={prod._id} value={prod._id}>
                        {prod.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <InputNumber
                    min={1}
                    placeholder="Cantidad"
                    value={producto.cantidad}
                    onChange={(value) =>
                      handleProductoChange(index, "cantidad", value)
                    }
                  />
                </Col>
                <Col span={6}>
                  <Button
                    type="danger"
                    onClick={() => removeProducto(index)}
                    style={{ width: "100%" }}
                  >
                    Quitar
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={addProducto}
              style={{ marginTop: "10px", width: "100%" }}
            >
              Agregar Producto
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#725D42",
                borderColor: "#725D42",
                width: "100%",
              }}
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </FormContainer>
  );
};

export default FormularioEvento;
