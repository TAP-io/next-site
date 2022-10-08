import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function ContactPage() {
	const router = useRouter();
	const { address, name } = router.query;
	return (
		<div>
			<Head>
				<title>{name}</title>
				<meta name='description' content='Add this contact to your address' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1>Contact</h1>
			<p>Address:{address}</p>
			<p>Name:{name}</p>
		</div>
	);
}
