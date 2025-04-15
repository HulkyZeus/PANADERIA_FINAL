import styled from '@emotion/styled';
import '../css/main.css/';
import { Carousel } from 'antd';
import { Layout, Row, Col } from 'antd';
import { Card } from 'antd';
import TortaVanilla from '../img/TortaVanilla.webp';
import TortaChocolate from '../img/tortachoco.png';
import TortaRedVelvet from '../img/TortaRedVelvet.webp';
import TortaNaked from '../img/TortaNaked.webp';
import TartaletasFrutas from '../img/TartaletasFrutas.webp';
import Macarrones from '../img/Macarrones.webp';
import BrowniesGourmet from '../img/BrowniesGourmet.webp';
import CheesecakeVasito from '../img/CheesecakeVasito.webp';
import CoctelChampagne from '../img/CoctelChampagne.webp';
import LimonadaRomero from '../img/LimonadaRomero.webp';
import AguaInfusionada from '../img/AguaInfusionada.webp';
import MojitoSinAlcohol from '../img/MojitoSinAlcohol.webp';
import { useTranslation } from "react-i18next";

import MiniQuiches from '../img/MiniQuiches.webp';
import Empanaditas from '../img/Empanaditas.webp';
import CanapesSalmon from '../img/CanapesSalmon.webp';
import RollitosJamon from '../img/RollitosJamon.webp';

const { Content } = Layout;


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

const contentStyle = {
  margin: 0,
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};




const Matrimonios = () => {
    const {t} = useTranslation();

    const tortasDeBoda = [
      { title: [t('Torta Clásica de Vainilla')], img: TortaVanilla, description: [t('DTorta Clásica de Vainilla')] },
      { title: [t('Torta de Chocolate y Frutas')], img: TortaChocolate, description: [t('DTorta de Chocolate y Frutas')] },
      { title: [t('Torta Red Velvet')], img: TortaRedVelvet, description: [t('DTorta Red Velvet')] },
      { title: [t('Torta Naked Almendras')], img: TortaNaked, description: [t('DTorta Naked Almendras')] },
    ];
    
    const MesadePostres = [
      { title: [t('Mini Tartaletas de Frutas')], img: TartaletasFrutas, description: [t("DMini Tartaletas de Frutas")] },
      { title: [t('Macarrones Franceses')], img: Macarrones, description: [t("DMacarrones Franceses")] },
      { title: [t('Brownies Gourmet')], img: BrowniesGourmet, description: [t("DBrownies Gourmet")] },
      { title: [t('Cheesecake en Vasito')], img: CheesecakeVasito, description: [t("DCheesecake en Vasito")] },
    ];
    
    const Bebidas = [
      { title: [t('Coctel de Champagne')], img: CoctelChampagne, description: [t('DCoctel de Champagne')] },
      { title: [t('Limonada con Romero')], img: LimonadaRomero, description: [t('DLimonada con Romero')] },
      { title: [t('Agua Infusionada')], img: AguaInfusionada, description: [t('DAgua Infusionada')] },
      { title: [t('Mojito Sin Alcohol')], img: MojitoSinAlcohol, description: [t('DMojito Sin Alcohol')] },
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
        <Carousel arrows autoplay infinite={false} >
          <div>
            <h3 style={contentStyle}>
              <div className='Torta3Pisos'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("MT1I1")}</span>
                  <span className='TextoEvento'>{t("MT1I2")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='CupcakesDecorados'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("MT2I1")}</span>
                  <span className='TextoEvento'>{t("MT2I2")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='PostresGourmet'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("MT3I1")}</span>
                  <span className='TextoEvento'>{t("MT3I2")}</span>
                </div>                
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='GalletasPersonalizadas'>
                <div className='CajaRight'>
                  <span className='TextoEvento'>{t("MT4I1")}</span>
                  <span className='TextoEvento'>{t("MT4I2")}</span>
                </div>
              </div>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <div className='MesaPostres'>
                <div className='CajaLeft'>
                  <span className='TextoEvento'>{t("MT5I1")}</span>
                  <span className='TextoEvento'>{t("MT5I2")}</span>
                </div>
              </div>
            </h3>
          </div>        
        </Carousel>

        <Row style={{ margin: '5px 0px' }}>
          <Col span={4}>
          </Col>

          <Col span={16}>
            <H1>{t("Matrimonios")}</H1>
            <P1>
              {t("PM1")}
            </P1>
            <P1>
              {t("PM2")}
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
            <H2>{t("Tortas de Boda")}</H2>
            <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Row gutter={[16, 16]} justify="center">
                  {tortasDeBoda.slice(0, 4).map((tortasDeBoda, index) => (
                    <Col span={6} key={index}>
                      <Card
                        hoverable
                        cover={<img alt={tortasDeBoda.title} src={tortasDeBoda.img} style={{ width: '100%', height: '275px' }}/>}
                      >
                        <Card.Meta title={tortasDeBoda.title} description={tortasDeBoda.description} style={{ width: '100%', height: '100px'}}/>
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
              <H2>{t("Bebidas2")}</H2>
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
export default Matrimonios;