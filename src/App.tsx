import React, { useEffect, useState } from "react";

export function App() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useServiceWorker();
	return (
		<div>
			{isLoggedIn && <div>ログイン成功してます！</div>}
			<form>
				<div>
					<label htmlFor="email">メールアドレス:</label>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div>
					<label htmlFor="pass">パスワード:</label>
					<input
						type="password"
						onChange={(e) => setPass(e.target.value)}
						value={pass}
					/>
				</div>
				<button
					type="button"
					onClick={() =>
						fetch("/login", {
							method: "POST",
							headers: new Headers({ "Content-Type": "application/json" }),
							body: JSON.stringify({ email, password: pass }),
						}).then((res) => (res.ok ? setIsLoggedIn(true) : undefined))
					}
				>
					ログイン
				</button>
			</form>
		</div>
	);
}

const useServiceWorker = () => {
	useEffect(() => {
		// service workerのコードを書く
		const registerServiceWorker = async () => {
			if ("serviceWorker" in navigator) {
				try {
					const registration = await navigator.serviceWorker.register("sw.js", {
						scope: "/",
						type: "module",
					});
					if (registration.installing) {
						console.log("Service worker installing");
					} else if (registration.waiting) {
						console.log("Service worker installed");
					} else if (registration.active) {
						console.log("Service worker active");
					}
				} catch (error) {
					console.error(`Registration failed with ${error}`);
				}
			}
		};

		registerServiceWorker();
	}, []);
};
