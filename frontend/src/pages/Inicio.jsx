// src/pages/Inicio.js
import { Carousel, Card, Col, Row, Rate, Form, Input, Button } from "antd";
import Imagen1 from "../img/PanAlinado.jpg";
import Imagen2 from "../img/Pan3.jpg";
import Imagen3 from "../img/Pan2.jpg";
import Imagen4 from "../img/Torta.avif";
import Croissant from "../img/croissant.png";
import Muffin from "../img/muffin.png";
import Pandequeso from "../img/pandequeso.png";
import Tartadefresa from "../img/tartadefresa.png";
import Donadevainilla from "../img/donavainilla.png";
import Brownie from "../img/brownie.png";
import Tartademanzana from "../img/tartademanzana.png";
import Cheesecake from "../img/cheesecake.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

import styled from "@emotion/styled";
const contentStyle = {
  height: "550px",
  color: "#fff",
  lineHeight: "250px",
  textAlign: "center",
  background: "#364d79",
};

const Imagen = styled.img`
  height: 100%;
  width: 100%;
  display: block;
`;



const Inicio = () => {
  const {t} = useTranslation();

  // Lista de productos de pastelería
const products = [
  { title: [t("Croissant")], img: Croissant },
  { title: [t("Muffin de Chocolate")], img: Muffin },
  { title: [t("Pan de Queso")], img: Pandequeso },
  { title: [t("Tarta de Fresa")], img: Tartadefresa },
  { title: [t("Dona de Vainilla")], img: Donadevainilla },
  { title: [t("Brownie")], img: Brownie },
  { title: [t("Tarta de Manzana")], img: Tartademanzana },
  { title: [t("Cheesecake")], img: Cheesecake },
];

  const { user } = useAuth(); // Obtenemos el usuario logueado desde el contexto
  const [formVisible, setFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario
  const [reviews, setReviews] = useState([
    {
      name: "María López",
      rating: 5,
      description: t("El mejor pan que he probado, siempre fresco y delicioso."),
    },
    {
      name: "Carlos Pérez",
      rating: 4,
      description: t("Muy buena calidad, aunque podrían mejorar el servicio."),
    },
    {
      name: "Ana García",
      rating: 5,
      description: t("Las tartas son increíbles, especialmente la de manzana."),
    },
  ]);
  const [form] = Form.useForm();

  const handleAddReview = async (values) => {
    const newReview = {
      name: user.name, // Usamos el nombre del usuario logueado
      rating: values.rating,
      description: values.description,
    };
    try {
      // Enviar la reseña al backend
      const response = await api.post("/reviews", newReview);
      console.log("Reseña guardada:", response.data);

      // Actualizar el estado con la nueva reseña
      setReviews([...reviews, newReview]);

      // Limpiar el formulario y ocultarlo
      form.resetFields();
      setFormVisible(false);
    } catch (error) {
      console.error("Error al guardar la reseña:", error);
    }
  };

  return(
  <div>
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <Imagen src={Imagen1}></Imagen>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Imagen src={Imagen2}></Imagen>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Imagen src={Imagen3}></Imagen>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Imagen src={Imagen4}></Imagen>
        </h3>
      </div>
    </Carousel>

    {/* Sección de tarjetas de productos */}
    <div
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "left", marginBottom: "30px" }}>
        {t("Productos Destacados")}
      </h2>
      <Row gutter={[16, 16]} justify="center">
        {products.slice(0, 4).map((product, index) => (
          <Col span={4} key={index}>
            <Card
              hoverable
              cover={<img alt={product.title} src={product.img} />}
            >
              <Card.Meta
                title={product.title}
                description={t("Delicioso y recién horneado")}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "30px" }}>
        {products.slice(4, 8).map((product, index) => (
          <Col span={4} key={index}>
            <Card
              hoverable
              cover={<img alt={product.title} src={product.img} />}
            >
              <Card.Meta
                title={product.title}
                description={t("Delicioso y recién horneado")}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    
 {/* Sección de reseñas */}
 <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "left", marginBottom: "30px" }}>
          {t("Reseñas de nuestros clientes")}
        </h2>
        <Row gutter={[16, 16]} justify="center">
          {reviews.map((review, index) => (
            <Col span={6} key={index}>
              <Card>
                <Card.Meta
                  title={
                    <div>
                      <strong>{review.name}</strong>
                      <Rate
                        disabled
                        defaultValue={review.rating}
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                  }
                  description={review.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Botón para mostrar el formulario */}
      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!formVisible && (
          <Button type="primary" onClick={() => setFormVisible(true)}>
            {t("Danos tu opinión")}
          </Button>
        )}

        {/* Formulario para agregar reseñas */}
        {formVisible && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddReview}
            style={{ maxWidth: "600px", width: "100%", marginTop: "20px" }}
          >
            <Form.Item
              label={t("Puntuación")}
              name="rating"
              rules={[
                { required: true, message: t("Por favor selecciona una puntuación") },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label={t("Descripción")}
              name="description"
              rules={[
                { required: true, message: t("Por favor escribe una descripción") },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("Enviar reseña")}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
  </div>
  )
};

export default Inicio;
