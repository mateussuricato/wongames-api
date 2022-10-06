const { populate } = require("../controllers/customgames");

const axios = require("axios");
const slugify = require("slugify");
async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(".description");

  return {
    rating: "BR0",
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTML,
  };
}

module.exports = {
  async populate(ctx) {
    const gogApiUrl = `https://gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    const nowDate = new Date();

    const { data } = await axios.get(gogApiUrl);

    // console.log(await getGameInfo(products[0].slug));

    console.log(data.products[0].publisher);

    await strapi.service("api::publisher.publisher").create({
      data: {
        name: data.products[0].publisher,
        slug: slugify(data.products[0].publisher).toLowerCase(),
      },
    });

    await strapi.service('api::developer.developer').create({
      data: {
        name: data.products[0].developer,
        slug: slugify(data.products[0].developer).toLowerCase(),
      },
    });
  },
};
