import { Auth } from "aws-amplify";

export default async({redirect}) => {
  const userInfo = await Auth.currentUserInfo()
  console.log(userInfo)

  if(!userInfo) {
    redirect('/')
  }
}
