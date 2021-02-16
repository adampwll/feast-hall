//example service to call test endpoint and print text
function GetTest() {
	return fetch("/test")
        .then(res => 
			res.text()
				.then(text => {
					console.log(text)
					return text
				})
		).catch(res => {
			console.warn(res)
			return null;
		})
}

export default GetTest