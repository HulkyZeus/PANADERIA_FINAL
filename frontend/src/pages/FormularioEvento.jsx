import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, TimePicker, InputNumber, Row, Col, Card } from "antd";
import styled from "@emotion/styled";

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
  const [formData, setFormData] = useState({
    usuario_id: "",
    nombre_evento: "",
    tipo_evento: "Matrimonio",
    descripcion: "",
    direccion_evento: "",
    fecha_evento: null,
    hora_evento: null,
    cantidad_personas: 0,
    productos: [{ producto_id: "", cantidad: 0 }],
  });

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

  const handleSubmit = () => {
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar los datos al backend
  };

  return (
    <FormContainer>
      <StyledCard title="Formulario de Evento" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Usuario ID" required>
            <Input
              placeholder="Ingrese el ID del usuario"
              value={formData.usuario_id}
              onChange={(e) => handleChange("usuario_id", e.target.value)}
            />
          </Form.Item>

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
                  <Input
                    placeholder="Producto ID"
                    value={producto.producto_id}
                    onChange={(e) =>
                      handleProductoChange(index, "producto_id", e.target.value)
                    }
                  />
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
