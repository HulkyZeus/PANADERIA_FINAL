import { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Layout, Col, Row } from "antd";  // Eliminé Content de la importación
import { useTranslation } from "react-i18next";

const cajaDecoracion = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '150px',
  backgroundColor: 'rgba(114, 93, 66, 1)',
  borderRadius: '20px',
};

const texto = {
  fontSize: '50px',
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
};

const markers = [
  {
    id: 1,
    name: "Cra17b #51a",
    position: { lat: 2.955533, lng: -75.286687 },
  },
  {
    id: 2,
    name: "Cl. 22a Sur #24-2 a 24-90",
    position: { lat: 2.907675, lng: -75.272684 },
  },
  {
    id: 3,
    name: "calle 16#7-120",
    position: { lat: 2.934373, lng: -75.288533 },
  },
];



const API = () => {
 const { t } = useTranslation(); 

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#e8e8e8' }}>
        <Layout.Content>
          <div></div>
          <div>
            <Row justify="center" align="middle" style={{ marginTop: "30px", height: "150px" }}>
              <Col span={16}>
                <div style={cajaDecoracion}>
                  <span style={texto}>{t("greeting")}</span>
                </div>
              </Col>
            </Row>
            <Row justify="center" align="middle" style={{margin:"30px"}}>
              <Col span={16}>
              <div style={{ width: "100%", height: "93vh", border:"4px solid #725D42", borderRadius:"5px"}}>
                {isLoaded ? (
                  <GoogleMap
                    center={{ lat: 2.9289, lng: -75.28189 }}
                    zoom={13}
                    onClick={() => setActiveMarker(null)}
                    mapContainerStyle={{ width: "100%", height: "90vh" }}
                  >
                    {markers.map(({ id, name, position }) => (
                      <MarkerF
                        key={id}
                        position={position}
                        onClick={() => handleActiveMarker(id)}
                      >
                        {activeMarker === id ? (
                          <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div>{name}</div>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    ))}
                  </GoogleMap>
                ) : null}
              </div>
              </Col>
              
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default API;
