const express = require("express");
const soap = require("soap");
const fs = require("fs");
const app = express();
const port = 8001;

const { Client, Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "soap",
    password: "ihatewin",
    port: 5432,
});

// Sample in-memory user storage
const users = {};

// Define the user service with complex types
const userService = {
    UserService: {
        UserPort: {
            CreateUser: async function(args) {
                const { user } = args;
                const { id, name, email, products } = user;

                // users[id] = { id, name, email, products: products.product };

                const insertQuery = `
                    INSERT INTO Users (name, email, product_ids)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                    `;

                let p = [];

                if (Array.isArray(products.product)) {
                    for (let i = 0; i < products.product.length; i++) {
                        const element = products.product[i].productId;
                        p.push(element)
                    }
                } else {
                    p.push(products.product.productId)
                }


                const res = await pool.query(insertQuery, [name, email, p]);

                if (res.rows[0]){
                    console.log("User inserted:", res.rows[0]);
                    return { status: "User created successfully" };
                } else {
                    throw new Error("Error while creating User");
                }
            },
            GetUser: async function(args) {
                const { id } = args;

                const res = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
                console.log("User:", res.rows[0]);

                const user = res.rows[0];

                if (user) {
                    return { user };
                } else {
                    throw new Error("User not found");
                }
            },
            UpdateUser: function(args) {
                const { user } = args;
                const { id, name, email, products } = user;

                if (users[id]) {
                    users[id] = { id, name, email, products: products.product };
                    return { status: "User updated successfully" };
                } else {
                    throw new Error("User not found");
                }
            },
            DeleteUser: async function(args) {
                const { id } = args;

                const res = await pool.query('DELETE FROM Users WHERE id = $1', [id]);


                if (res.rowCount == 1) {
                    return { status: "User deleted successfully" };
                } else {
                    throw new Error("User not found");
                }

            },
        },
    },
};

// Load the WSDL file
const wsdl = fs.readFileSync("./service.wsdl", "utf8");

// Start the SOAP server
app.listen(port, function() {
    soap.listen(app, "/UserService", userService, wsdl, function() {
        console.log(
            `SOAP service running at http://localhost:${port}/UserService?wsdl`,
        );
    });
});
