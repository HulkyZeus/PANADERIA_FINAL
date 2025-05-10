import styled from "@emotion/styled";
import "../css/main.css/";
import { Layout, Flex, Row, Col, Card } from "antd";
import Matrimonio from "../img/Matrimonio.webp";
import BabyShower from "../img/BabyShower.webp";
import Aniversario from "../img/Aniversario.webp";
import Cumpleanos from "../img/Cumpleanos.webp";
import PaqCom from "../img/ComBeb.webp";
import MPostres from "../img/MPostres.webp";
import Bebidas from "../img/Bebidas.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const Pan = styled.div`
  width: 100%;
  height: 400px;
`;

const ContenedorImagen = styled.div`
  width: 40%;
  height: 100%;
`;

const ImagenComidaBebida = styled.img`
  width: 400px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
`;

const ImagenPaqueteCompleto = styled.img`
  width: 400px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
`;

const ImagenPostres = styled.img`
  width: 400px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
`;

const HEventosEspeciales = styled.h1`
  font-weight: bold;
  margin: 20px;
  font-size: 26px;
`;

const HImpar = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin: 20px;
`;

const HPar = styled.h2`
  font-weight: bold;
  font-size: 24px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const P1 = styled.p`
  margin: 20px;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
`;

const P2 = styled.p`
  margin: 20px;
  font-size: 18px;
  text-align: right;
  line-height: 1.5;
  font-weight: 400;
`;

const Eventos = () => {
  const { t } = useTranslation();

  const eventos = [
    {
      title: [t("Matrimonios")],
      img: Matrimonio,
      description: [t("DMatrimonios")],
      link: "/Matrimonios",
    },
    {
      title: [t("Baby Showers")],
      img: BabyShower,
      description: [t("DBaby Showers")],
      link: "/BabyShowers",
    },
    {
      title: [t("Aniversarios")],
      img: Aniversario,
      description: [t("DAniversarios")],
      link: "/Aniversarios",
    },
    {
      title: [t("Cumpleaño")],
      img: Cumpleanos,
      description: [t("DCumpleaño")],
      link: "/Cumpleaños",
    },
  ];

  return (
    <>
      <Layout style={{ backgroundColor: "#f0ecec" }}>
        <Content>
          <Pan>
            <div className="PanOrigen"></div>
          </Pan>
          <Row style={{ margin: "5px 0px" }}>
            <Col span={4}></Col>
            <Col span={16}>
              <Flex justify="center" vertical>
                <HEventosEspeciales>
                  {t("Eventos Especiales")}
                </HEventosEspeciales>
                <Flex align="right" text-align="justify" vertical>
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Row gutter={[16, 16]} justify="center">
                      {eventos.map((eventos, index) => (
                        <Col span={6} key={index} className="CartaEvento">
                          <Link to={eventos.link} style={{ display: "block" }}>
                            <Card
                              hoverable
                              cover={
                                <img
                                  alt={eventos.title}
                                  src={eventos.img}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                            >
                              <Card.Meta
                                title={eventos.title}
                                description={eventos.description}
                                style={{ width: "100%", height: "175px" }}
                              />
                            </Card>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <P1>{t("PE1")}</P1>
                </Flex>

                <hr style={{ color: "gray" }} />

                <Flex align="center" justify="space-evenly">
                  <div style={{ width: "50%" }}>
                    <HImpar>{t("Comida & Bebida")}</HImpar>
                    <P1>{t("D1Comida & Bebida")}</P1>
                    <P1>{t("D2Comida & Bebida")}</P1>
                  </div>
                  <ContenedorImagen>
                    <Flex align="center" justify="center">
                      <ImagenComidaBebida src={Bebidas} />
                    </Flex>
                  </ContenedorImagen>
                </Flex>

                <hr style={{ color: "gray" }} />

                <Flex align="center" justify="space-evenly">
                  <ContenedorImagen>
                    <Flex align="left" justify="center">
                      <ImagenPostres src={MPostres} />
                    </Flex>
                  </ContenedorImagen>

                  <div style={{ width: "50%" }}>
                    <HPar>{t("Mesa de postres")}</HPar>
                    <P2>{t("D1Mesa de postres")}</P2>
                    <P2>{t("D2Mesa de postres")}</P2>
                  </div>
                </Flex>

                <hr style={{ color: "gray" }} />

                <Flex
                  align="center"
                  text-align="justify"
                  style={{ justifyContent: "space-evenly" }}
                >
                  <div style={{ width: "50%" }}>
                    <HImpar>{t("Paquete Completo")}</HImpar>
                    <P1>{t("D1Paquete Completo")}</P1>
                    <P1>{t("D2Paquete Completo")}</P1>
                  </div>
                  <ContenedorImagen>
                    <Flex align="center" justify="center">
                      <ImagenPaqueteCompleto src={PaqCom} />
                    </Flex>
                  </ContenedorImagen>
                </Flex>
                <hr style={{ color: "gray" }} />
              </Flex>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Content>
        ...
        <Flex
          align="center"
          justify="center"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Link to="/FormularioEvento" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#725D42",
                color: "white",
                border: "none",
                padding: "10px 20px",
                fontSize: "40px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {t("Agenda con nosotros")}
            </button>
          </Link>
        </Flex>
        ...
      </Layout>
    </>
  );
};
export default Eventos;
