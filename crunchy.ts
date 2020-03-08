type ValueFactory = (cookieValue?: string, validityInDays?: number) => string;
type EraseFactory = () => string;

interface Cookie {
	key: string;
	value: ValueFactory;
	erase: EraseFactory;
}

enum Action {
	Get,
	Set,
}

const Cookie = (key: string): Cookie => {
	const value: ValueFactory = (cookieValue, validityInDays = 0) => {
		const action: Action = cookieValue === undefined ? Action.Get : Action.Set;
		switch (action) {
			case Action.Get:
				const cookies: string[] = document.cookie.split(`;`);
				let output: string = ``;
				cookies.forEach((cookie: string) => {
					const cookiesLength: number = cookie.length;
					while (cookie.charAt(0) == ` `)
						cookie = cookie.substring(1, cookiesLength);
					if (cookie.indexOf(key + `=`) === 0)
						output = cookie.substring(key.length + 1, cookiesLength);
				});
				return output;
			case Action.Set:
				let expires: string = ``;
				if (validityInDays) {
					const exdate: Date = new Date();
					exdate.setDate(exdate.getDate() + validityInDays);
					expires = ` expires=${exdate.toUTCString()};`;
				}
				document.cookie = `${key}=${cookieValue};${expires}path=/`;
				return cookieValue;
		}
	};
	const erase: EraseFactory = () =>
		document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
	return {
		key,
		value,
		erase
	};
};
