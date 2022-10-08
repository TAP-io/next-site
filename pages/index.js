import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';



export default function Home() {

	const [account, setAccount] = useState(null)


	async function getWeb3Modal() {
		const web3Modal = new Web3Modal({
		  cacheProvider: false,
		  providerOptions: {
			walletconnect: {
			  package: WalletConnectProvider,
			  options: { 
				infuraId: "85dd1f2ff5714888b2ad407c14147db5"
			  },
			},
		  },
		})
		return web3Modal
	}

	async function connect() {
		try {
		  const web3Modal = await getWeb3Modal()
		  const connection = await web3Modal.connect()
		  const provider = new ethers.providers.Web3Provider(connection)
		  const accounts = await provider.listAccounts()
		  setAccount(accounts[0])
		} catch (err) {
		  console.log('error:', err)
		}
	  }


	return (
		<div className={styles.container}>
			<Head>
				<title>Contacts</title>
				<meta
					name='description'
					content='Add and store contacts to your eth address.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{
            !account && (
              <div>
                <button onClick={connect}>
					<h1>Welcome to Tap.io</h1>
				</button>
              </div>
            )
          }
          {
            account && <p><h1>{account}</h1></p>
          }

			<main className={styles.main}>
				
			</main>

			<footer className={styles.footer}>Share with friends!</footer>
		</div>
	);
}
