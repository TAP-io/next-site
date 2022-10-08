import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
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

			<main className={styles.main}>
				<h1>Welcome to Tap.io</h1>
			</main>

			<footer className={styles.footer}>Share with friends!</footer>
		</div>
	);
}
