import { User } from "../db-init/model/user";
import { IAddUser, IUserLogin } from "../interface/user";

export const fetchUser = async (email: string) => {
  try {
    let result = await User.findOne({ email: email });
    return result;
  } catch (error) {
    return false;
  }
};

export const userAdded = async (userDetails: IAddUser) => {
  try {
    await User.create({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: Math.random().toString(),
      email: userDetails.email,
      password: userDetails.password,
      
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

