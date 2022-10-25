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

async function getByName(name, entityName) {
  const item = await strapi.service(entityName).find({ name });
  return item.length ? item[0] : null;
}

async function create(name, entityName) {
  const item = await getByName(name, entityName);

  if (!item) {
    await strapi.service(entityName).create({
      data: {
        name: name,
        slug: slugify(name, { lower: true }),
      },
    });
  }
}

async function createManyToManyData(products) {
  const developers = {};
  const publishers = {};
  const categories = {};
  const platforms = {};

  products.forEach((product) => {
    const { developer, publisher, genres, supportedOperatingSystems } = product;

    genres &&
      genres.forEach((item) => {
        categories[item] = true;
      });
    supportedOperatingSystems &&
      supportedOperatingSystems.forEach((item) => {
        platforms[item] = true;
      });
    developers[developer] = true;
    publishers[publisher] = true;
  });

  return Promise.all([
    ...Object.keys(developers).map((name) =>
      create(name, "api::developer.developer")
    ),
    ...Object.keys(publishers).map((name) =>
      create(name, "api::publisher.publisher")
    ),
    ...Object.keys(categories).map((name) =>
      create(name, "api::category.category")
    ),
    ...Object.keys(platforms).map((name) =>
      create(name, "api::platform.platform")
    ),
  ]);
}

async function createGames(products) {
  await Promise.all(
    products.map(async (product) => {
      const item = await getByName(product.title, "game");

      if (!item) {
        console.info(`Creating: ${product.title}...`);

        const game = await strapi.service("api::game.customgames").create({
          data: {
            name: product.title,
            slug: product.slug.replace(/_/g, "-"),
            price: product.price.amount,
            release_date: new Date(
              Number(product.globalReleaseDate) * 1000
            ).toISOString(),
            categories: await Promise.all(
              product.genres.map((name) =>
                getByName(name, "api::category.category")
              )
            ),
            platforms: await Promise.all(
              product.supportedOperatingSystems.map((name) =>
                getByName(name, "api::platform.platform")
              )
            ),
            developers: [
              await getByName(product.developer, "api::developer.developer"),
            ],
            publisher: await getByName(
              product.publisher,
              "api::publisher.publisher"
            ),
            ...(await getGameInfo(product.slug)),
          },
        });

        return game;
      }
    })
  );
}

module.exports = {
  async populate(ctx) {
    const gogApiUrl = `https://gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    // console.log(await getGameInfo(products[0].slug));

    // await strapi.service("api::publisher.publisher").create({
    //   data: {
    //     name: data.products[0].publisher,
    //     slug: slugify(data.products[0].publisher).toLowerCase(),
    //   },
    // });

    // await strapi.service("api::developer.developer").create({
    //   data: {
    //     name: data.products[0].developer,
    //     slug: slugify(data.products[0].developer).toLowerCase(),
    //   },
    // });

    // await create(data.products[0].publisher, "api::publisher.publisher");
    // await create(data.products[0].developer, "api::developer.developer");

    await createManyToManyData(products);
    // await createGames([products[2]], products[3]);
  },
};