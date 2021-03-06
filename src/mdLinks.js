const utilityFunctions = require('./utils');

const mdLinks = (pathEnteredByUser, options) => new Promise((resolve) => {
  const absolutePath = utilityFunctions.resolvePath(pathEnteredByUser);
  if (utilityFunctions.validatePath(absolutePath)) {
    const links = utilityFunctions.getArrayOfLinks(absolutePath);
    const formattedLinks = utilityFunctions.formatLinks(links, pathEnteredByUser);
    if (!options || options.validate === false) {
      resolve(formattedLinks);
    }
    if (options.validate === true) {
      const validatedLinks = utilityFunctions.validateLinks(formattedLinks);
      resolve(validatedLinks);
    }
  }
});

module.exports = mdLinks;
