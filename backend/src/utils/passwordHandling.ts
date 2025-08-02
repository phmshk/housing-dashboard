import * as bcrypt from "bcryptjs";
const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword; // Return the hashed password
}

async function validatePassword(
  inputPassword: string,
  storedHash: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(inputPassword, storedHash); // Compare the input password with the hashed password
  return isMatch; // Return the result of the comparison
}

export { hashPassword, validatePassword };
