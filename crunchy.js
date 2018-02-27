const Cookie = key => {
	const value = (cookieValue, expires = ``) => {
		const action = cookieValue === undefined ? `GET` : `SET`;
		switch (action) {
			case `GET`:
				const cookies = document.cookie.split(`;`);
				let output = ``;
				cookies.forEach(cookie => {
					const cookiesLength = cookie.length;
					while (cookie.charAt(0) == ` `)
						cookie = cookie.substring(1, cookiesLength);
					if (cookie.indexOf(key + `=`) === 0)
						output = cookie.substring(key.length + 1, cookiesLength);
				});
				return output;
			case `SET`:
				if (expires != ``) {
					const exdate = new Date();
					exdate.setDate(exdate.getDate() + expires);
					expires = ` expires=${exdate.toUTCString()};`;
				}
				document.cookie = `${key}=${cookieValue};${expires}path=/`;
				return cookieValue;
		}
	};
	const erase = () =>
		document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
	return {
		key,
		value,
		erase
	};
};