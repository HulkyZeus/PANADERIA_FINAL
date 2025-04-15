import styled from '@emotion/styled';
import '../css/main.css';
import Logo from '../img/logoHorneados.png';
import { Col, Row, Layout, Flex, Divider } from 'antd';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const { Footer } = Layout;

const Imagen = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: auto;
  cursor: pointer;
`

const Contenedor = styled.div`
  background: #D6C9A6;
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Papu = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
`

const Texto = styled.h2`
  font-size: 18px;
  display: flex;
  margin: 1%;
  width: 100%;
`

const TextoFooter = styled.h2`
  font-size: 18px;
  display: flex;
  margin: 1% 4%;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

const styleIcono = {
    fontSize: '40px',
}

const styleTexto = {
    color: 'black',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'row',
    width: '60%'
}

const CFooter = () => {
    const {t} = useTranslation();
  return (
      <Layout>
          <Footer style={{ padding: '0%'}}>
              <Contenedor>
                  <Row style={{ height: '225px', width:'100%', padding: '10px' }}>

                      <Col span={8} className='ColFooter'>
                          <Flex align='center' justify='center' vertical style={{ padding: '2%'}}>
                              <Imagen src={Logo}></Imagen>
                          </Flex>
                      </Col>

                      <Col span={8} className='ColFooter'>
                          <Flex align='start' justify='center' vertical style={{ padding: '1%'}}>
                              <Texto><b>{t("Teléfonos")}</b></Texto>
                              <Texto>(608) 863 3424 - (+57) 312 536 2118</Texto>
                              <br/>
                              <Texto><b>{t("Dias")}</b></Texto>
                              <Texto>5 a.m - 10 p.m</Texto>
                              <br/>
                              <Texto><b>Cra 7 #56-16</b></Texto>
                              <br/>
                              <Texto><b>panhorneados@gmail.com</b></Texto>
                          </Flex>
                      </Col>

                      <Col span={8} className='ColFooter'>
                          <Row style={{ height: '33%', width: '100%'}}>
                              
                              <FlexRow>
                                  <a href='https://www.facebook.com/profile.php?id=61566846787614' target="_blank" style={styleTexto}>
                                  <FacebookOutlined style={styleIcono}/>
                                  <TextoFooter>Panadería Horneados</TextoFooter>
                                  </a>
                              </FlexRow>

                          </Row>
                          <Row style={{ height: '33%', width: '100%'}}>

                              <FlexRow>
                                  <a href='https://www.instagram.com/panaderiahorneados1/' target="_blank" style={styleTexto}>
                                  <InstagramOutlined style={styleIcono}/>
                                  <TextoFooter>@panaderiahorneados1</TextoFooter>
                                  </a>
                              </FlexRow>

                          </Row>
                          <Row style={{ height: '33%', width: '100%'}}>

                              <FlexRow>
                                  <a href='https://api.whatsapp.com/send?phone=573125362118' target="_blank" style={styleTexto}>
                                      <WhatsAppOutlined style={styleIcono}/>
                                      <TextoFooter>(+57) 312-536-2118</TextoFooter>
                                  </a>
                              </FlexRow>
                              
                          </Row>
                      </Col>

                  </Row>
                  <Divider style={{ margin: '10px'}}>
                  </Divider>
                  <Papu>
                      &copy; 2024 Panadería Horneados
                  </Papu>
              </Contenedor>
          </Footer>
      </Layout>
  );
}

export default CFooter;