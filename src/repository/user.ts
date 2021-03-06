import { User } from "../db-init/model/user";
import { IAddUser, IUserLogin } from "../interface/user";

/**
 * @description fetch by email
 * @param email
 * @returns
 */
export const fetchUser = async (email: string) => {
  try {
    let result = await User.findOne({ email: email });
    return result;
  } catch (error) {
    return false;
  }
};
/**
 * @description create a user
 * @param userDetails
 * @returns
 */
export const userAdded = async (userDetails: IAddUser) => {
  try {
    await User.create({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
