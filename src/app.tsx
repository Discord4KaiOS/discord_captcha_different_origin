import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState, useEffect } from "preact/hooks";

export function App() {
	const [state, setState] = useState("");
	const captchaRef = useRef<HCaptcha>(null);

	const onExpire = () => {
		setState("hCaptcha Token Expired");
	};

	const onError = (err: any) => {
		setState(`hCaptcha Error: ${err}`);
	};

	useEffect(() => {
		// this reaches out to the hcaptcha library and runs the
		// execute function on it. you can use other functions as well
		// documented in the api:
		// https://docs.hcaptcha.com/configuration#jsapi
		captchaRef.current!.execute();
	}, []);

	return (
		<>
			<HCaptcha
				// This is testing sitekey, will autopass
				// Make sure to replace
				sitekey="f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
				size="compact"
				onVerify={(token, ekey) => {
					setState("verified!");
					console.log("token:", token);
					console.log("ekey:", ekey);

					window.opener.postMessage("captcha_verified_token:" + token, "*");
					window.opener.postMessage("captcha_verified_ekey:" + ekey, "*");
				}}
				onError={onError}
				onExpire={onExpire}
				ref={captchaRef}
				// @ts-ignore
				host="discord.com"
			/>
			<div>{state}</div>
		</>
	);
}
