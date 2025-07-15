// otpStore.js

const otpStore = {};

function saveOTP(identifier, otp) {
    otpStore[identifier] = {
        otp: otp,
        expiresAt: Date.now() + 3 * 60 * 1000 // 5 minutes
    };
}

function verifyOTP(identifier, otp) {
    const record = otpStore[identifier];
    if (!record) return false;
    if (Date.now() > record.expiresAt) return false;
    return record.otp === otp;
}

module.exports = { saveOTP, verifyOTP };