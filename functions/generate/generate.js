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

    const pngBase64Image = await swishQr.sync({
        number: params.number,
        amount: params.amount,
        message: params.message,
        lock: ['number', 'amount', 'message'],
    });

    console.log(pngBase64Image);

    /*
    const img = Buffer.from(
        pngBase64Image.substr('data:image/png;base64,'.length), 'base64');
    */

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            // 'Content-Length': img.length
        },
        body: pngBase64Image,
        isBase64Encoded: true
    };
}