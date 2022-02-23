const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const redis = new Redis({ host: "redis" });

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    const token = await redis.set(
      id.toString(),
      JSON.stringify(refreshToken),
      "EX",
      30 * 24 * 60 * 60 * 1000
    );
    return token;
  }

  async findToken(id, refreshToken) {
    const tokenData = await redis.get(id.toString());
    const token = JSON.stringify(refreshToken);
    if (token != tokenData) {
      return null;
    }
    return tokenData;
  }
}

module.exports = new TokenService();