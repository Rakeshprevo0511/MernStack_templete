const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    admin_id: Number,
    unique_id: { type: String },
    first_name: String,
    last_name: String,
    email_id: String,
    login_name: String,
    login_pass: String, // hashed
    is_master: Number,
    is_enabled: mongoose.Schema.Types.Mixed,
    is_deleted: Number,
    added_by: String,
    modify_by: String,
    added_date: String,
    modify_date: String,
    role_id: Number,
    is_activated: mongoose.Schema.Types.Mixed,
    activate_date: mongoose.Schema.Types.Mixed,
    account_id: mongoose.Schema.Types.Mixed,
    LastLogin: String,
    NewLogin: String,
    MainID: mongoose.Schema.Types.Mixed,
    StartDate: mongoose.Schema.Types.Mixed,
    EndDate: mongoose.Schema.Types.Mixed,
    img_path: mongoose.Schema.Types.Mixed,
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);