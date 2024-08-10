const soap = require("soap");
const url = "http://localhost:8001/UserService?wsdl"; // URL to the WSDL
const prompt = require("prompt-sync")();
let ids = 1;

function createUser(client) {
	return new Promise((resolve, reject) => {
		let username = prompt("Name: ");
		let email = prompt("Email: ");
		let product = [];
		let productID = prompt("Product ID: ");
		let productName = prompt("Product Name: ");
		product.push({
			productId: parseInt(productID),
			productName: productName,
		});
		console.log("(1) - New\n(2) - Finish\n");
		let res = prompt("");

		while (res != 2) {
			switch (res) {
				case "1":
					let productID = prompt("Product ID: ");
					let productName = prompt("Product Name: ");
					product.push({
						productId: parseInt(productID),
						productName: productName,
					});
					break;
				default:
					console.log("Insert a valid Operation");
					break;
			}

			console.log("\n(1) - New\n(2) - Finish\n");
			res = prompt("");
		}

		client.CreateUser(
			{
				user: {
					id: ids,
					name: username,
					email: email,
					products: {
						product,
					},
				},
			},
			function (err, result) {
				if (err) {
					reject(err);
				} else {
					ids++;
					resolve(result);
				}
			},
		);
	});
}

function getUser(client) {
	return new Promise((resolve, reject) => {
		let userId = prompt("User ID: ");
		client.GetUser({ id: userId }, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

function updateUser(client) {
	return new Promise((resolve, reject) => {
		let userId = prompt("User ID: ");
		let username = prompt("Name: ");
		let email = prompt("Email: ");
        let product = [];
		let productID = prompt("Product ID: ");
		let productName = prompt("Product Name: ");
		product.push({
			productId: parseInt(productID),
			productName: productName,
		});
		console.log("(1) - New\n(2) - Finish\n");
		let res = prompt("");

		while (res != 2) {
			switch (res) {
				case "1":
					let productID = prompt("Product ID: ");
					let productName = prompt("Product Name: ");
					product.push({
						productId: parseInt(productID),
						productName: productName,
					});
					break;
				default:
					console.log("Insert a valid Operation");
					break;
			}

			console.log("\n(1) - New\n(2) - Finish\n");
			res = prompt("");
		}

		client.UpdateUser(
			{
				user: {
					id: userId,
					name: username,
					email: email,
					products: {
						product,
					},
				},
			},
			function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			},
		);
	});
}

function deleteUser(client) {
	return new Promise((resolve, reject) => {
		let userId = prompt("User ID: ");
		client.DeleteUser({ id: userId }, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

async function main() {
	soap.createClient(url, async (err, client) => {
		if (err) {
			console.error("Error creating SOAP client:", err);
			return;
		}
		console.log(
			"Choose Operation\n(1) - Create User\n(2) - Get User\n(3) - Update User\n(4) - Delete User\n(5) - Exit\n",
		);
		let res = prompt("");
		while (res != 5) {
			switch (res) {
				case "1":
					await createUser(client)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
					console.log("");
					break;

				case "2":
					await getUser(client)
						.then((res) => {
							console.log(JSON.stringify(res, null, 4));
						})
						.catch((err) => {
							console.log(err);
						});
					console.log("");
					break;

				case "3":
					await updateUser(client)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
					console.log("");
					break;

				case "4":
					await deleteUser(client)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
					console.log("");
					break;
				default:
					console.log("Select a valid operation");
					break;
			}

			console.log(
				"Choose Operation\n(1) - Create User\n(2) - Get User\n(3) - Update User\n(4) - Delete User\n(5) - Exit\n",
			);
			res = prompt("");
		}
	});
}

main();
