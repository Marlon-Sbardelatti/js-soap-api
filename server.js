// const express = require('express');
// const soap = require('soap');
// const app = express();
// const port = 8001;

// // Sample in-memory user storage
// const users = {};

// const userService = {
//     UserService: {
//         UserPort: {
//             CreateUser: function(args) {
//                 console.log(args.user)
//                 const { id, name, email } = args.user;
//                 users[id] = { id, name, email };
//                 return { status: 'User created successfully' };
//             },
//             GetUser: function(args) {
//                 const user = users[args.id];
//                 if (user) {
//                     return { user };
//                 } else {
//                     throw new Error('User not found');
//                 }
//             },
//             UpdateUser: function(args) {
//                 const { id, name, email } = args.user;
//                 if (users[id]) {
//                     users[id] = { id, name, email };
//                     return { status: 'User updated successfully' };
//                 } else {
//                     throw new Error('User not found');
//                 }
//             },
//             DeleteUser: function(args) {
//                 const { id } = args;
//                 if (users[id]) {
//                     delete users[id];
//                     return { status: 'User deleted successfully' };
//                 } else {
//                     throw new Error('User not found');
//                 }
//             }
//         }
//     }
// };

// // Load the WSDL file
// const wsdl = require('fs').readFileSync('./service.wsdl', 'utf8');

// // Start the SOAP server
// app.listen(port, function() {
//     soap.listen(app, '/UserService', userService, wsdl, function() {
//         console.log(`SOAP service running at http://localhost:${port}/UserService?wsdl`);
//     });
// });



const express = require('express');
const soap = require('soap');
const fs = require('fs');
const app = express();
const port = 8001;

// Sample in-memory user storage
const users = {};

// Define the user service with complex types
const userService = {
    UserService: {
        UserPort: {
            CreateUser: function(args) {
                console.log(args)
                const { user } = args;
                const { id, name, email, products } = user;
                
                users[id] = { id, name, email, products: products.product};
                return { status: 'User created successfully' };
            },
            GetUser: function(args) {
                const { id } = args;
                const user = users[id];
                if (user) {
                    return {user}
                } else {
                    throw new Error('User not found');
                }
            },
            UpdateUser: function(args) {
                const { user } = args;
                const { id, name, email, products } = user;

                if (users[id]) {
                    users[id] = { id, name, email, products: products.product};
                    return { status: 'User updated successfully' };
                } else {
                    throw new Error('User not found');
                }
            },
            DeleteUser: function(args) {
                const { id } = args;
                if (users[id]) {
                    delete users[id];
                    return { status: 'User deleted successfully' };
                } else {
                    throw new Error('User not found');
                }
            }
        }
    }
};

// Load the WSDL file
const wsdl = fs.readFileSync('./service.wsdl', 'utf8');

// Start the SOAP server
app.listen(port, function() {
    soap.listen(app, '/UserService', userService, wsdl, function() {
        console.log(`SOAP service running at http://localhost:${port}/UserService?wsdl`);
    });
});

