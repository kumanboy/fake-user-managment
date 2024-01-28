import {NextResponse} from "next/server";
import {users} from "app/util/db"
import fs from "fs";

export function GET(){
  const data = users

  return NextResponse.json({data},{status: 200})
}
//Create User

export async function POST(req, res) {
  let {id, name, email, password} = await req.json();

  // Hamma malumotlar to'gri ekanligni tekshirish
  if (!id || !name  || !email || !password) {
    return NextResponse.json({result: "All fields are required"}, {status: 400});
  } else {
    // 	Yangi userni arrayga qo'shish
    users.push({id, name, email, password});
    // 	Updated data
    const updatedUsersArray = users;
    // 	Update qilingan userni JSON stringga o'zgartirish
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)

    // 	db.js filega user malumotlarini qoshish
    // fs haqida so'rang
    fs.writeFileSync("./app/util/db.js",
        `export const users = ${updatedData}`,
        "utf-8"
    );

    return NextResponse.json({result: "User created successfully"}, {status: 200});
  }
}

// Update user
export async function PUT(req, res) {
  let {id, name, age, email, password} = await req.json();

// 	userni idsini topish

  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex == -1) {
    return NextResponse.json({result: "User not found"}, {status: 404});
  }
  if (name){
    users[userIndex].name = name
  }
  if (email){
    users[userIndex].email = email
  }
  if (password){
    users[userIndex].password = password
  }
  if (age){
    users[userIndex].age = age
  }
  const updatedUsersArray = users;
  // 	Update qilingan userni JSON stringga o'zgartirish
  const updatedData = JSON.stringify(updatedUsersArray, null, 2)

  fs.writeFileSync("./src/app/utils/db.js",
      `export const users = ${updatedData}`,
      "utf-8"
  );

  return NextResponse.json({result: "User updated successfully"}, {status: 200});
}
