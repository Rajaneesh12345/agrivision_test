const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let testSeriesSchema = new Schema({
    name : String,
    bigImage : String,
    smallImage : String,
    price : Number,
    exam : String,
    subject : String,
    rating : Number,
    description : String,
    userEnrolled : Number,
    quizzes : [{
        type : Schema.Types.ObjectId,
        ref : 'Quiz'
    }],
    highlights:[{
        type:String
    }],
    feedbacks:[{
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }],
    similarTestSeries : [{
        type : Schema.Types.ObjectId,
        ref : 'TestSeries'

    }]
})

let TestSeries = mongoose.model('TestSeries', testSeriesSchema);


module.exports = TestSeries;
