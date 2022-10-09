import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

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
	const [loading, setLoading] = useState(true);
	const [contacts, setContacts] = useState([]);
	const [history, setHistory] = useState([]);
	const [address, setAddress] = useState("");
	const [clickedAddress, setClickedAddress] = useState("");
	const [tokens, setTokens] = useState([]);
	const [nfts, setNFTs] = useState([]);
	const router = useRouter();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isHover, setIsHover] = useState("");

	useEffect(() => {
		let add = window.localStorage.getItem("address");
		setAddress(add);
		setContacts(init_contacts);
		setHistory(init_history);
		getWalletAssets(add);
	}, []);

	async function getWalletAssets(add) {
		//get tokens held
		let tokens = await API.getTokenBalances(add);
		let nfts = await API.getAllNfts(add);
		setTokens(tokens);
		setNFTs(nfts);
		console.log(tokens);
		console.log(nfts);
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
		const handleClick = (wallet) => {
			if (wallet == clickedAddress) {
				setClickedAddress("");
			} else {
				setClickedAddress(wallet);
			}
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
				{/* <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={
            "https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          }
        /> */}

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
						{/* <img
							style={{ width: "50px", height: "50px", borderRadius: "50%" }}
							src={
								"https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
							}
						/> */}

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

	function AddNewContact() {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const cancelRef = React.useRef();
		const [name, setName] = useState("");
		const [address, setAddress] = useState("");

		function save() {
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
					motionPreset='slideInBottom'
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
									placeholder='Name'
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
								<Input
									placeholder='Address'
									onChange={(e) => {
										setAddress(e.target.value);
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

		function save() {
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
					motionPreset='slideInBottom'
					leastDestructiveRef={cancelRef}
					onClose={onClose}
					isOpen={isOpen}
					isCentered
				>
					<AlertDialogOverlay />

					<AlertDialogContent>
						<AlertDialogHeader>Pay Bryan Kyritz</AlertDialogHeader>
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
									placeholder='0'
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
											{/* {token && (
												<img
													src={
														token.metadata.logo
															? token.metadata.logo
															: "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
													}
													style={{
														width: "15px",
														height: "15px",
														marginRight: "10px",
														borderRadius: "50%",
													}}
												/>
											)} */}
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
												{/* <img
													src={
														tok.metadata.logo
															? tok.metadata.logo
															: "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
													}
													style={{
														width: "15px",
														height: "15px",
														marginRight: "10px",
														borderRadius: "50%",
													}}
												/> */}
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
								onClick={save}
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
						name='description'
						content='Add and store contacts to your eth address.'
					/>
					<link rel='icon' href='/favicon.ico' />
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
					<div className='Left' style={{ width: "50%" }}>
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
						className='Left'
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
									{/* <img
										style={{
											width: "150px",
											height: "150px",
											borderRadius: "50%",
										}}
										src={
											"https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
										}
									/> */}

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
											Bryan Kyritz
										</h1>
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

								{history.map((transaction) => history_builder(transaction))}
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
												{/* <img
													src={
														tok.metadata.logo
															? tok.metadata.logo
															: "https://cdn-icons-png.flaticon.com/512/4412/4412363.png"
													}
													style={{
														width: "25px",
														height: "25px",
														marginRight: "10px",
														borderRadius: "50%",
													}}
												/> */}
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
												{/* <img
													src={nft.media[0].raw}
													style={{ width: "200px" }}
												/> */}
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
