let AWS = require('aws-sdk');
let region = "us-east-1";
let secretName = "gil-ballon-c-andres-veterinary-secret-manager-database";
let LocalStorage = require('node-localstorage').LocalStorage;


let getSecretAsync = async () => {
    return new Promise((resolve, reject) => {
        let client = new AWS.SecretsManager({ region: region });
        client.getSecretValue({ SecretId: secretName }, function (err, data) {
            resolve(data)
        });
    });
}

let loadCredentials = async () => {
    let data = await getSecretAsync();
    let secret = JSON.parse(data.SecretString);;
    let localStorage = new LocalStorage('/tmp/scratch');

    localStorage.setItem('username', secret.username);
    localStorage.setItem('password', secret.password);
    localStorage.setItem('database', secret.dbname);
    localStorage.setItem('host', secret.host);
    localStorage.setItem('port', secret.port);
    localStorage.setItem('dialect', secret.engine);

}


module.exports = {
    loadCredentials: loadCredentials
}