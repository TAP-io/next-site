import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
export async function getServerSideProps({ params }) {
	return {
		props: {
			toAddress: params.toAddress,
			amount: params.amount,
			currency: params.currency,
		},
	};
}
export default function TransactionPage(props) {
	return (
		<div>
			<Head>
				<title>
					Please send me {props.amount} {props.currency}!
				</title>
				<meta
					name='description'
					content='Complete this transaction using your wallet.'
				/>
				<link rel='icon' href='/circle-icon.png' />
			</Head>
			<h1>Transaction</h1>
			<p>Address:{props.toAddress}</p>
			<p>Amount:{props.amount}</p>
			<p>Currency:{props.currency}</p>
		</div>
	);
}
