import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useRouter } from "next/router";

export default function Home() {
  const [account, setAccount] = useState(null);
  const router = useRouter();

  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "85dd1f2ff5714888b2ad407c14147db5",
          },
        },
      },
    });
    return web3Modal;
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      window.localStorage.setItem("address", accounts[0]);
      setAccount(accounts[0]);
    } catch (err) {
      console.log("error:", err);
    }
  }

  return (
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
          {!account && (
            <div>
              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#A6D49F",
                  fontSize: "20px",
                  display: "block",
                  border: "0 none",
                  cursor: "pointer",
                  outline: "none",
                  borderRadius: "5px",
                }}
                onClick={connect}
              >
                Connect wallet
              </button>
            </div>
          )}
          {account && (
            <div>
              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#A6D49F",
                  fontSize: "20px",
                  display: "block",
                  border: "0 none",
                  cursor: "pointer",
                  outline: "none",
                  borderRadius: "5px",
                }}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <h1 style={{ fontSize: "7rem", lineHeight: "7rem" }}>
            Build your Crosschain Contact List
          </h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              style={{
                padding: "10px 25px",
                backgroundColor: "#A6D49F",
                fontSize: "20px",
                display: "block",
                border: "0 none",
                cursor: "pointer",
                outline: "none",
                borderRadius: "5px",
              }}
            >
              App Store
            </button>
            <button
              style={{
                padding: "10px 25px",
                backgroundColor: "#A6D49F",
                fontSize: "20px",
                display: "block",
                border: "0 none",
                cursor: "pointer",
                outline: "none",
                borderRadius: "5px",
              }}
            >
              Play Store
            </button>
          </div>
        </div>
        <div style={{ width: "100%", height: "100%" }}></div>
      </div>

      <footer className={styles.footer}>Share with friends!</footer>
    </div>
  );
}
