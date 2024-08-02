import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LumxImg from './Lumx.png';
import AviaoImg from './Foto-Avião-PNG.png'; // Importando a imagem do avião


const MintToken = ({ walletId, aeroTokenId, pointsTokenId }) => {
    const [quantity, setQuantity] = useState(1);
    const [uriNumber, setUriNumber] = useState(0);
    const [transactionHashes, setTransactionHashes] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mintCompleted, setMintCompleted] = useState(false); // Para controle da exibição da imagem do avião
  
  const API_KEY = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiNGNkZTc1ZjctMzIxOC00Y2VlLWI2MzktZTJkNzI1ZjUyZTBjIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMjI3NTcwMn0.fqTH7U9VH-U38h4jBkzLAtMOnQID672VkssZ2uAbKHzEn7P3QhCWD2AI2C1haqQs3pCxocZuhogtpKh4chpqkYgRKoOqmcyFiQ-2y0orYS9KbWczxqiNZ_JYTVRFDrPLDGem4vtrZKlwk3psuFA5ulIml_3vUzf__26XO4VThQZqFlTwV3YDu8D4YgYNn5r1EfmWWTNMib4t7GfAe434kkNuM8SrYJjwmaA1PhQvZltJKZVfT7Td9aamXRoZAUO54Cp7U4V15HHZWjHcBvZpa4Fs1A547GQWq6c_0P_I4SCcffNKDkhqT_s33oWpMAJ4whQcgUSQa4NE7LiUfVHR2Ho-eAV-NhhJvK8bPcYKg9F3jLQduKSPQk0mLaDow04eOavcyySWqjGBwA2twFQOp41xEdi-vVNzKgKJpU8SDOPPz0ESBw18LumuDZO-lQPw7WLsO12hhSfDjEOxRG-tNlsuskYF4YH8TD-FiS3qcsME9tVaWLdOx1BgPG-ZvyfXEwUTeN47oHQRphBaimTccyIGxD82g5ZAugBtm1LTGIua_sSE7uynWpSRl6H_nrRqZuHPOO7uzKl9JusC9jD8ilXsgaqbHzhVVK765BJbAfwu2CR_IHOFyzGJE6nTivk_Ja7JOcBzIGGfeNFr4PVAefkOvOnK-nlNkklrCnBtK5c'; // Substitua pelo seu API key

  const mintToken = async (contractId, tokenType) => {
    try {
      const response = await axios.post('https://protocol-sandbox.lumx.io/v2/transactions/mints', {
        walletId,
        quantity,
        uriNumber,
        contractId,
      }, {
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      const pollInterval = setInterval(async () => {
        try {
          const pollResponse = await axios.get(`https://protocol-sandbox.lumx.io/v2/transactions/${result.id}`, {
            headers: {
              Authorization: API_KEY,
              'Content-Type': 'application/json',
            },
          });
          const pollResult = pollResponse.data;
          if (pollResult && pollResult.transactionHash) {
            setTransactionHashes(prev => ({ ...prev, [tokenType]: pollResult.transactionHash }));
            clearInterval(pollInterval);
            if (tokenType === 'Pontos') setMintCompleted(true); // Marca o fim da mintagem
          }
        } catch (pollError) {
          console.error(pollError);
          setError(pollError.response ? JSON.stringify(pollError.response.data) : 'Erro desconhecido');
          clearInterval(pollInterval);
        }
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response ? JSON.stringify(error.response.data) : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    setLoading(true);
    setTransactionHashes({});
    setError(null);

    try {
      await mintToken(aeroTokenId, 'Avião');
      await mintToken(pointsTokenId, 'Pontos');
    } catch (err) {
      setError('Ocorreu um erro durante o processo de minting.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <div className="custom-form-container">
            <div className="custom-form-content">
              <h3 className="custom-form-title">Compre sua passagem e ganhe pontos do nosso programa de fidelidade</h3>
              <Form>
                <Form.Group controlId="formWalletId">
                  <Form.Label className="custom-form-label">Wallet ID: </Form.Label>
                  <Form.Control
                    type="text"
                    value={walletId}
                    disabled
                    placeholder="Wallet ID"
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formQuantity">
                  <Form.Label className="custom-form-label">Quantidade de Passagens: </Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value, 10))}
                    placeholder="Insira a Quantidade"
                    className="custom-form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formUriNumber">
                  <Form.Label className="custom-form-label">Numero do Avião: </Form.Label>
                  <Form.Control
                    type="number"
                    value={uriNumber}
                    onChange={e => setUriNumber(parseInt(e.target.value, 10))}
                    placeholder="Insira o URI Number"
                    className="custom-form-input"
                  />
                </Form.Group>
                <Button className="custom-form-button" onClick={handleMint} disabled={loading || !walletId || !aeroTokenId || !pointsTokenId}>
                  {loading ? 'Minting...' : 'Mint Token e Pontos'}
                </Button>
                {transactionHashes.Avião && <p className="mt-3">Transaction Hash Avião: {transactionHashes.Avião}</p>}
                {transactionHashes.Pontos && <p className="mt-3">Transaction Hash Pontos: {transactionHashes.Pontos}</p>}
                {error && <p className="mt-3 custom-form-error">Erro: {error}</p>}
              </Form>
            </div>
            <div className="mint-image-container">
              <img src={LumxImg} alt="Loyalty Program" className="mint-form-image" />
            </div>
          </div>
        </Col>
      </Row>
      {mintCompleted && (
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <div className="mint-completed-container">
              <img src={AviaoImg} alt="Avião" className="mint-completed-image" />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MintToken;