import { Network, Alchemy } from "alchemy-sdk";
import { utils } from "ethers";
//  network: Network.MATIC_MUMBAI,
/*
const settings = {
  apiKey: "Pee6TJj3LzA6gBceh0FDxHTJi5H9cSE0",
  network: Network.MATIC_MUMBAI,
};
*/

const settings = {
  apiKey: "NX6WOO4P3vuKnmjIW_m82o5zEogRrYew",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getTokenBalances(address) {
  let tokensWithData = [];

  const tokens = await alchemy.core.getTokenBalances(address);

  for (let i = 0; i < tokens.tokenBalances.length; i++) {
    let metaData = await alchemy.core.getTokenMetadata(
      tokens.tokenBalances[i].contractAddress
    );

    let num = parseInt(Number(tokens.tokenBalances[i].tokenBalance));
    let calculated = num / Math.pow(10, metaData.decimals);

    let data = {
      address: tokens.tokenBalances[i].contractAddress,
      metadata: metaData,
      balance: calculated,
    };

    if (calculated >= 0.000001) {
      tokensWithData.push(data);
    }
  }
  return tokensWithData;
}

export async function getAllNfts(address) {
  // Get all outbound transfers for a provided address
  const nfts = await alchemy.nft.getNftsForOwner(address);
  return nfts.ownedNfts;
}

export async function getAllTransactionsFrom(to, from) {
  // Get all outbound transfers for a provided address

  const transactions = await alchemy.core.getAssetTransfers({
    toAddress: to,
    fromAddress: from,
    excludeZeroValue: true,
    category: ["erc721", "erc20"],
    order: "desc",
  });

  console.log();

  let res = [];

  for (let i = 0; i < 100; i++) {
    let tran = transactions.transfers[i];
    let parsed = await parseTransaction(tran);
    console.log(parsed);
    res.push(parsed);
  }
  return res;
}

export async function getTransactionsBetween(me, other) {
  console.log("getting transactions");
  let a = await getAllTransactionsFrom(me, other);
  let b = await getAllTransactionsFrom(other, me);

  console.log(a);
  console.log(b);
}

async function parseTransaction(tran) {
  if (tran.category == "erc20") {
    let metaData = await alchemy.core.getTokenMetadata(
      tran.rawContract.address
    );

    let log = {
      logo: metaData.logo,
      category: "erc20",
      symbol: tran.asset,
      amount: tran.value,
      to: tran.to,
      from: tran.from,
    };
    return log;
  } else if (tran.category == "erc721") {
    // let metaData = await alchemy.nft.getNftMetadata(tran.);

    // console.log(metaData);
    let log = {
      asset: tran.asset,
      category: "erc721",

      tokenId: tran.tokenId,
      to: tran.to,
      from: tran.from,
    };

    console.log("-------");
    console.log(tran);
    //
  }
}

export async function sendErc20(address) {
  //sends erc-20 token
}

export async function sendNft(address) {
  //sends NFT
}
