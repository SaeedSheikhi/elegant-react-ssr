const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

function config () {
  const envConfig = dotenv.parse(
    fs.readFileSync(
      `${path.join(__dirname, '..', '..')}/.env.${process.env.NODE_ENV}`
    )
  );
  // eslint-disable-next-line
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

module.exports = {
  config,
};
