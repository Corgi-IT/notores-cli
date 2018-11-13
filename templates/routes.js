const <%- Name %>Router = require('./Router');
const pack = require('./package');

module.exports = router => {
    router.get(pack.route, <%- Name %>Router.get);
    router.get(`${pack.route}/:id`, <%- Name %>Router.getById);
    router.post(pack.route, <%- Name %>Router.post);
    router.put(`${pack.route}/:id`, <%- Name %>Router.put);
    router.delete(`${pack.route}/:id`, <%- Name %>Router.delete);
};
