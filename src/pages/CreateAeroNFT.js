import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../CustomStyles.css';

const apiKey = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiZDkyMjkzYzgtMzA2NC00NjE5LTlhYmUtNmJkNDdkYmFkYzAyIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMTY2OTQ0NX0.c0MgDh-zKQ57W167iwzWk8X8t2ZhDPPYTMIMpmfsLqWY8aVrJHyP03no0D0FGFz_jzfe4BZMNG8gBj3fWXKUMyiT2vtypOKHbrhtAuuPlwIe0tSFHY7s3-g7JDNKG8TMalG_23-DddT6kXzN50csKPx8KbZikrUygBJ6W0YWU7Uq21uU3qETPD-HGTGz4kBwwWV87U1VAVty_bM9m2l6Mr8uOzDHERztfNmhluL9A0ps7rjTCHFP3IW1n00zZHZR16F4G_dtdjOuw0PxRo1yy1VAqmWSpNw-NCaIAVmnuxoGkHNVbkHvVw7luoToR1pD19Poh5syz-pVaEtmyy75VWvel1mBsbWV4hip68J2ucNXIiANetr27ILQdushrRw69j10jgIJzS9ea_5GJ1gdJMv0Rtvwu04Sm8eQ-6ZzxKAkERGR2kzdr29BUK1uR-SmEoZnt55RFMwlCeaLuUDs0immDIzyYD6rRfHqPYrrYhH-rLw57gyXaicCvIR-dXNn4UfhHr6NyyzTNlIJpuoB5m7I8UCdcjvwRI5HLCq_aPUprMN6xKTwlNMnqttkQKK5Oxo4ND1n_9L-GCI7mUmc_XRNcPZkuGw0YxVIC08yA46S8wTrKvavPawmBAhV8bF4PzN-IHHAvvGy35aO2zPipgD9C0q2uZyMWxPEUjKyMH0';

const CreateAeroNFT = ({ onTokenCreated }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [maxSupply, setMaxSupply] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateToken = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      data: { name, symbol, type: 'non_fungible' }
    };

    try {
      const response = await axios('https://protocol-sandbox.lumx.io/v2/contracts', options);
      const contractId = response.data.id;
      setTokenId(contractId);
      onTokenCreated(contractId);
      await createTokenType(contractId);
    } catch (err) {
      setError(err.response ? err.response.data : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createTokenType = async (contractId) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'supply',
        description: 'mySupply',
        maxSupply: parseInt(maxSupply, 10),
        imageUrl: imageUrl,
      }
    };

    try {
      const response = await axios(`https://protocol-sandbox.lumx.io/v2/contracts/${contractId}/token-types`, options);
      console.log(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Unknown error');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <div className="custom-form-container">
            <div className="custom-form-content">
              <h3 className="custom-form-title">Emita sua NFT Airline</h3>
              <Form>
                <Form.Group controlId="formTokenName">
                  <Form.Label className="custom-form-label">Origem e Destino </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do Token"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formTokenSymbol">
                  <Form.Label className="custom-form-label">Simbolo </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Símbolo do Token"
                    value={symbol}
                    onChange={e => setSymbol(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formMaxSupply">
                  <Form.Label className="custom-form-label">Max Passageiros </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Max Supply"
                    value={maxSupply}
                    onChange={e => setMaxSupply(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                  <Form.Label className="custom-form-label">Image URL </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Button className="custom-form-button" onClick={handleCreateToken} disabled={loading}>
                  {loading ? 'Creating...' : 'Criar Token'}
                </Button>
                {tokenId && <p className="mt-3 custom-form-token-id">Token ID: {tokenId}</p>}
                {error && <p className="mt-3 custom-form-error">Error: {error}</p>}
              </Form>
            </div>
            <div>
              <img src={imageUrl || 'https://s1.1zoom.me/b5062/263/Passenger_Airplanes_Evening_Flight_Asphalt_Takeoff_516323_3840x2160.jpg'} alt="NFT" className="custom-form-image" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAeroNFT;
