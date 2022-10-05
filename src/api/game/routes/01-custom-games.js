module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/games/populate",
      handler: "01-custom-games.populate",
    },
  ],
};
