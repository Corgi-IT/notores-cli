const mongoose = require('mongoose');

describe('<%- Name %>', () => {
    const index = require('./index');
    const pack = require('./package');
    const <%- name %>Schema = require('./model');
    const Router = require('./Router');
    const routes = require('./routes');
    let <%- Name %>;

    beforeAll(async () => {
        await mongoose.connect(`mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DB}`);

        <%- Name %> = mongoose.model(index.modelName, <%- name %>Schema);
    });

    // afterAll(() => mongoose.disconnect());


    describe('index', () => {

        test('Should have property model', () => {
            expect(index).toHaveProperty('model');
        });

        test('Should have property modelName with value <%- Name %>', () => {
            expect(index).toHaveProperty('modelName', '<%- Name %>');
        });

        test('Should have property routes', () => {
            expect(index).toHaveProperty('routes');
        });
    });

    describe('package.json', () => {

        test('Should have property name with value <%- name %>', () => {
            expect(pack).toHaveProperty('name', '<%- name %>');
        });

        test('Should have property route with value /<%- name %>', () => {
            expect(pack).toHaveProperty('route', '/<%- name %>');
        });

        test('Should have property main with value index', () => {
            expect(pack).toHaveProperty('main', 'index');
        });
    });

    describe('Router.js', () => {
        let req;
        let res;
        let next;
        let inserted<%- Name %>;
        const test<%- Name %>s = require('./<%- name %>.test.json');

        beforeEach(async () => {
            req = {
                params: {}
            };
            res = {
                locals: {
                    body: null
                },
                status: jest.fn()
            };
            next = jest.fn();
            res.locals.setBody = function (body) {
                this.body = body;
            };

            inserted<%- Name %>s = await <%- Name %>.insertMany(test<%- Name %>s);
        });

        afterEach(async () => {
            await <%- Name %>.deleteMany({});
        });

        describe('.getModel', () => {
            test('Should return the <%- Name %> model', () => {
                const result = Router.getModel();
                expect(result).toEqual(<%- Name %>);
            });
        });

        describe('.get', () => {
            test('Should return a list of <%- Name %> documents', async () => {
                await Router.get(req, res, next);

                expect(res.locals.body).toHaveProperty('<%- name %>');
                expect(res.locals.body.<%- name %>.length).toEqual(test<%- Name %>s.length);

                expect(next).toHaveBeenCalledTimes(1);
            });
        });

        describe('.getById', () => {
            test('Should return one requested <%- Name %> document', async () => {
                req.params.id = inserted<%- Name %>s[0].id;
                await Router.getById(req, res, next);

                expect(res.locals.body).toHaveProperty('<%- name %>');
                expect(res.locals.body.<%- name %>).toBeInstanceOf(Object);
                expect(res.locals.body.<%- name %>._id).toEqual(inserted<%- Name %>s[0]._id);
                expect(next).toHaveBeenCalledTimes(1);
            });
        });

        describe('.post', () => {
            test('Should set response status to 201', async () => {
                req.body = {};
                await Router.post(req, res, next);

                expect(res.status.mock.calls[0][0]).toBe(201);
                expect(next).toHaveBeenCalledTimes(1);
            });

            test('Should contain an object when only one new <%- name %> is given', async () => {
                req.body = {};
                await Router.post(req, res, next);

                expect(res.locals.body.<%- name %>).toBeInstanceOf(Object);
                expect(next).toHaveBeenCalledTimes(1);
            });

            test('Should contain an array when multiple <%- name %>s are given', async () => {
                req.body = [{}, {}];
                await Router.post(req, res, next);

                expect(Array.isArray(res.locals.body.<%- name %>)).toBeTruthy();
                expect(next).toHaveBeenCalledTimes(1);
            });
        });

        describe('.put', () => {
            //TODO: Can be done after a schema is defined
        });

        describe('.delete', () => {
            test('Should delete the document with the given ID', async () => {
                const id = inserted<%- Name %>s[0]._id;
                req.params.id = id;

                await Router.delete(req, res, next);

                const result = await <%- Name %>.findOne({_id: id});

                const resultArr = await <%- Name %>.find();

                expect(result).toEqual(null);
                expect(resultArr.length).toEqual(inserted<%- Name %>s.length - 1);
                expect(next).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('routes.js', () => {
        let spyRouter;

        beforeEach(() => spyRouter = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        });

        test('Should be a function', () => {
            expect(routes).toBeInstanceOf(Function);
        });

        test('Should call param.get for GET route', () => {
            routes(spyRouter);
            expect(spyRouter.get.mock.calls[0][0]).toBe(pack.route);
            expect(spyRouter.get.mock.calls[0][1]).toBe(Router.get);
        });

        test('Should call param.get for GET id route', () => {
            routes(spyRouter);
            expect(spyRouter.get.mock.calls[1][0]).toBe(`${pack.route}/:id`);
            expect(spyRouter.get.mock.calls[1][1]).toBe(Router.getById);
        });

        test('Should call param.post for POST route', () => {
            routes(spyRouter);
            expect(spyRouter.post.mock.calls[0][0]).toBe(pack.route);
            expect(spyRouter.post.mock.calls[0][1]).toBe(Router.post);
        });

        test('Should call param.put for PUT id route', () => {
            routes(spyRouter);
            expect(spyRouter.put.mock.calls[0][0]).toBe(`${pack.route}/:id`);
            expect(spyRouter.put.mock.calls[0][1]).toBe(Router.put);
        });

        test('Should call param.delete for DELETE id route', () => {
            routes(spyRouter);
            expect(spyRouter.delete.mock.calls[0][0]).toBe(`${pack.route}/:id`);
            expect(spyRouter.delete.mock.calls[0][1]).toBe(Router.delete);
        });
    });

});