import styled from '@emotion/styled';
import '../css/main.css/';
import { Carousel } from 'antd';
import { Layout, Flex, Row, Col } from 'antd';
import { Card } from 'antd';
import TortaAvellanas from '../img/TortaAvellanas.webp';
import FrutosRojos from '../img/FrutosRojos.webp';
import TortaZana from '../img/TortaZana.webp';
import TresLeches from '../img/TresLeches.webp';

import BrowniesGourmet from '../img/BrowniesGourmet.webp';
import Macarrones from '../img/Macarrones.webp';
import Maracuya from '../img/Maracuya.jpg';
import MiniEclair from '../img/MiniEclair.webp';

import Bellini from '../img/Bellini.webp';
import Tefrio from '../img/Tefrio.webp';
import Martini from '../img/Martini.webp';
import LimonadaLavanda from '../img/LimonadaLavanda.webp';

import MiniQuiches from '../img/MiniQuiches.webp';
import Empanaditas from '../img/Empanaditas.webp';
import CanapesSalmon from '../img/CanapesSalmon.webp';
import RollitosJamon from '../img/RollitosJamon.webp';

import { useTranslation } from "react-i18next";

const { Content } = Layout;
const { Meta } = Card;

const H1 = styled.h1`
  font-weight: bold;
  margin: 20px;
  font-size: 26px;
`

const H2 = styled.h1`
  font-weight: bold;
  margin: 10px;
  font-size: 26px;
`

const P1 = styled.p`
  margin: 20px;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
`

const PCajaDecoracion = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  font-size: 18px;
  font-weight: bold;
  heigth: 100px;
  width: 100px;
`

const ContenOfrec = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-radius: 25px;
  background-color: #905d01;
  margin: 20px 0px;
`

const HOfrec = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin: 20px;
`

const Imagen = styled.img`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const contentStyle = {
  margin: 0,
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};




const Aniversarios = () => {
  const {t} = useTranslation();

  const tortasDeAniversario = [
    { title: [t('Torta Chocolate/Avellanas')], img: TortaAvellanas, description: [t('DTorta Chocolate/Avellanas')] },
    { title: [t('Torta Frutos Rojos')], img: FrutosRojos, description: [t('DDTorta Frutos Rojos')] },
    { title: [t('Torta Zanahoria Nueces')], img: TortaZana, description: [t('DTorta Zanahoria Nueces')] },
    { title: [t('Torta de Tres Leches')], img: TresLeches, description: [t('DDTorta de Tres Leches')] },
  ];
  
  const MesadePostres = [
    { title: [t('Mini Tartas de Chocolate')], img: BrowniesGourmet, description: [t('DMini Tartas de Chocolate')] },
    { title: [t('Macarons Personalizados')], img: Macarrones, description: [t('DMacarons Personalizados')] },
    { title: [t('Cheesecake de Maracuyá')], img: Maracuya, description:  [t('DCheesecake de Maracuyá')] },
    { title: [t('Mini Éclairs')], img: MiniEclair, description:  [t('DMini Éclairs')] },
  ];
  
  const Bebidas = [
    { title: [t('Coctel Bellini')], img: Bellini, description: [t('DCoctel Bellini')] },
    { title: [t('Té Frío de Hibisco')], img: Tefrio, description: [t('DTé Frío de Hibisco')] },
    { title: [t('Espresso Martini')], img: Martini, description: [t('DEspresso Martini')] },
    { title: [t('Limonada de Lavanda')], img: LimonadaLavanda, description: [t('DLimonada de Lavanda')] },
  ];
  
  const Bocadillos = [
    { title: [t('Mini Quiches')], img: MiniQuiches, description: [t('DMini Quiches')] },
    { title: [t('Empanaditas Gourmet')], img: Empanaditas, description: [t('DEmpanaditas Gourmet')] },
    { title: [t('Canapés de Salmón')], img: CanapesSalmon, description: [t('DCanapés de Salmón')] },
    { title: [t('Rollitos Jamón y Queso')], img: RollitosJamon, description: [t('DRollitos Jamón y Queso')] },
  ];
  return(
  <>

    <Layout>
      <Content className='FondoPan'>
        <Carousel arrows infinite={false} >
          <div>
            <h3 style={contentStyle}>
              <div className='TortaFlores'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("TORTA DE")}</span>
                  <span className='TextoEvento'>{t("ANIVERSARIO")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='MacaronsCele'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("MACARONS")}</span>
                  <span className='TextoEvento'>{t("DE CELEBRACIÓN")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='CupcakeAni'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("CUPCAKES PARA")}</span>
                  <span className='TextoEvento'>{t("ANIVERSARIOS")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='MiniTartas'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("MINITARTAS DE")}</span>
                  <span className='TextoEvento'>{t("FRUTAS")}</span>
                </div>
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='GalletasAniversario'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("GALLETAS")}</span>
                  <span className='TextoEvento'>{t("DECORADAS")}</span>
                </div>
              </div>
            </h3>
          </div>        
        </Carousel>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H1>{t("Aniversarios")}</H1>
            <P1>
            {t("P1A1")}
            </P1>
            <P1>
            {t("P1A2")} 
            </P1>
          </Col>

          <Col span={4}>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
          </Col>
          <Col span={16}>
            <ContenOfrec>
              <HOfrec>{t("¿Qué ofrecemos?")}</HOfrec>
            </ContenOfrec>
          </Col>
          <Col span={4}>
          </Col>
        </Row>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H2>{t("Tortas de Aniversario")}</H2>
            <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {tortasDeAniversario.slice(0, 4).map((tortasDeAniversario, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={tortasDeAniversario.title} src={tortasDeAniversario.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={tortasDeAniversario.title} description={tortasDeAniversario.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <H2>{t("Mesa de Postres")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {MesadePostres.slice(0, 4).map((MesadePostres, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={MesadePostres.title} src={MesadePostres.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={MesadePostres.title} description={MesadePostres.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>              
              <H2>{t("Bebidas")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {Bebidas.slice(0, 4).map((Bebidas, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={Bebidas.title} src={Bebidas.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={Bebidas.title} description={Bebidas.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <H2>{t("Bocadillos")}</H2>
              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {Bocadillos.slice(0, 4).map((Bocadillos, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={Bocadillos.title} src={Bocadillos.img} style={{ width: '100%', height: '250px' }}/>}
                      >
                        <Card.Meta title={Bocadillos.title} description={Bocadillos.description} style={{ width: '100%', height: '100px'}}/>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>              
          </Col>

          <Col span={4}>
          </Col>
        </Row>

      </Content>
    </Layout>

  </>
  )
};
export default Aniversarios;