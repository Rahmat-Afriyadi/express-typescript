import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"

dotenv.config()


const privateKey = process.env.JWT_PRIVATE_SECRET || "";

const publicKey = process.env.JWT_PUBLIC_SECRET || "";

// sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey , { expiresIn });
}

// verify jwt
// export function verifyJWT(token: string) {
//   try {
//     const decoded = jwt.verify(token, publicKey!);
//     return { payload: decoded, expired: false };
//   } catch (error ) {
//     return { payload: null, expired: "jwt expired" };
//   }
// }