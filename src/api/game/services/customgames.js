const { populate } = require("../controllers/customgames");

const axios = require("axios")

module.exports = {
  async populate(ctx) {
    const gogApiUrl = `https://gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    console.log(products)
  },
};
