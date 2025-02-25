import crypto from "crypto";

const generateOTP = () => crypto.randomInt(100000, 999999);

export default generateOTP;