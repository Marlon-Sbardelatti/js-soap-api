const soap = require('soap');
const url = 'http://localhost:8001/UserService?wsdl'; // URL to the WSDL

// Create a SOAP client
soap.createClient(url, function(err, client) {
    if (err) {
        console.error('Error creating SOAP client:', err);
        return;
    }

    const user = {
        id: 23,
        name: "Marlon",
        email: "marlonsbardelatti@gmail.com",
        products: {
            product: [
                null
            ]
        }
    }
    // Example of CreateUser operation
    client.CreateUser({
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            products: {
                product: [
                    // null
                    { productId: 101, productName: 'Product A' },
                    { productId: 102, productName: 'Product B' }
                ]
            }
        }
    }, function(err, result) {
        if (err) {
            console.error('Error creating user:', err);
        } else {
            console.log('CreateUser response:', result);
        }
    });

    // Example of GetUser operation
    client.GetUser({ id: 1 }, function(err, result) {
        if (err) {
            console.error('Error getting user:', err);
        } else {
            console.log('GetUser response:', result);

            // Inspect the response structure
            console.log('Inspect GetUser result:', JSON.stringify(result, null, 2));

            // Handle products if available
            if (result.user && result.user.products) {
                const products = result.user.products.product;

                if (Array.isArray(products)) {
                    console.log('User Products:');
                    products.forEach(product => {
                        console.log(`Product ID: ${product.productId}, Product Name: ${product.productName}`);
                    });
                } else if (products && products.productId && products.productName) {
                    // Handle case where product is a single object
                    console.log('User Products:');
                    console.log(`Product ID: ${products.productId}, Product Name: ${products.productName}`);
                } else {
                    console.log('No products found for this user.');
                }
            } else {
                console.log('No products found for this user.');
            }
        }
    });

    // Example of UpdateUser operation
    client.UpdateUser({
        user: {
            id: 1,
            name: 'John Doe Updated',
            email: 'john.doe.updated@example.com',
            products: {
                product: [
                    { productId: 103, productName: 'Product C' }
                ]
            }
        }
    }, function(err, result) {
        if (err) {
            console.error('Error updating user:', err);
        } else {
            console.log('UpdateUser response:', result);
        }
    });

    // Example of GetUser operation after update
    client.GetUser({ id: 1 }, function(err, result) {
        if (err) {
            console.error('Error getting user after update:', err);
        } else {
            console.log("here")
            console.log(result)
            // console.log('GetUser response after update:', result);

            // // Inspect the response structure
            // console.log('Inspect GetUser result after update:', JSON.stringify(result, null, 2));

            // // Handle products if available
            // if (result.user && result.user.products) {
            //     const products = result.user.products.product;

            //     if (Array.isArray(products)) {
            //         console.log('User Products After Update:');
            //         products.forEach(product => {
            //             console.log(`Product ID: ${product.productId}, Product Name: ${product.productName}`);
            //         });
            //     } else if (products && products.productId && products.productName) {
            //         // Handle case where product is a single object
            //         console.log('User Products After Update:');
            //         console.log(`Product ID: ${products.productId}, Product Name: ${products.productName}`);
            //     } else {
            //         console.log('No products found for this user.');
            //     }
            // } else {
            //     console.log('No products found for this user.');
            // }
        }
    });

    // Example of DeleteUser operation
    client.DeleteUser({ id: 1 }, function(err, result) {
        if (err) {
            console.error('Error deleting user:', err);
        } else {
            console.log('DeleteUser response:', result);
        }
    });

    // Attempt to get user after deletion
    // client.GetUser({ id: 1 }, function(err, result) {
    //     if (err) {
    //         console.error('Error getting user after deletion:', err);
    //     } else {
    //         console.log('GetUser response after deletion:', result);

    //         // Inspect the response structure
    //         console.log('Inspect GetUser result after deletion:', JSON.stringify(result, null, 2));

    //         // Handle products if available
    //         if (result.user && result.user.products) {
    //             const products = result.user.products.product;

    //             if (Array.isArray(products)) {
    //                 console.log('User Products After Deletion Attempt:');
    //                 products.forEach(product => {
    //                     console.log(`Product ID: ${product.productId}, Product Name: ${product.productName}`);
    //                 });
    //             } else if (products && products.productId && products.productName) {
    //                 // Handle case where product is a single object
    //                 console.log('User Products After Deletion Attempt:');
    //                 console.log(`Product ID: ${products.productId}, Product Name: ${products.productName}`);
    //             } else {
    //                 console.log('No products found for this user.');
    //             }
    //         } else {
    //             console.log('No products found for this user.');
    //         }
    //     }
    // });
});

