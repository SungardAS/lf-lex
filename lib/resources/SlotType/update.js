var _ = require("lodash");
var AWS = require("aws-sdk");
var handler = require("lambda-formation").resource.update;
var util = require("lambda-formation").util;
var shortid = require("shortid");

var update = function (err, event, context) {
  if (err) {
    return util.done(err);
  }

  var region = event.Region || process.env.AWS_DEFAULT_REGION;

  var params = event.ResourceProperties;
  delete params.ServiceToken;

  var lex = new AWS.LexModelBuildingService({region: region});

  if (_.isUndefined(params.name)) {
    params.name = event.PhysicalResourceId;
  }

  lex.putSlotType(params, function(err, data) {
    if (err) return util.done(err,event,context);

    util.done(null, event, context, data, data.name);
  });

};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, update]);
};

