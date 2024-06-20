const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")

function formatTime(ms) {
    if (ms < 1000) {
        return ms + 'ms';
    } else if (ms < 60 * 1000) {
        const seconds = Math.floor(ms / 1000);
        return seconds + 's';
    } else if (ms < 60 * 60 * 1000) {
        const minutes = Math.floor(ms / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        return minutes + 'm ' + seconds + 's';
    } else {
        const hours = Math.floor(ms / (60 * 60 * 1000));
        const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
}

const generateToken = async ({ data, expiresIn }) => {

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expiresIn ? expiresIn : process.env.JWT_EXPIRES_IN });
    return token;
}

const comparePassword = async ({ password, hash }) => {

    const isPasswordMatch = await bcrypt.compare(password, hash);
    return isPasswordMatch;

}

module.exports = { formatTime, generateToken, comparePassword }