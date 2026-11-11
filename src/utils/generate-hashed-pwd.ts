import { hashPassword } from "@/lib/login/manage-login"
;(async () => {
  const myPwd = "adminpwd"
  const hashedPwd64 = await hashPassword(myPwd)

  console.log({ hashedPwd64 })
})()
