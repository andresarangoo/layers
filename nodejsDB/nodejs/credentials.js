let AWS = require('aws-sdk');
const region = "us-east-1";
const secretName = "ProductsSecretManager";

let getSecret = async () => {
    return new Promise((resolve, reject) => {
        const client = new AWS.SecretsManager({ region: region });
        client.getSecretValue({ SecretId: secretName }, function (err, data) {
            resolve(data);
        });
    });
};

module.exports.loadCredentials = async () => {
    const data = await getSecret();
    const secret = JSON.parse(data.SecretString);
    const secretFormatted = {
        username: secret.username,
        password: secret.password,
        database: secret.dbname,
        host: secret.host,
        port: secret.port,
        dialect: secret.engine,
    };
    return secretFormatted;
};
