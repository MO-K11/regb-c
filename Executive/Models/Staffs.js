const mongoose = require('mongoose')
const Staffs = mongoose.Schema({
GuildID: String,    
UserID: String,
MentionID: String,
RegisterTotal: { type: Number, default: 0},
ManTotal: { type: Number, default: 0},
WomanTotal: { type: Number, default: 0}
})
module.exports = mongoose.model("Staffs", Staffs);
