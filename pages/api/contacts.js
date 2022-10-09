import * as ethers from "ethers";
import ContractAbi from "../../public/abi/contactlist.json";

console.log(ContractAbi);
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

export async function addContact(hash, address, phone) {
  const signer = provider.getSigner();
  const ContactList = new ethers.Contract(
    contract_address,
    ContractAbi,
    signer
  );

  let res = await ContactList.addContact(hash, address, phone);

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

  let res = await ContactList.getAllContacts();

  return res;
}
