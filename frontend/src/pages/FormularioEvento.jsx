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
  notification, // <-- Agrega esta línea
} from "antd";
import styled from "@emotion/styled";
import { createEventoRequest } from "../api/eventos"; // importa la función
import { getProducts } from "../api/products"; // Corrige la ruta y el nombre
import { useTranslation } from "react-i18next";

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

const CustomButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #bb8f51 !important;
  border-color: #bb8f51 important;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #a0522d !important;
    border-color: #a0522d !important;
  }
`;

const FormularioEvento = () => {
  const { t } = useTranslation();
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
        message: t("Campos incompletos"),
        description:
          t("Por favor, completa todos los campos obligatorios antes de enviar."),
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
        message: t("Evento creado"),
        description: t("El evento fue creado exitosamente."),
      });
      setFormData(valoresIniciales); // Limpia el formulario
      window.scrollTo({ top: 0, behavior: "smooth" }); // Lleva al principio de la página
    } catch (error) {
      alert(t("Error al crear el evento"));
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <StyledCard title={t("Formulario de Evento")} bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t("Nombre del Evento")} required>
            <Input
              placeholder={t("Ingrese el nombre del evento")}
              value={formData.nombre_evento}
              onChange={(e) => handleChange("nombre_evento", e.target.value)}
            />
          </Form.Item>

          <Form.Item label={t("Tipo de Evento")} required>
            <Select
              value={formData.tipo_evento}
              onChange={(value) => handleChange("tipo_evento", value)}
            >
              <Option value="Matrimonio">{t("Matrimonio")}</Option>
              <Option value="Baby Shower">{t("Baby Shower")}</Option>
              <Option value="Aniversario">{t("Aniversario")}</Option>
              <Option value="Cumpleaños">{t("Cumpleanos")}</Option>
              <Option value="Otros">{t("Otros")}</Option>
            </Select>
          </Form.Item>

          <Form.Item label={t("Descripcion")} required>
            <TextArea
              rows={4}
              placeholder={t("Ingrese una descripción del evento")}
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
            />
          </Form.Item>

          <Form.Item label={t("Dirección del Evento")} required>
            <Input
              placeholder={t("Ingrese la dirección del evento")}
              value={formData.direccion_evento}
              onChange={(e) => handleChange("direccion_evento", e.target.value)}
            />
          </Form.Item>

          <Form.Item label={t("Fecha del Evento")} required>
            <DatePicker
              style={{ width: "100%" }}
              value={formData.fecha_evento}
              onChange={(date) => handleChange("fecha_evento", date)}
            />
          </Form.Item>

          <Form.Item label={t("Hora del Evento")} required>
            <TimePicker
              style={{ width: "100%" }}
              value={formData.hora_evento}
              onChange={(time) => handleChange("hora_evento", time)}
            />
          </Form.Item>

          <Form.Item label={t("Cantidad de Personas")} required>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              value={formData.cantidad_personas}
              onChange={(value) => handleChange("cantidad_personas", value)}
            />
          </Form.Item>

          <Form.Item label={t("Productos")}>
            {formData.productos.map((producto, index) => (
              <Row gutter={16} key={index} align="middle">
                <Col span={10}>
                  <Select
                    placeholder={t("Seleccione un producto")}
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
                    placeholder={t("Cantidad")}
                    value={producto.cantidad}
                    onChange={(value) =>
                      handleProductoChange(index, "cantidad", value)
                    }
                  />
                </Col>
                <Col span={6}>
                  <CustomButton
                    type="danger"
                    onClick={() => removeProducto(index)}
                    style={{ borderRadius: "5px", cursor: "pointer", padding: "10px", margin: "5px 0px", border: "1px solid #ccc", color: "white", fontSize: "12px", fontWeight: "bold", height: "40px" }}>
                    {t("Quitar")}
                  </CustomButton>
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={addProducto}
              style={{ marginTop: "10px", width: "100%" }}
            >
             {t("Agregar Producto")}
            </Button>
          </Form.Item>

          <Form.Item>
            <CustomButton
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "5px", cursor: "pointer", padding: "10px", margin: "5px 0px", border: "1px solid #ccc", color: "white", fontSize: "16px", fontWeight: "bold" }}>
                {t("Crear Evento")}
            </CustomButton>
          </Form.Item>
        </Form>
      </StyledCard>
    </FormContainer>
  );
};

export default FormularioEvento;
