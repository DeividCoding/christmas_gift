const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Open Sans', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F5F5F7;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #FFF;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #004482, #0071BC);
            color: #ffffff;
            padding: 20px 30px;
            font-size: 24px;
            text-align: center;
        }

        .content {
            padding: 20px 30px;
            color: #666;
        }

        strong, em {
            color: #004482;
        }

        ol li {
            margin-bottom: 12px;
        }

        .footer {
            background-color: #EBF0F3;
            color: #666;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
        }

        .gift-link-container {
            text-align: center;
            margin-top: 20px; /* Espacio entre el mensaje y el enlace del regalo */
        }

        .gift-link {
            background-color: #FF5733;
            color: #FFF;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .gift-link:hover {
            background-color: #FF2A00;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ¡Felices Fiestas, ${process.env.GIFT_RECIPIENT_NAME}! 🎄❄️
        </div>
        <div class="content">
            <p>¡Hola ${process.env.GIFT_RECIPIENT_NAME}!</p>
            <p>${process.env.GIFT_MESSAGE}</p>
            <div class="gift-link-container">
                <a class="gift-link" href="${process.env.GIFT_URL}">¡Haz clic aquí para abrir tu regalo!</a>
            </div>
            
        </div>
        <div class="footer">
            ${process.env.GIFT_POSTSCRIPT}
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate;
