import React, { useState } from 'react';
import axios, { setAuthToken } from '../api/axios';

const apiKey = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiNGNkZTc1ZjctMzIxOC00Y2VlLWI2MzktZTJkNzI1ZjUyZTBjIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMjI3NTcwMn0.fqTH7U9VH-U38h4jBkzLAtMOnQID672VkssZ2uAbKHzEn7P3QhCWD2AI2C1haqQs3pCxocZuhogtpKh4chpqkYgRKoOqmcyFiQ-2y0orYS9KbWczxqiNZ_JYTVRFDrPLDGem4vtrZKlwk3psuFA5ulIml_3vUzf__26XO4VThQZqFlTwV3YDu8D4YgYNn5r1EfmWWTNMib4t7GfAe434kkNuM8SrYJjwmaA1PhQvZltJKZVfT7Td9aamXRoZAUO54Cp7U4V15HHZWjHcBvZpa4Fs1A547GQWq6c_0P_I4SCcffNKDkhqT_s33oWpMAJ4whQcgUSQa4NE7LiUfVHR2Ho-eAV-NhhJvK8bPcYKg9F3jLQduKSPQk0mLaDow04eOavcyySWqjGBwA2twFQOp41xEdi-vVNzKgKJpU8SDOPPz0ESBw18LumuDZO-lQPw7WLsO12hhSfDjEOxRG-tNlsuskYF4YH8TD-FiS3qcsME9tVaWLdOx1BgPG-ZvyfXEwUTeN47oHQRphBaimTccyIGxD82g5ZAugBtm1LTGIua_sSE7uynWpSRl6H_nrRqZuHPOO7uzKl9JusC9jD8ilXsgaqbHzhVVK765BJbAfwu2CR_IHOFyzGJE6nTivk_Ja7JOcBzIGGfeNFr4PVAefkOvOnK-nlNkklrCnBtK5c';

//Ethereum: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiNGNkZTc1ZjctMzIxOC00Y2VlLWI2MzktZTJkNzI1ZjUyZTBjIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMjI3NTcwMn0.fqTH7U9VH-U38h4jBkzLAtMOnQID672VkssZ2uAbKHzEn7P3QhCWD2AI2C1haqQs3pCxocZuhogtpKh4chpqkYgRKoOqmcyFiQ-2y0orYS9KbWczxqiNZ_JYTVRFDrPLDGem4vtrZKlwk3psuFA5ulIml_3vUzf__26XO4VThQZqFlTwV3YDu8D4YgYNn5r1EfmWWTNMib4t7GfAe434kkNuM8SrYJjwmaA1PhQvZltJKZVfT7Td9aamXRoZAUO54Cp7U4V15HHZWjHcBvZpa4Fs1A547GQWq6c_0P_I4SCcffNKDkhqT_s33oWpMAJ4whQcgUSQa4NE7LiUfVHR2Ho-eAV-NhhJvK8bPcYKg9F3jLQduKSPQk0mLaDow04eOavcyySWqjGBwA2twFQOp41xEdi-vVNzKgKJpU8SDOPPz0ESBw18LumuDZO-lQPw7WLsO12hhSfDjEOxRG-tNlsuskYF4YH8TD-FiS3qcsME9tVaWLdOx1BgPG-ZvyfXEwUTeN47oHQRphBaimTccyIGxD82g5ZAugBtm1LTGIua_sSE7uynWpSRl6H_nrRqZuHPOO7uzKl9JusC9jD8ilXsgaqbHzhVVK765BJbAfwu2CR_IHOFyzGJE6nTivk_Ja7JOcBzIGGfeNFr4PVAefkOvOnK-nlNkklrCnBtK5c
//Polygon: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiZDkyMjkzYzgtMzA2NC00NjE5LTlhYmUtNmJkNDdkYmFkYzAyIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcyMTY2OTQ0NX0.c0MgDh-zKQ57W167iwzWk8X8t2ZhDPPYTMIMpmfsLqWY8aVrJHyP03no0D0FGFz_jzfe4BZMNG8gBj3fWXKUMyiT2vtypOKHbrhtAuuPlwIe0tSFHY7s3-g7JDNKG8TMalG_23-DddT6kXzN50csKPx8KbZikrUygBJ6W0YWU7Uq21uU3qETPD-HGTGz4kBwwWV87U1VAVty_bM9m2l6Mr8uOzDHERztfNmhluL9A0ps7rjTCHFP3IW1n00zZHZR16F4G_dtdjOuw0PxRo1yy1VAqmWSpNw-NCaIAVmnuxoGkHNVbkHvVw7luoToR1pD19Poh5syz-pVaEtmyy75VWvel1mBsbWV4hip68J2ucNXIiANetr27ILQdushrRw69j10jgIJzS9ea_5GJ1gdJMv0Rtvwu04Sm8eQ-6ZzxKAkERGR2kzdr29BUK1uR-SmEoZnt55RFMwlCeaLuUDs0immDIzyYD6rRfHqPYrrYhH-rLw57gyXaicCvIR-dXNn4UfhHr6NyyzTNlIJpuoB5m7I8UCdcjvwRI5HLCq_aPUprMN6xKTwlNMnqttkQKK5Oxo4ND1n_9L-GCI7mUmc_XRNcPZkuGw0YxVIC08yA46S8wTrKvavPawmBAhV8bF4PzN-IHHAvvGy35aO2zPipgD9C0q2uZyMWxPEUjKyMH0
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
        const { id, address } = response.data;
        onWalletCreated({ id, address });
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