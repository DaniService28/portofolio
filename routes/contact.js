const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        activePage: 'contact',
        errors: null,
        success: null,
        name: '',
        email: '',
        message: ''
    });
});

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Name is required.');
    if (!email || email.trim() === '') errors.push('Email is required.');
    if (!message || message.trim() === '') errors.push('Message cannot be empty.');

    if (errors.length > 0) {
        return res.render('contact', {
            title: 'Contact',
            activePage: 'contact',
            errors,
            success: null,
            name,
            email,
            message
        });
    }

    try {
        // 1. Configurar transporte SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail", // O "hotmail", "outlook", "yahoo"
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // 2. Enviar correo
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO, // tu correo real
            subject: `New message from ${name}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        // 3. Mostrar éxito
        res.render('contact', {
            title: 'Contact',
            activePage: 'contact',
            errors: null,
            success: 'Your message has been sent. Thank you for reaching out - I’ll get back to you soon.',
            name: '',
            email: '',
            message: ''
        });

    } catch (err) {
        console.error("Email error:", err);

        res.render('contact', {
            title: 'Contact',
            activePage: 'contact',
            errors: ["There was an error sending your message. Try again later."],
            success: null,
            name,
            email,
            message
        });
    }
});

module.exports = router;