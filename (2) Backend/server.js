const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const debug = require("./debug.js");
const settings = require("./settings.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(settings.SV_CORS));
app.use((error, response) =>
{
    debug.error(`Unhandled error: ${error}!`);
    response.status(500).json({ error: true, message: `Internal server error: ${error}!` });
});



app.listen(settings.SV_PORT, settings.SV_HOST, (error) =>
{
    if (error)
    {
        debug.error(`Failed to start server: ${error}!`);
        process.exit(1);
    }

    debug.log(`Server is running on \"http://${settings.SV_HOST}:${settings.SV_PORT}\"!`);
})

const db = mysql.createConnection
({
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_DATABASE
});

db.connect((error) =>
{
    if (error)
    {
        debug.error(`Failed to connect to the MySQL database: ${error}!`);
        process.exit(1);
    }

    debug.log("Connected to the MySQL database successfully!");
});



function validateEmailAddress(emailAddress)
{
    // Check if email address is valid //
    if (!emailAddress)
    {
        return "Email address is empty!";
    }


    // Check email length //
    if (emailAddress.length > 320)
    {
        return "Email address is too long!";
    }


    // Check email format //
    const emailAddressRegex = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailAddressRegex.test(emailAddress))
    {
        return "Invalid email address!";
    }


    // Check if email address is already in use //
    let query = "SELECT * FROM users WHERE email_address = ?"

    db.query(query, [emailAddress], (error, results) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Database error during email validation: ${error.message}!`);
            return "Database error during email validation!";
        }

        if (results.length > 0)
        {
            return "Email address is already in use!";
        }
    });


    // All checks passed //
    return "";
}

function validatePhoneNumber(phoneNumber)
{
    // Check if phone number is valid //
    if (!phoneNumber)
    {
        return "Phone number is empty!";
    }
    

    // Check phone number length //
    if (phoneNumber.length > 20)
    {
        return "Phone number is too long!";
    }


    // Check phone number format //
    const phoneNumberRegex = !/^\+?[1-9]\d{1,14}$/;

    if (phoneNumberRegex.test(phoneNumber))
    {
        return "Invalid phone number!";
    }


    // Check if phone number is already in use //
    let query = "SELECT * FROM users WHERE phone_number = ?"

    db.query(query, [phoneNumber], (error, results) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Database error during phone number validation: ${error.message}!`);
            return "Database error during phone number validation!";
        }

        if (results.length > 0)
        {
            return "Phone number is already in use!";
        }
    });


    // All checks passed //
    return "";
}

function validateBirthDate(birthDate)
{
    if (!birthDate)
    {
        return "Birth date is empty!";
    }

    const date = new Date(birthDate).getTime();
    if (isNaN(date))
    {
        return "Invalid birth date!";
    }

    return "";
}

function validateUsername(username)
{
    if (!username || username.trim() === "")
    {
        return "Username cannot be empty!";
    }

    if (username.length > 32)
    {
        return "Username is too long!";
    }

    return "";
}

function validatePassword(password)
{
    if (!password)
    {
        return "Password is required!";
    }

    if (password.length > 128)
    {
        return "Password is too long!";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(password))
    {
        return "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!";
    }
}

function validateBio(bio)
{
    if (bio.length > 512)
    {
        return "Your bio is too long!";
    }

    return "";
}

function validateOrderMessage(message)
{
    if (!message || message.trim() === "")
    {
        return "Order message cannot be empty!";
    }

    if (message.length > 1024)
    {
        return "Order message is too long!";
    }

    return "";
}

function validateOrderThematic(thematic)
{
    if (!thematic || thematic.trim() === "")
    {
        return "Thematic cannot be empty!";
    }

    if (thematic.length > 11)
    {
        return "Thematic is too long!";
    }

    return "";
}

function validateOrderImages(images)
{
    if (images || images.length > 0)
    {
        if (images.length > 25)
        {
            return "Too many images provided!";
        }
    }

    return "";
}



app.post("/register", (req, res) =>
{
    // Request values //
    const { emailAddress, phoneNumber, birthDate, username, password } = req.body;


    // Validate values //
    let validEmailAddress = validateEmailAddress(emailAddress);    
    if (validEmailAddress != "")
    {
        return res.status(400).json({ error: true, message: validEmailAddress });
    }

    let validPhoneNumber = validatePhoneNumber(phoneNumber);
    if (validPhoneNumber != "")
    {
        return res.status(400).json({ error: true, message: validPhoneNumber });
    }

    let validBirthDate = validateBirthDate(birthDate);
    if (validBirthDate != "")
    {
        return res.status(400).json({ error: true, message: validBirthDate });
    }

    let validUsername = validateUsername(username);
    if (validUsername != "")
    {
        return res.status(400).json({ error: true, message: validUsername });
    }

    let validPassword = validatePassword(password);
    if (validPassword != "")
    {
        return res.status(400).json({ error: true, message: validPassword });
    }


    // Database querry //
    let query = "INSERT INTO users (email_address, phone_number, birth_date, username, password) VALUES (?, ?, ?, ?)";

    db.query(query, [emailAddress, phoneNumber, birthDate, username, password], (error, result) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Registration failed: ${error.message}!`);
            return res.status(500).json({ error: true, message: `Registration failed: ${error.message}!` });
        }

        if (result.affectedRows === 0)
        {
            debug.error(`Registration failed: No rows affected!`);
            return res.status(500).json({ error: true, message: `Registration failed: ${result.error}!` });
        }

        // Success //
        debug.log(`User registered successfully with email: ${emailAddress}!`);
        return res.status(200).json({ error: false, message: "Registration successful!" });
    });
});

app.post("/login", (req, res) =>
{
    // Request values //
    const { emailAddress, password } = req.body;


    // Validate values //
    let validEmailAddress = validateEmailAddress(emailAddress);    
    if (validEmailAddress != "")
    {
        return res.status(400).json({ error: true, message: validEmailAddress });
    }

    let validPassword = validatePassword(password);
    if (validPassword != "")
    {
        return res.status(400).json({ error: true, message: validPassword });
    }


    // Database querry //
    let query = "SELECT * FROM users WHERE email_address = ? AND password = ?";

    db.query(query, [emailAddress, password], (error, results) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Login failed: ${error.message}!`);
            return res.status(500).json({ error: true, message: `Login failed: ${error.message}!` });
        }

        // Check if user exists //
        if (results.length > 0)
        {
            // Check if user has an order //
            db.query("SELECT * FROM orders WHERE user_id = ?", [results[0].user_id], (error2, results2) =>
            {
                // Handle errors //
                if (error2)
                {
                    debug.error(`Order check failed: ${error2.message}!`);
                    return res.status(200).json({ error: false, user: results, order: false });
                }

                // Return success //
                if (results2.length > 0)
                {
                    debug.log(`User ${results[0].user_id} logged in successfully with an active order!`);
                    return res.status(200).json({ error: false, user: results, order: true });
                }
                else
                {
                    debug.log(`User ${results[0].user_id} logged in successfully without an active order!`);
                    return res.status(200).json({ error: false, user: results, order: false });
                }
            });
        }
        else
        {
            debug.log(`Login failed for email: ${emailAddress}!`);
            return res.status(401).json({ error: true, message: "Invalid email address or password!" });
        }
    });
});

app.post("/updateProfile", (req, res) =>
{
    // Request values //
    const { userId, emailAddress, phoneNumber, birthDate, username, bio, password, oldPassword } = req.body;


    // Validate values //
    let validEmailAddress = validateEmailAddress(emailAddress);    
    if (validEmailAddress != "")
    {
        return res.status(400).json({ error: true, message: validEmailAddress });
    }

    let validPhoneNumber = validatePhoneNumber(phoneNumber);
    if (validPhoneNumber != "")
    {
        return res.status(400).json({ error: true, message: validPhoneNumber });
    }

    let validBirthDate = validateBirthDate(birthDate);
    if (validBirthDate != "")
    {
        return res.status(400).json({ error: true, message: validBirthDate });
    }

    let validUsername = validateUsername(username);
    if (validUsername != "")
    {
        return res.status(400).json({ error: true, message: validUsername });
    }

    let validBio = validateBio(bio);
    if (validBio != "")
    {
        return res.status(400).json({ error: true, message: validBio });
    }
    
    let validOldPassword = validatePassword(oldPassword);
    if (validOldPassword != "")
    {
        return res.status(400).json({ error: true, message: validOldPassword });
    }
    

    // Assign values //
    db.query("SELECT * FROM users WHERE user_id = ? AND password = ?", [userId, oldPassword], (error, results) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Unexpected error during profile update: ${error.message}!`);
            return res.status(500).json({ error: true, message: `Unexpected error: ${error.message}!` });
        }

        // Check if old password is correct //
        if (results.length === 0)
        {
            debug.log(`User ${userId} provided incorrect current password during profile update!`);
            return res.status(401).json({ error: true, message: "Current password is incorrect!" });
        }

        if (password && password.trim() !== "")
        {
            // Validate new password //
            let validPassword = validatePassword(password);
            if (validPassword != "")
            {
                return res.status(400).json({ error: true, message: validPassword });
            }

            // Update database //
            db.query("UPDATE users SET email_address = ?, phone_number = ?, birth_date = ?, username = ?, bio = ?, password = ? WHERE user_id = ?", [emailAddress, phoneNumber, birthDate, username, bio, password, userId], (error2, results2) =>
            {
                // Handle errors //
                if (error2)
                {
                    debug.error(`Unexpected error during profile update: ${err.message}!`);
                    return res.status(500).json({ error: true, message: "Failed to update profile!" });
                }

                // Check if user was found //
                if (results2.affectedRows === 0)
                {
                    debug.log(`User ${userId} not found during profile update!`);
                    return res.status(404).json({ error: true, message: "User not found!" });
                }

                // Success //
                debug.log(`User ${userId} updated their profile successfully!`);
                return res.status(200).json({ error: false, message: "Profile updated successfully!" });
            });
        }
        else
        {
            // Update database without password //
            db.query("UPDATE users SET email_address = ?, phone_number = ?, birth_date = ?, username = ?, bio = ? WHERE user_id = ?", [emailAddress, phoneNumber, birthDate, username, bio, userId], (error2, results2) =>
            {
                // Handle errors //
                if (error2)
                {
                    debug.error(`Unexpected error during profile update: ${err.message}!`);
                    return res.status(500).json({ error: true, message: "Failed to update profile!" });
                }

                // Check if user was found //
                if (results2.affectedRows === 0)
                {
                    debug.log(`User ${userId} not found during profile update!`);
                    return res.status(404).json({ error: true, message: "User not found!" });
                }

                // Success //
                debug.log(`User ${userId} updated their profile successfully!`);
                return res.status(200).json({ error: false, message: "Profile updated successfully!" });
            });
        }
    });
});

app.post("/order", (req, res) =>
{
    // Get request values //
    const { userId, message, thematic, images } = req.body;


    // Validate values //
    let validOrderMessage = validateOrderMessage(message);
    if (validOrderMessage != "")
    {
        return res.status(400).json({ error: true, message: validOrderMessage });
    }

    let validOrderThematic = validateOrderThematic(thematic);
    if (validOrderThematic != "")
    {
        return res.status(400).json({ error: true, message: validOrderThematic });
    }

    let validOrderImages = validateOrderImages(images);
    if (validOrderImages != "")
    {
        return res.status(400).json({ error: true, message: validOrderImages });
    }


    // Check if user already has an order //
    db.query("SELECT * FROM orders WHERE user_id = ?", [userId], (error, results) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Database error during order submission: ${error.message}!`);
            return res.status(500).json({ error: true, message: "Order submission failed!" });
        }

        // User already has an order //
        if (results.length > 0)
        {
            debug.log(`User ${userId} attempted to submit a new order while having an active one!`);
            return res.status(400).json({ error: true, message: "You already have an active order!" });
        }
        
        // Insert order //
        db.query("INSERT INTO orders (user_id, message, thematic) VALUES (?, ?, ?)", [userId, message, thematic], (error, result) =>
        {
            // Handle errors //
            if (error)
            {
                debug.error(`Database error during order submission: ${error.message}!`);
                return res.status(500).json({ error: true, message: "Order submission failed!" });
            }

            images.forEach(element =>
            {
                db.query("INSERT INTO order_images (order_id, image_data) VALUES (?, ?)", [result.insertId, element], (error2, result2) =>
                {
                    // Handle errors //
                    if (error2)
                    {
                        debug.error(`Database error during order image submission: ${error2.message}!`);
                        return res.status(500).json({ error: true, message: "Order submission failed!" });
                    }

                    // Success //
                    debug.log(`User ${userId} submitted a new order successfully!`);
                    return res.status(200).json({ error: false, message: "Order submitted successfully!"});
                });
            });
        });
    });
});

app.post("/revokeOrder", (req, res) =>
{
    // Get request values //
    const { userId } = req.body;

    // Delete order //
    db.query("DELETE FROM orders WHERE user_id = ?", [userId], (error, result) =>
    {
        // Handle errors //
        if (error)
        {
            debug.error(`Database error during order revocation: ${error.message}!`);
            return res.status(500).json({ error: true, message: "Failed to revoke order!" });
        }

        db.query("DELETE FROM images WHERE order_id NOT IN (SELECT order_id FROM orders)", (error2, result2) =>
        {
            // Handle errors //
            if (error2)
            {
                debug.error(`Database error during order image cleanup: ${error2.message}!`);
                return res.status(500).json({ error: true, message: "Failed to revoke order!" });
            }

            // Success //
            debug.log(`User ${userId} revoked their order successfully!`);
            return res.status(200).json({ error: false, message: "Order revoked successfully!" });
        });
    });
});