const isIp = (ip: string) => {
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipRegex.test(ip);
};

const isEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isNumber = (number: string) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(number);
};

const isAlpha = (alpha: string) => {
  const alphaRegex = /^[a-zA-Z]+$/;
  return alphaRegex.test(alpha);
};

const isAlphaNumeric = (alphaNumeric: string) => {
  const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
  return alphaNumericRegex.test(alphaNumeric);
};

const isHexColor = (hexColor: string) => {
  const hexColorRegex = /^#([0-9a-f]{3}){1,2}$/i;
  return hexColorRegex.test(hexColor);
};

const isHexadecimal = (hexadecimal: string) => {
  const hexadecimalRegex = /^[0-9a-f]+$/i;
  return hexadecimalRegex.test(hexadecimal);
};

const isUuid = (uuid: string) => {
  const uuidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i;
  return uuidRegex.test(uuid);
};

const isSlug = (slug: string) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

const isSemver = (semver: string) => {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(semver);
};

const isBase64 = (base64: string) => {
  const base64Regex = /^[a-zA-Z0-9+/]+={0,2}$/;
  return base64Regex.test(base64);
};

const isMimeType = (mimeType: string) => {
  const mimeTypeRegex = /^[a-z]+\/[a-z0-9\-+]+$/;
  return mimeTypeRegex.test(mimeType);
};

const Is = {
  ip: isIp,
  email: isEmail,
  number: isNumber,
  alpha: isAlpha,
  alphaNumeric: isAlphaNumeric,
  hexColor: isHexColor,
  hexadecimal: isHexadecimal,
  uuid: isUuid,
  slug: isSlug,
  semver: isSemver,
  base64: isBase64,
  mimeType: isMimeType,
};

export default Is;
