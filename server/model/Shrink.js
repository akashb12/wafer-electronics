const mongoose = require('mongoose');
const shortId = require('shortid')
const shrinkSchema = mongoose.Schema({

    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default:shortId.generate
    },
    enabled: {
        type: Boolean,
        default: true
    },
    clicks: {
        type: Array,
        default: []
    },
}, { timestamps: true })


const Shrink = mongoose.model('Shrink', shrinkSchema);

module.exports = { Shrink }