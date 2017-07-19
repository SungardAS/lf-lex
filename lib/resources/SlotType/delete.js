var _ = require("lodash");
var AWS = require("aws-sdk");
var handler = require("lambda-formation").resource.delete;
var util = require("lambda-formation").util;
var shortid = require("shortid");

var destroy = function (err, event, context) {
  if (err) {
    return util.done(err);
  }

  var region = event.Region || process.env.AWS_DEFAULT_REGION;

  var lex = new AWS.LexModelBuildingService({region: region});

  lex.deleteSlotType({name: event.PhysicalResourceId}, function(err, data) {
    if (err) return util.done(err,event,context);

    util.done(null, event, context);
  });

};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, destroy]);
};

