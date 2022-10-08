import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function TransactionPage() {
	const router = useRouter();
	const { address } = router.query;
	return (
		<div>
			<Head>
				<title>Transaction</title>
				<meta
					name='description'
					content='Complete this transaction using your wallet.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1>Transaction</h1>
			<p>Address:{address}</p>
		</div>
	);
}
