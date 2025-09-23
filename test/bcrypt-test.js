// 首先需要安装bcrypt库: npm install bcrypt
const bcrypt = require("bcrypt");

/**
 * 生成与PHP password_hash兼容的密码哈希
 * @param {string} password - 明文密码
 * @param {number} saltRounds - 盐值轮数，对应PHP的cost参数，默认为10
 * @returns {Promise<string>} 生成的哈希字符串
 */
async function passwordHash(password, saltRounds = 10) {
  try {
    // 生成哈希，自动处理盐值生成
    const hash = await bcrypt.hash(password, saltRounds);

    // bcrypt在Node.js中默认生成$2b$前缀的哈希
    // 为了与PHP的$2y$完全兼容，我们替换前缀
    return hash.replace("$2b$", "$2y$");
  } catch (error) {
    throw new Error(`哈希生成失败: ${error.message}`);
  }
}

/**
 * 验证密码与哈希是否匹配（兼容PHP生成的哈希）
 * @param {string} password - 明文密码
 * @param {string} hash - 哈希字符串（可以是PHP生成的）
 * @returns {Promise<boolean>} 验证结果
 */
async function passwordVerify(password, hash) {
  try {
    // PHP使用$2y$前缀，Node.js的bcrypt默认期望$2b$
    // 统一转换为$2b$以确保兼容性
    const normalizedHash = hash.replace("$2y$", "$2b$");

    // 验证密码
    return await bcrypt.compare(password, normalizedHash);
  } catch (error) {
    throw new Error(`密码验证失败: ${error.message}`);
  }
}

// 示例用法
async function example() {
  const password = "userPassword123!";

  try {
    // 生成哈希
    const hash = await passwordHash(password);
    console.log("生成的哈希值:", hash);

    // 验证正确密码
    const isValid = await passwordVerify(password, hash);
    console.log("正确密码验证结果:", isValid); // 输出: true

    // 验证错误密码
    const isInvalid = await passwordVerify("wrongPassword", hash);
    console.log("错误密码验证结果:", isInvalid); // 输出: false

    // 验证PHP生成的哈希（示例）
    const phpGeneratedHash =
      "$2y$10$N9qo8uLOickgx2ZMRZo5MeVQ6VQ5EX8UkqJ5tVxK6viM0A.5Q5v5u";
    const phpHashValid = await passwordVerify(
      "correctPassword",
      phpGeneratedHash
    );
    console.log("PHP生成的哈希验证结果:", phpHashValid);
    const phpGenerateHashV2 =
      "$2y$10$8uxztjDNUPq/G/x3.oqC.OcWjrIt2QCi7DGZicYGSAT/fYVGKbidq";
    const phpHashValid2 = await passwordVerify("123456", phpGenerateHashV2);
    console.log("PHP生成的哈希验证结果v2:", phpHashValid2);
  } catch (error) {
    console.error("操作失败:", error.message);
  }
}

// 运行示例
example();

module.exports = { passwordHash, passwordVerify };
