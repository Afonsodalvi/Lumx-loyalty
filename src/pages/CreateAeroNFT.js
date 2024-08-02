import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../CustomStyles.css';
import AviaoImg from './Foto-Avião-PNG.png';
import MilhasImg from './milhas.jpeg';

const apiKey = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiNGNkZTc1ZjctMzIxOC00Y2VlLWI2MzktZTJkNzI1ZjUyZTBjIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMjI3NTcwMn0.fqTH7U9VH-U38h4jBkzLAtMOnQID672VkssZ2uAbKHzEn7P3QhCWD2AI2C1haqQs3pCxocZuhogtpKh4chpqkYgRKoOqmcyFiQ-2y0orYS9KbWczxqiNZ_JYTVRFDrPLDGem4vtrZKlwk3psuFA5ulIml_3vUzf__26XO4VThQZqFlTwV3YDu8D4YgYNn5r1EfmWWTNMib4t7GfAe434kkNuM8SrYJjwmaA1PhQvZltJKZVfT7Td9aamXRoZAUO54Cp7U4V15HHZWjHcBvZpa4Fs1A547GQWq6c_0P_I4SCcffNKDkhqT_s33oWpMAJ4whQcgUSQa4NE7LiUfVHR2Ho-eAV-NhhJvK8bPcYKg9F3jLQduKSPQk0mLaDow04eOavcyySWqjGBwA2twFQOp41xEdi-vVNzKgKJpU8SDOPPz0ESBw18LumuDZO-lQPw7WLsO12hhSfDjEOxRG-tNlsuskYF4YH8TD-FiS3qcsME9tVaWLdOx1BgPG-ZvyfXEwUTeN47oHQRphBaimTccyIGxD82g5ZAugBtm1LTGIua_sSE7uynWpSRl6H_nrRqZuHPOO7uzKl9JusC9jD8ilXsgaqbHzhVVK765BJbAfwu2CR_IHOFyzGJE6nTivk_Ja7JOcBzIGGfeNFr4PVAefkOvOnK-nlNkklrCnBtK5c';

const CreateAeroNFT = ({ onTokenCreated }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [maxSupply, setMaxSupply] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [responseAddress, setResponseAddress] = useState(null);

  const [milesName, setMilesName] = useState('');
  const [milesSymbol, setMilesSymbol] = useState('');
  const [milesMaxSupply, setMilesMaxSupply] = useState('');
  const [milesTokenId, setMilesTokenId] = useState(null);
  const [milesLoading, setMilesLoading] = useState(false);
  const [milesError, setMilesError] = useState(null);
  const [milesResponseId, setMilesResponseId] = useState(null);
  const [milesResponseAddress, setMilesResponseAddress] = useState(null);

  const handleCreateAndDeployToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const contractResponse = await axios.post(
        'https://protocol-sandbox.lumx.io/v2/contracts',
        { name, symbol, type: 'non_fungible' },
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );
      const contractId = contractResponse.data.id;
      setTokenId(contractId);

      await axios.post(
        `https://protocol-sandbox.lumx.io/v2/contracts/${contractId}/token-types`,
        {
          name: 'Supply',
          description: 'setSupply',
          maxSupply: parseInt(maxSupply, 10),
        },
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );

      await axios.post(
        `https://protocol-sandbox.lumx.io/v2/contracts/${contractId}/deploy`,
        {},
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );

      const pollInterval = setInterval(async () => {
        try {
          const pollResponse = await axios.get(`https://protocol-sandbox.lumx.io/v2/contracts/${contractId}`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json',
            },
          });
          const pollResult = pollResponse.data;
          if (pollResult && pollResult.id && pollResult.address) {
            setResponseId(pollResult.id);
            setResponseAddress(pollResult.address);
            setTokenId(pollResult.id);
            clearInterval(pollInterval);
            setLoading(false);
          }
        } catch (pollError) {
          console.error(pollError);
          setError(pollError.response ? JSON.stringify(pollError.response.data) : 'Unknown error');
          clearInterval(pollInterval);
          setLoading(false);
        }
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response ? JSON.stringify(error.response.data) : 'Unknown error');
      setLoading(false);
    }
  };

  const handleCreateAndDeployMilesToken = async () => {
    setMilesLoading(true);
    setMilesError(null);

    try {
      const contractResponse = await axios.post(
        'https://protocol-sandbox.lumx.io/v2/contracts',
        { name: milesName, symbol: milesSymbol, type: 'fungible' },
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );
      const contractId = contractResponse.data.id;
      setMilesTokenId(contractId);

      await axios.post(
        `https://protocol-sandbox.lumx.io/v2/contracts/${contractId}/token-types`,
        {
          name: 'Miles',
          description: 'Miles Supply',
          maxSupply: parseInt(milesMaxSupply, 10),
        },
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );

      await axios.post(
        `https://protocol-sandbox.lumx.io/v2/contracts/${contractId}/deploy`,
        {},
        { headers: { Authorization: apiKey, 'Content-Type': 'application/json' } }
      );

      const pollInterval = setInterval(async () => {
        try {
          const pollResponse = await axios.get(`https://protocol-sandbox.lumx.io/v2/contracts/${contractId}`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json',
            },
          });
          const pollResult = pollResponse.data;
          if (pollResult && pollResult.id && pollResult.address) {
            setMilesResponseId(pollResult.id);
            setMilesResponseAddress(pollResult.address);
            setMilesTokenId(pollResult.id);
            clearInterval(pollInterval);
            setMilesLoading(false);
            // Passando IDs para o App.js
            if (tokenId && pollResult.id) {
              onTokenCreated(tokenId, pollResult.id);
            }
          }
        } catch (pollError) {
          console.error(pollError);
          setMilesError(pollError.response ? JSON.stringify(pollError.response.data) : 'Unknown error');
          clearInterval(pollInterval);
          setMilesLoading(false);
        }
      }, 5000);
    } catch (error) {
      console.error(error);
      setMilesError(error.response ? JSON.stringify(error.response.data) : 'Unknown error');
      setMilesLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <div className="custom-form-container">
            <div className="custom-form-content">
              <h3 className="custom-form-title">Criar Itinerário</h3>
              <Form>
                <Form.Group controlId="formTokenName">
                  <Form.Label className="custom-form-label">Nome: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do Token"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formTokenSymbol">
                  <Form.Label className="custom-form-label">Símbolo: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Símbolo do Token"
                    value={symbol}
                    onChange={e => setSymbol(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formMaxSupply">
                  <Form.Label className="custom-form-label">Máximo de Passageiros: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Max Supply"
                    value={maxSupply}
                    onChange={e => setMaxSupply(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                  <Form.Label className="custom-form-label">URL da Imagem: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL da Imagem"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="custom-form-input"
                  />
                </Form.Group>
                <Button className="custom-form-button" onClick={handleCreateAndDeployToken} disabled={loading}>
                  {loading ? 'Criando e Deployando...' : 'Criar e Deployar Avião NFT'}
                </Button>
                {tokenId && <p className="mt-3 custom-form-token-id">Avião ID: {tokenId}</p>}
                {responseId && <p className="mt-3">Avião ID: {responseId}</p>}
                {responseAddress && <p className="mt-3">Endereço do Avião na Blockchain: {responseAddress}</p>}
                {error && <p className="mt-3 custom-form-error">Erro: {error}</p>}
              </Form>
            </div>
            <div>
              <img src={imageUrl || 'https://s1.1zoom.me/b5062/263/Passenger_Airplanes_Evening_Flight_Asphalt_Takeoff_516323_3840x2160.jpg'} alt="NFT" className="custom-form-image" />
              {responseAddress && (
                <div className="emitir-voo-image">
                  <img src={AviaoImg} alt="Avião" className="custom-form-image" />
                  </div>
                )}
              </div>
            </div>

            <div className="custom-form-container mt-4">
              <div className="custom-form-content">
                <h3 className="custom-form-title">Emitir Pontos para Milhas: </h3>
                <Form>
                  <Form.Group controlId="formMilesName">
                    <Form.Label className="custom-form-label">Nome dos Pontos: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome dos Pontos"
                      value={milesName}
                      onChange={e => setMilesName(e.target.value)}
                      className="custom-form-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="formMilesSymbol">
                    <Form.Label className="custom-form-label">Símbolo dos Pontos: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Símbolo dos Pontos"
                      value={milesSymbol}
                      onChange={e => setMilesSymbol(e.target.value)}
                      className="custom-form-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="formMilesMaxSupply">
                    <Form.Label className="custom-form-label">Máximo de Pontos: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Max Supply"
                      value={milesMaxSupply}
                      onChange={e => setMilesMaxSupply(e.target.value)}
                      className="custom-form-input"
                    />
                  </Form.Group>
                  <Button className="custom-form-button" onClick={handleCreateAndDeployMilesToken} disabled={milesLoading}>
                    {milesLoading ? 'Criando e Deployando...' : 'Criar e Deployar Pontos'}
                  </Button>
                  {milesTokenId && <p className="mt-3 custom-form-token-id">Token ID: {milesTokenId}</p>}
                  {milesResponseId && <p className="mt-3">Token ID: {milesResponseId}</p>}
                  {milesResponseAddress && <p className="mt-3">Endereço do Token na Blockchain: {milesResponseAddress}</p>}
                  {milesError && <p className="mt-3 custom-form-error">Erro: {milesError}</p>}
                </Form>
              </div>
              {milesResponseAddress && (
                <div className="emitir-milhas-image">
                  <img src={MilhasImg} alt="Milhas" className="custom-form-image" />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  export default CreateAeroNFT;