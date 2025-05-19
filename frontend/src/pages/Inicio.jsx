import {
  Carousel,
  Card,
  Col,
  Row,
  Rate,
  Form,
  Input,
  Button,
  Select,
  message,
} from "antd";
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
import Swal from "sweetalert2";
import { useEffect } from "react";

const CustomButton = styled(Button)`
  background-color: #bb8f51 !important;
  border-color: #bb8f51 important;
  color: #fff;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #a0522d !important;
    border-color: #a0522d !important;
    color: #fff !important;
  }
`;

const Imagen = styled.img`
  height: 100%;
  width: 100%;
  display: block;
`;

const contentStyle = {
  height: "550px",
  color: "#fff",
  lineHeight: "250px",
  textAlign: "center",
  background: "#364d79",
};



const Inicio = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const [reviews, setReviews] = useState([]);// Inicialmente vacío
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [form] = Form.useForm();
  const [formKey, setFormKey] = useState(0); // Estado para forzar el reinicio del formulario

  // Función para obtener todas las reseñas desde la API
  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews"); // Cambia "/reviews" por el endpoint correcto
      const reviewsWithDefaults = response.data.map((review) => ({
        ...review,
        name: review.usuario_id?.email || "Usuario Anónimo", // Valor predeterminado si falta el nombre
        date: new Date(review.createdAt).toLocaleDateString(), // Fecha actual si falta
      }));
      setReviews(reviewsWithDefaults);
      setFilteredReviews(reviewsWithDefaults);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  };

    // Llamar a la API al montar el componente
    useEffect(() => {
      fetchReviews();
    }, []);

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

  const handleAddReviewClick = () => {
    if (user) {
      setFormVisible(true); // Mostrar el formulario si el usuario está logueado
    } else {
      // Mostrar el modal de SweetAlert2 si el usuario no está logueado
      Swal.fire({
        title: t("Inicia sesión"),
        text: t("Debes iniciar sesión para dejar una reseña."),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("Iniciar sesión"),
        cancelButtonText: t("Cerrar"),
        customClass: {
          confirmButton: "custom-confirm-button", // Clase personalizada para el botón de confirmación
          cancelButton: "custom-cancel-button",   // Clase personalizada para el botón de cancelar
          actions: "custom-actions", // Clase personalizada para el contenedor de botones
        },
        buttonsStyling: false, // Desactiva los estilos predeterminados de SweetAlert2
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login"; // Redirigir al usuario
        }
      });
    }
  };

  const handleFilterChange = (value) => {
    if (value) {
      setFilteredReviews(reviews.filter((review) => review.rating === value));
    } else {
      setFilteredReviews(reviews);// Mostrar todas las reseñas si no hay filtro
    }
  };

  const handleAddReview = async (values) => {
    try {
      // Enviar la reseña a la API
      const response = await api.post("/reviews", {
        name: user.username, // Incluye el nombre del usuario
        rating: values.rating,
        description: values.description,
      });
  
      // Crear una nueva reseña con los datos del usuario
      const newReview = {
        name: user.username, // Usa el nombre del usuario logueado
        rating: values.rating,
        description: values.description,
        date: new Date().toLocaleDateString(),
      };
  
      // Actualizar el estado con la nueva reseña
      setReviews((prev) => [...prev, newReview]);
      setFilteredReviews((prev) => [...prev, newReview]); // Actualizar también las reseñas filtradas
      message.success("¡Reseña publicada!");
      
      setFormKey((prevKey) => prevKey + 1); // Cambiar la clave del formulario para reiniciarlo
      setFormVisible(false); // Ocultar el formulario
    } catch (error) {
      console.error("Error al agregar la reseña:", error);
      if (error.response?.status === 401) {
        message.error("Debes iniciar sesión para agregar una reseña.");
      } else {
        message.error("Error al publicar la reseña. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div>
      {/* Carrusel */}
      <Carousel autoplay>
        {[Imagen1, Imagen2, Imagen3, Imagen4].map((img, index) => (
          <div key={index}>
            <h3 style={contentStyle}>
              <Imagen src={img} alt={`Imagen ${index + 1}`} />
            </h3>
          </div>
        ))}
      </Carousel>

      {/* Productos destacados */}
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

      {/* Filtros */}
      <div
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "left", marginBottom: "30px"}}>
          {t("Reseñas de nuestros clientes")}
          </h2>
        <Select
          placeholder={t("Filtrar por puntuación")}
          style={{ width: 200 }}
          onChange={handleFilterChange}
          allowClear
        >
          <Select.Option value={null}>{t("Todas")}</Select.Option>
          <Select.Option value={5}>{t("5 estrellas")}</Select.Option>
          <Select.Option value={4}>{t("4 estrellas")}</Select.Option>
          <Select.Option value={3}>{t("3 estrellas")}</Select.Option>
          <Select.Option value={2}>{t("2 estrellas")}</Select.Option>
          <Select.Option value={1}>{t("1 estrella")}</Select.Option>
        </Select>
      </div>

      {/* Reseñas */}
      <div
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row gutter={[16, 16]} justify="center">
          {filteredReviews.map((review, index) => (
            <Col span={8} key={index}>
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  minHeight: "150px",
                  minWidth: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <Card.Meta
                  title={
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px"  }}>
                      <strong style={{fontSize:"16px"}}>{review.name}</strong>
                      <Rate
                        disabled
                        defaultValue={review.rating}
                        style={{ fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "12px", color: "#888"}}>
                        {review.date} {/* Fecha de la reseña */}
                      </span>
                    </div>
                  }
                  description={review.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      

        {/* Formulario para agregar reseñas */}
        {/* Botón para agregar reseñas */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <CustomButton onClick={handleAddReviewClick}>
            {t("Danos tu opinión")}
          </CustomButton>

          {/* Formulario para usuarios logueados */}
          {user && formVisible && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddReview}
              style={{ maxWidth: "600px", margin: "20px auto" }}
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
    </div>
  );
};

export default Inicio;