import * as ethers from "ethers";
import ContractAbi from "../../public/abi/contactlist.json";
import erc721abi from "../../public/abi/erc721.json";
import erc20abi from "../../public/abi/erc20.json";
import { Web3Storage } from "web3.storage";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyOTZDMTkxMkY0M0E0NkNBNDJmQzcxNmQxZmNjN2UwNGQxZEI3MGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUzMDU2MzI2OTEsIm5hbWUiOiJUYXAifQ.iyIOJOSITF4lj6ADpnbyRI8tJiSl6ukuWAaBgVivMek",
  });
}

function makeFileObjects(_name, _address, _phone) {
  const obj = { name: _name, address: _address, phone: _phone };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], `${_name}.json`),
  ];
  return files;
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

let provider = null;

let contract_address = "0xBDf1F1E3f754898DB2c7E062a93388963eF0fCf1";

export function setProvider(p) {
  provider = p;
}

export async function createList(phone) {
  const signer = provider.getSigner();
  const ContactList = new ethers.Contract(
    contract_address,
    ContractAbi,
    signer
  );

  let res = await ContactList.createList(phone);
  console.log(res);
  console.log("created list");
}

export async function addContact(name, address, phone) {
  const signer = provider.getSigner();
  const ContactList = new ethers.Contract(
    contract_address,
    ContractAbi,
    signer
  );

  const contactObj = makeFileObjects(name, address, phone);

  const cid = await storeFiles(contactObj);

  let res = await ContactList.addContact(
    `https://${cid}.ipfs.w3s.link/${name}.json`,
    address,
    phone
  );

  console.log(res);
  console.log("added contact");
}

export async function getAllContacts() {
  const signer = provider.getSigner();
  const ContactList = new ethers.Contract(
    contract_address,
    ContractAbi,
    signer
  );

  let arr = await ContactList.getAllContacts();

  let full = [];

  for (let i = 0; i < arr.length; i++) {
    let r = await ContactList.getContactInfo(arr[i]);

    console.log("link", r);
    let name = "";
    let phone = "";
    if (r.indexOf("[object Promise]") == -1) {
      let res = await fetch(r);
      const d = await res.json();
      console.log("BODY:", d);
      name = d.name;
      phone = d.phone;
    }

    let obj = {
      wallet: arr[i],
      name: name, // fetch name & picture
      picture: null,
      phone: phone,
    };

    full.push(obj);
  }

  return full;
}

export async function hasList() {
  const signer = provider.getSigner();
  const ContactList = new ethers.Contract(
    contract_address,
    ContractAbi,
    signer
  );

  try {
    let a = await ContactList.getUserNumber();
    return await ContactList.checkTapUser(a);
  } catch (error) {
    return false;
  }
}
export async function send_token(
  contract_address,
  send_token_amount,
  to_address,
  decimal
) {
  const signer = provider.getSigner();
  console.log("hi");
  console.log(to_address);
  const USDC = new ethers.Contract(contract_address, erc20abi, signer);
  console.log(USDC);
  const add = await signer.getAddress();
  await USDC.transfer(to_address, send_token_amount);
}

export async function send_eth(send_amount, to_address) {
  const signer = provider.getSigner();
  const tx = signer.sendTransaction({
    to: to_address,
    value: ethers.utils.parseEther(`${send_amount}`),
  });

  console.log(tx);
}

export async function sendNft(contract_address, nft_id, to_address) {
  const signer = provider.getSigner();
  const NFT = new ethers.Contract(contract_address, erc721abi, provider);
  const add = await signer.getAddress();
  const tx = signer.transferFrom(add, to_address, nft_id);
}
