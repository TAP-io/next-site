import apiReq from "@/lib/fetcher";

import { VerificationResponse } from "@worldcoin/id";
import { NextApiRequest,NextApiResponse } from "next";
const axios = require('axios');


export async function verifyProof(_address, _proof,_nullifier_hash,_merkle_root) {

    axios({
        method: 'post',
        url: '/user/12345',
        data: {
            "action_id": "wid_67cc5cce351405cd8daa6d5f11d9e3b0",
            "signal": {_address},
            "proof": {_proof},
            "nullifier_hash": {_nullifier_hash},
            "merkle_root": {_merkle_root}
          }
      }).then(function (response) {
        
      });
}