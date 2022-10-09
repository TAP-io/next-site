import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
export async function getServerSideProps({ params }) {
	return {
		props: { address: params.address, name: params.name },
	};
}
export default function ContactPage(props) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>Add me on Tap! @{props.name}</title>
				<meta name='description' content='Add this contact to your address' />
				<link rel='icon' href='/circle-icon.png' />
			</Head>
			<h1>Contact</h1>
			<p>Address:{props.address}</p>
			<p>Name:{props.name}</p>
		</div>
	);
}
