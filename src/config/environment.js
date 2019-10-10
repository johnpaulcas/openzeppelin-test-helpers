/* global web3 */

let environment;

function setEnvironment (env) {
  if (env !== 'truffle' && env !== 'web3') {
    throw new Error(`Unknown runtime environment '${env}'`);
  }

  if (env === 'truffle' && !isTruffleEnvironment()) {
    throw new Error(`\
Attempt to configure runtime environment to 'truffle', but truffle detection failed.

Are you running 'truffle test' or 'truffle exec'?`
    );
  }

  environment = env;
}

function setDefaultEnvironment () {
  if (isTruffleEnvironment()) {
    setEnvironment('truffle');
  } else {
    setEnvironment('web3');
  }
}

function getEnviroment () {
  if (environment === null) {
    throw new Error('Runtime environment is not configured');
  }

  return environment;
}

function isTruffleEnvironment () {
  // Truffle environments are detected by the presence of (truffle-injected) global web3 and artifacts variables
  return (typeof web3 !== 'undefined' && typeof artifacts !== 'undefined');
}

setEnvironment.default = setDefaultEnvironment;

module.exports = {
  setEnvironment,
  getEnviroment,
};