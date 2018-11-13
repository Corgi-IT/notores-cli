const {Schema} = require('mongoose');

const <%- Name %> = new Schema({
    
}, {
    minimize: false,
    strict: false,
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

/*
<%- Name %>.statics.asyncFunction = async function fn() {

};
*/

/*
<%- Name %>.methods.asyncFunction = async function fn() {

};
*/

/*
<%- Name %>.virtual('')
    .get(function () {
	
    })
    .set(function () {
	
    });
*/

<%- Name %>.set('toObject', {getters: true, virtuals: true});
<%- Name %>.set('toJSON', {getters: true, virtuals: true});

module.exports = <%- Name %>;
