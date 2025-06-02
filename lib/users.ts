import fs from "fs";
import path from "path";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export function findUser(email: string, password: string): User | null {
  const filePath = path.join(process.cwd(), "users.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const users: User[] = JSON.parse(data);

  return users.find((user) => user.email === email && user.password === password) || null;
}