import * as ethers from "ethers";
import ContractAbi from "../../public/abi/contactlist.json";
import { Web3Storage } from "web3.storage";

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
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

let contract_address = "0x5062BCdBd09D568DAfa74f8384771398Ab63D16d";

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

  let res = await ContactList.createList("8455214046");
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

  const cid = storeFiles(contactObj);

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

    let obj = {
      wallet: arr[i],
      name: "Marcos", // fetch name & picture
      picture: null,
    };

    full.push(obj);
  }

  return full;
}
