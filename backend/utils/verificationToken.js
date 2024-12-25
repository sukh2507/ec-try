import crypto from "crypto";

export const generateVerificationToken = () => {
  return crypto.randomInt(100000, 999999);
};

export const generatePwdToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const expiry = (time) => {
  return new Date(Date.now() + time * 1000);
};
