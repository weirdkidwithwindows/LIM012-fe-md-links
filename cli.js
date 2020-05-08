#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./src/mdLinks');

const userArguments = process.argv;

const formatCliOutput = (arrayOfLinkObjects) => {
  let output = '';
  arrayOfLinkObjects.forEach((link) => {
    const keys = Object.keys(link);
    output = `${link['file']} ${link['href']} ${link['text']}`;
    if (keys.length == 5) {
      if (link['statusText'] == 'ok') {
        output += `${chalk.green(link['status'])} ${chalk.green(link['statusText'])}`;
      }
      output += `${chalk.red(link['status'])} ${chalk.red(link['statusText'])}`;
    }
    return output;
  })
};

const getStatistics = (arrayOfLinkObjects) => {
};

const getValidityStatistics = (arrayOfLinkObjects) => {
};

const cli = (arguments) => {
  if (arguments.length == 3) {
    return mdLinks(arguments[2])
      .then((arr) => formatCliOutput(arr));
  }
  else if (arguments.length == 4 && arguments[3] === '--validate') {
    return mdLinks(arguments[2], { validate: true })
      .then((arr) => formatCliOutput(arr));
  }
  else if (arguments.length == 4 && arguments[3] === '--stats') {
    return mdLinks(arguments[2], { validate: true })
      .then((arr) => getStatistics(arr));
  }
  else if (arguments.length == 5 && arguments[3] === '--stats' && arguments[4] === '--validate') {
    return mdLinks(arguments[2], { validate: true })
    .then((arr) => getValidityStatistics(arr));
  }
};

cli(userArguments)
  .then((arr) => console.log(arr))
  .catch((err) => console.error(err.message));