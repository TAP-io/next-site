import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import makeBlockie from "ethereum-blockies-base64";

import * as Contacts from "../api/contacts";

import * as API from "../api/wallet";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogOverlay,
} from "@chakra-ui/react";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [history, setHistory] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [clickedAddress, setClickedAddress] = useState("");
  const [clickedUser, setClickedUser] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [nfts, setNFTs] = useState([]);
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isHover, setIsHover] = useState("");

  useEffect(() => {
    let add = window.localStorage.getItem("address");
    setAddress(add);
    getWalletAssets(add);
    getTransactions();
    getContacts();
  }, []);

  async function getContacts() {
    //let a = await Contacts.getAllContacts();
    console.log("got contacts");

    let obj = {
      wallet: "0x5E7Ce9F588F2aa647E0518e25A9c88AB48Ec6834", // a[0],
      name: "Marcos", // fetch name & picture
      picture: null,
    };
    setContacts([obj]);
  }

  async function getHistoryBetween(other) {
    let me = window.localStorage.getItem("address");
    let a = await API.getTransactionsBetween(me, other);

    console.log("hist:", a);
    setHistory(a);
  }

  async function getTransactions(add) {
    // console.log(await API.getAllTransactionsFrom(add));
  }

  async function getWalletAssets(add) {
    //get tokens held
    let tokens = await API.getTokenBalances(add);
    let nfts = await API.getAllNfts(add);
    setTokens(tokens);
    setNFTs(nfts);
    // console.log(tokens);
    //console.log(nfts);
    setLoading(false);
  }

  function contact_builder(contact) {
    const boxStyleHover = {
      width: "100%",
      height: "80px",
      padding: "0px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "20px",
      border: "1px solid black",
      cursor: "pointer",
      backgroundColor: contact.wallet === clickedAddress ? "#A6D49F" : "white",
    };
    const boxStyle = {
      width: "100%",
      height: "80px",
      padding: "0px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "20px",
      cursor: "pointer",
      backgroundColor: contact.wallet === clickedAddress ? "#A6D49F" : "white",
    };

    const handleMouseEnter = (wallet) => {
      setIsHover(wallet);
    };
    const handleMouseLeave = (wallet) => {
      setIsHover(wallet);
    };
    const handleClick = (user) => {
      if (user.wallet == clickedAddress) {
        setClickedAddress("");
        setClickedUser(null);
      } else {
        setClickedAddress(user.wallet);
        setClickedUser(user);
      }
      getHistoryBetween(user.wallet);
    };

    return (
      <div
        key={contact.wallet}
        style={
          isHover == contact.wallet || contact.wallet == clickedAddress
            ? boxStyleHover
            : boxStyle
        }
        onMouseEnter={() => handleMouseEnter(contact.wallet)}
        onMouseLeave={() => handleMouseLeave("")}
        onClick={() => handleClick(contact)}
      >
        <Image
          name={"Profile"}
          src={contact.picture ? contact.picture : makeBlockie(contact.wallet)}
          className="avatar"
          width="50px"
          height="50px"
          alt="Profile Pic"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />

        <div
          style={{
            direction: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p style={{ fontSize: "20px" }}>{contact.name}</p>
          <p style={{ fontSize: "14px" }}>{contact.wallet}</p>
        </div>
      </div>
    );
  }

  function history_builder(history, i) {
    const boxStyle = {
      width: "100%",
      height: "80px",
      padding: "0px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "space-between",
      gap: "10px",
      backgroundColor: "white",
      border: "1px black solid",
    };

    const text = {
      color: history.amount >= 0 ? "green" : "red",
      textAlign: "right",
    };

    return (
      <div key={i} style={boxStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Image
              src={
                history.logo
                  ? history.logo
                  : "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
              }
              width={25}
              height={25}
              style={{
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div
          style={{
            width: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <p style={text}>
            {history.amount.toFixed(2)} {history.symbol}
          </p>
        </div>
      </div>
    );
  }

  function AddNewContact() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    async function save() {
      await Contacts.addContact(
        "https://bafkreicjjk7miomqpg7nuztyk7mezrqfhopxegefrh24i2aeftjejjbngy.ipfs.nftstorage.link/",
        "0xf4f164f8cb9b8a3f9a6e4d550cbf2ee5051ebe17",
        "6462269334"
      );
      onClose();
    }

    return (
      <>
        <button
          style={{
            padding: "20px",
            height: "80px",
            width: "80px",
            backgroundColor: "#A6D49F",
            fontSize: "20px",
            display: "block",
            border: "0px none",
            cursor: "pointer",
            outline: "none",
            color: "black",
            borderRadius: "5px",
          }}
          onClick={onOpen}
        >
          +
        </button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Add New Contact</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <Input
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <Input
                  placeholder="Phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </AlertDialogBody>
            <AlertDialogFooter>
              <button
                style={{
                  padding: "15px",
                  backgroundColor: "#A6D49F",
                  fontSize: "14px",
                  display: "block",
                  border: "0px none",
                  cursor: "pointer",
                  outline: "none",
                  color: "black",
                  borderRadius: "5px",
                }}
                onClick={save}
              >
                Save
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  function Pay() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [amount, setAmount] = useState("");
    const [token, setToken] = useState("");

    async function pay() {
      console.log("pay...");

      onClose();
    }

    return (
      <>
        <button
          style={{
            padding: "15px",
            backgroundColor: "#A6D49F",
            fontSize: "20px",
            display: "block",
            border: "0px none",
            cursor: "pointer",
            outline: "none",
            color: "black",
            borderRadius: "5px",
          }}
          onClick={onOpen}
        >
          Pay
        </button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Pay {clickedUser.name}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                }}
              >
                <Input
                  placeholder="0"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />

                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ExpandMoreIcon />}
                    style={{ padding: "0px 20px", minWidth: "200px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {token && (
                        <Image
                          src={
                            token.metadata.logo
                              ? token.metadata.logo
                              : "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
                          }
                          width={15}
                          height={15}
                          style={{
                            marginRight: "10px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      {token ? token.metadata.symbol : "Select"}
                    </div>
                  </MenuButton>
                  <MenuList>
                    {tokens.map((tok, i) => (
                      <MenuItem
                        onClick={(e) => {
                          setToken(tok);
                        }}
                      >
                        <Image
                          src={
                            tok.metadata.logo
                              ? tok.metadata.logo
                              : "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
                          }
                          width={15}
                          height={15}
                          style={{
                            marginRight: "10px",
                            borderRadius: "50%",
                          }}
                        />
                        {tok.metadata.symbol}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>
              <div style={{ marginTop: "10px" }}>
                {token && <p>Max: {Number(token.balance).toFixed(2)}</p>}
              </div>
            </AlertDialogBody>
            <AlertDialogFooter>
              <button
                style={{
                  padding: "15px",
                  backgroundColor: "#A6D49F",
                  fontSize: "14px",
                  display: "block",
                  border: "0px none",
                  cursor: "pointer",
                  outline: "none",
                  color: "black",
                  borderRadius: "5px",
                }}
                // onClick={pay}
              >
                Pay
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Contacts</title>
          <meta
            name="description"
            content="Add and store contacts to your eth address."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Tap
            </h2>
          </div>
          <div>
            {address && (
              <div>
                <button
                  style={{
                    padding: "10px 25px",
                    backgroundColor: "white",
                    fontSize: "20px",
                    display: "block",
                    border: "3px #A6D49F solid",
                    cursor: "pointer",
                    outline: "none",
                    color: "black",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    window.localStorage.removeItem("address");
                    router.push("/");
                  }}
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "90vh",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: "30px 0px",
          }}
        >
          <div className="Left" style={{ width: "50%" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ fontSize: "60px", textDecoration: "underline" }}>
                  Your Contacts
                </h2>
                <div>
                  <AddNewContact />
                </div>
              </div>

              {contacts.map((contact) => contact_builder(contact))}
            </div>
          </div>
          <div
            className="Left"
            style={{
              backgroundColor: "#4E6E5D",
              width: "50%",
              borderRadius: "20px",
              padding: "10px 50px",
            }}
          >
            {clickedAddress && clickedAddress.length > 0 ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "0px 30px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Image
                    name={"Profile"}
                    src={
                      clickedUser.picture
                        ? clickedUser.picture
                        : makeBlockie(clickedUser.wallet)
                    }
                    className="avatar"
                    width="150px"
                    height="150px"
                    alt="Profile Pic"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <h1
                      style={{
                        color: "white",

                        fontSize: "40px",
                      }}
                    >
                      {clickedUser.name}
                    </h1>
                    <h1
                      style={{
                        color: "white",

                        fontSize: "40px",
                      }}
                    ></h1>
                    <Pay />
                  </div>
                </div>
                <h2
                  style={{
                    fontSize: "20px",
                    color: "white",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  Transaction History
                </h2>

                {history.map((transaction, i) =>
                  history_builder(transaction, i)
                )}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontSize: "40px",
                    textAlign: "center",
                  }}
                >
                  My Assets
                </h1>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    width: "100%",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tokens.map((tok, i) => (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={
                            tok.metadata.logo
                              ? tok.metadata.logo
                              : "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
                          }
                          width={25}
                          height={25}
                          style={{
                            marginRight: "10px",
                            borderRadius: "50%",
                          }}
                        />
                        <p style={{ fontSize: "20px", color: "white" }}>
                          {tok.metadata.symbol}
                        </p>
                      </div>
                      <p style={{ fontSize: "20px", color: "white" }}>
                        {tok.balance.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <h1
                  style={{
                    color: "white",
                    fontSize: "40px",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  My NFTs
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    width: "100%",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {nfts.map((nft) => {
                    return (
                      <div>
                        <Image
                          width={200}
                          height={200}
                          src={nft.media[0].raw}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className={styles.footer}>Share with friends!</footer>
      </div>
    </>
  );
}
