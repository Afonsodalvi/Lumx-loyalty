import React, { useState } from 'react';
import axios, { setAuthToken } from '../api/axios';

const apiKey = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiZDkyMjkzYzgtMzA2NC00NjE5LTlhYmUtNmJkNDdkYmFkYzAyIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMTY2OTQ0NX0.c0MgDh-zKQ57W167iwzWk8X8t2ZhDPPYTMIMpmfsLqWY8aVrJHyP03no0D0FGFz_jzfe4BZMNG8gBj3fWXKUMyiT2vtypOKHbrhtAuuPlwIe0tSFHY7s3-g7JDNKG8TMalG_23-DddT6kXzN50csKPx8KbZikrUygBJ6W0YWU7Uq21uU3qETPD-HGTGz4kBwwWV87U1VAVty_bM9m2l6Mr8uOzDHERztfNmhluL9A0ps7rjTCHFP3IW1n00zZHZR16F4G_dtdjOuw0PxRo1yy1VAqmWSpNw-NCaIAVmnuxoGkHNVbkHvVw7luoToR1pD19Poh5syz-pVaEtmyy75VWvel1mBsbWV4hip68J2ucNXIiANetr27ILQdushrRw69j10jgIJzS9ea_5GJ1gdJMv0Rtvwu04Sm8eQ-6ZzxKAkERGR2kzdr29BUK1uR-SmEoZnt55RFMwlCeaLuUDs0immDIzyYD6rRfHqPYrrYhH-rLw57gyXaicCvIR-dXNn4UfhHr6NyyzTNlIJpuoB5m7I8UCdcjvwRI5HLCq_aPUprMN6xKTwlNMnqttkQKK5Oxo4ND1n_9L-GCI7mUmc_XRNcPZkuGw0YxVIC08yA46S8wTrKvavPawmBAhV8bF4PzN-IHHAvvGy35aO2zPipgD9C0q2uZyMWxPEUjKyMH0';

const ConnectWallet = ({ onWalletCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'POST',
      headers: {
        Authorization: apiKey,
      },
    };

    axios.post('/wallets', {}, options)
      .then(response => {
        setAuthToken(apiKey);
        onWalletCreated(response.data.id);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response ? err.response.data : 'Unknown error');
        setLoading(false);
      });
  };

  return (
    <div className="p-4 bg-primary text-light">
      {loading ? <p>Loading...</p> : <button onClick={connectWallet}>Connect Wallet</button>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ConnectWallet;
