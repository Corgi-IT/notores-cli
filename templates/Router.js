const mongoose = require('mongoose');

class <%- Name %>Router {

    static getModel() {
        return mongoose.model(require('./index').modelName);
    }

    static async get(req, res, next) {
        const <%- Name %> = <%- Name %>Router.getModel();
        const result = await <%- Name %>.find();
        res.locals.setBody({<%- name %>: result});
        next();
    }

    static async getById(req, res, next) {
        const <%- Name %> = <%- Name %>Router.getModel();
        const result = await <%- Name %>.findOne({_id: req.params.id});
        res.locals.setBody({<%- name %>: result});
        next();
    }

    static async post(req, res, next) {
        const <%- Name %> = <%- Name %>Router.getModel();
        let new<%- Name %>;
        try {
            const result = await <%- Name %>.insertMany(req.body);
            if (result.length === 1)
                new<%- Name %> = result[0];
            else
                new<%- Name %> = result;
	    res.status(201);
            res.locals.setBody({<%- name %>: new<%- Name %>});
        } catch (e) {
            res.locals.setBody({error: e.message});
        }
        next();
    }

    static async put(req, res, next) {
        const <%- Name %> = <%- Name %>Router.getModel();
        const <%- name %> = await <%- Name %>.findOne({_id: req.params.id});
        if (<%- name %>)
            await <%- name %>.updateAndSave(req.body);
        res.locals.setBody({<%- name %>});
        next();
    }

    static async delete(req, res, next) {
        const <%- Name %> = <%- Name %>Router.getModel();
        const result = await <%- Name %>.deleteOne({_id: req.params.id});
        res.locals.setBody({<%- name %>: result});
        next();
    }
}

module.exports = <%- Name %>Router;
