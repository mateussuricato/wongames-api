module.exports = {
  async populate(ctx, next) {
    // called by GET /hello
    console.log("iniciando")
    ctx.send({ ok: true }); // we could also send a JSON
  },
};
