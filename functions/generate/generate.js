/*
Generate QR code image to pay with Swish
*/

const swishQr = require('swish-qr');

exports.handler = async function (event) {
    const params = event.queryStringParameters;

    if (!params.number) {
        return {
            statusCode: 500,
            body: 'No phone number entered!',
        };
    }

    const pngBase64Image = await swishQr({
        number: params.number,
        amount: params.amount,
        message: params.message,
        lock: ['number', 'amount', 'message'],
    });

    const img = Buffer.from(
        pngBase64Image.substr('image/png;data:base64,'.length), 'base64');
    const body = pngBase64Image.replace('image/png;data:base64,', '');

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        },
        body: img.toString("base64"),
        isBase64Encoded: true
    };
}