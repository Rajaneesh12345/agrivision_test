module.exports.User = require("./user");

module.exports.Magazine = require("./magazine");
module.exports.Article = require("./article");
module.exports.Carousel = require("./carousel");
module.exports.Newsletter = require("./newsletter");
module.exports.Notification = require("./notification");

let exportedCourseObject = require("./courses/course");
module.exports.Course = exportedCourseObject.Course;
module.exports.Review = exportedCourseObject.Review;
module.exports.Package = exportedCourseObject.Package;
module.exports.PackageCategory = exportedCourseObject.PackageCategory;
module.exports.Chapter = require("./courses/chapter");
module.exports.Topic = require("./courses/topic");
module.exports.SubTopic = require("./courses/subtopic");

module.exports.Event = require("./event");

module.exports.Jobs = require("./job");

module.exports.College = require("./academic");

let exportedDiscussionObject = require("./courses/discussion");
module.exports.DiscussionQuestion = exportedDiscussionObject.DiscussionQuestion;
module.exports.Reply = exportedDiscussionObject.Reply;

let exportedTestSeriesObject = require("./testSeries");
module.exports.TestSeries = exportedTestSeriesObject.TestSeries;
module.exports.Subject = exportedTestSeriesObject.Subject;

module.exports.Quiz = require("./quiz/quiz");
module.exports.Question = require("./quiz/question");
module.exports.Rank = require("./quiz/rank");
module.exports.Registration = require("./quiz/registration");

let CoupenObj = require("./coupen");
module.exports.CoupenType = CoupenObj.CoupenType;
module.exports.Coupen = CoupenObj.Coupen;
module.exports.ReferralData = require("./referralData");
