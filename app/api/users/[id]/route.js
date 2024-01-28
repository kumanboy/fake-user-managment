import {NextResponse} from "next/server";
import {users} from "@/app/util/db";
import fs from "fs";

// 2.  Specific User
export async function  GET(_, res) {
  const {id} = await res.params;
  const user = users.filter((u) => u.id == id);
  return NextResponse.json({ user }, { status: 200 });
}
// Login
export async function POST(req, res) {
  let {name, email, password} = await req.json();
  const {id} = await res.params;

  const {
    name: userName,
    email: userEmail,
    password: userPassword,
  } = users.find((u) => u.id == id);

  if (userName === name && userEmail === email && userPassword === password) {
    return NextResponse.json({result: "Login Successful"}, {status: 200});
  } else if (!name || !email || !password) {
    return NextResponse.json({result: "All fields are required"}, {status: 400});
  } else {
    return NextResponse.json({result: "Invalid Credentials"}, {status: 401});
  }
}
// Delete user
export async function DELETE(req,res){
  const {id} = await res.params
//   userni idisi bo'yicha topish va o'chirish

  const userIndex = users.findIndex((user) => user.id == id)

  if (userIndex == -1) {
    return NextResponse.json({result: "User not found"}, {status: 404})
  }
  // userni db.jsdan o'chirish
  users.splice(userIndex, 1)

  const updatedUsersArray = users
  const updatedData = JSON.stringify(updatedUsersArray, null, 2)

  fs.writeFileSync("./src/app/utils/db.js",
      `export const users = ${updatedData}`,
      "utf-8"
  )

  return NextResponse.json({result: "User deleted successfully"}, {status: 200})
}