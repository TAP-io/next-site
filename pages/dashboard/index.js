import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Portal,
} from "@chakra-ui/react";

let init_contacts = [
  {
    wallet: "0x9d812c4776b1602d89adbc1f493a74879c038ce5",
    name: "Bryan Kyritz",
  },
  {
    wallet: "0x1232136b1602d89adbc1f493a74879c038ce5",
    name: "Hello World",
  },
  {
    wallet: "0x9d1231231236b1602d89adbc1f493a74879c038ce5",
    name: "Marcos ",
  },
];

let init_history = [
  {
    amount: 100,
    token: "USDG",
    wallet: "0x9d812c4776b1602d89adbc1f493a74879c038ce5",
  },
  {
    amount: -100,
    token: "USDG",
    wallet: "0x9d812c4776b1602d89adbc1f493a74879c038ce5",
  },
];

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [history, setHistory] = useState([]);
  const [address, setAddress] = useState("");
  const [clickedAddress, setClickedAddress] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isHover, setIsHover] = useState("");

  useEffect(() => {
    setAddress(window.localStorage.getItem("address"));
    setContacts(init_contacts);
    setHistory(init_history);
  }, []);

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
    const handleClick = (wallet) => {
      setClickedAddress(wallet);
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
        onClick={() => handleClick(contact.wallet)}
      >
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={
            "https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          }
        />

        <div
          style={{
            direction: "flex",
            flexDirection: "column",
            gap: "0px",
            lineHeight: "5px",
          }}
        >
          <p style={{ fontSize: "20px" }}>{contact.name}</p>
          <p style={{ fontSize: "14px" }}>{contact.wallet}</p>
        </div>
      </div>
    );
  }

  function history_builder(history) {
    const boxStyle = {
      width: "100%",
      height: "80px",
      padding: "0px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "spacebetween",
      gap: "10px",
      backgroundColor: "white",
      border: "1px black solid",
    };

    const text = {
      color: history.amount >= 0 ? "green" : "red",
      textAlign: "right",
    };

    return (
      <div key={history.wallet} style={boxStyle}>
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
            <img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={
                "https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              }
            />

            <p style={{ fontSize: "20px" }}>Bryan Kyritz</p>
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
            {history.amount} {history.token}
          </p>
        </div>
      </div>
    );
  }

  function ModalAddContact() {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          backgroundColor={"white"}
          style={{
            position: "absolute",
            top: "25vw",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-50px",
            width: "100px",
            height: "100px",
            border: "2px solid black",
          }}
        >
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Hello</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      <div>
        <ModalAddContact />
      </div>
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
            padding: "30px 50px",
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
                    +
                  </button>
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
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                  src={
                    "https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                  }
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h1 style={{ color: "white", lineHeight: "0px" }}>
                    Bryan Kyritz
                  </h1>
                  <button
                    block
                    style={{
                      width: "100%",
                      padding: "10px 25px",
                      backgroundColor: "#A6D49F",
                      fontSize: "20px",
                      display: "block",
                      border: "0 none",
                      cursor: "pointer",
                      outline: "none",
                      borderRadius: "5px",
                      color: "black",
                    }}
                    onClick={() => router.push("/dashboard")}
                  >
                    Pay
                  </button>
                </div>
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Transaction History
              </h2>

              {history.map((transaction) => history_builder(transaction))}
            </div>
          </div>
        </div>

        <footer className={styles.footer}>Share with friends!</footer>
      </div>
    </>
  );
}
