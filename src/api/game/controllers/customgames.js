module.exports = {
  async populate(ctx, next) {
    // called by GET /hello
    console.log("Starting to populate");

    await strapi.service("api::game.customgames").populate();

    ctx.send("Finished populating"); // we could also send a JSON
  },
};
