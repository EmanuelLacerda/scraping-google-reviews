const AWS = require('aws-sdk');

exports.run = async () => {
    const sns = new AWS.SNS({ region: 'us-east-1' });

    const data = [
        { "url": "https://www.google.com/maps/place/Nema/@-22.9841517,-43.2128543,15z/data=!4m5!3m4!1s0x0:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543?shorturl=1" },
        { "url": "https://www.google.com/maps/place/Nema+Padaria+Humait%C3%A1/@-22.9561199,-43.2051002,15z/data=!4m8!3m7!1s0x997fd3ce25318b:0x17650611ede4f2c9!8m2!3d-22.956128114d-43.196346219m1!1b1!16s%2Fg%2F11pqxzwzs?entry=ttu&gep=EgoyMDI0MTAWOS4WIKXMDSOASAFQAW%3D%D" }
    ];

    const topicArn = process.env.SNS_TOPIC_ARN;

    for (const item of data) {
        const params = {
            Message: item.url,
            TopicArn: topicArn
        };

        try {
            const data = await sns.publish(params).promise();
            console.log('Mensagem enviada com sucesso:', data.MessageId);
        } catch (err) {
            console.error(err);
        }
    }
};