import { User } from "../db-init/model/user";
import { IAddUser } from "../interface/user";

/**
 * @description mongoose method for finding email from the db
 * @param email
 * @returns
 */
export const fetchAdmin = async (email: string) => {
  try {
    let result = await User.findOne({ email: email });
    return result;
  } catch (error) {
    return false;
  }
};

/**
 * @description mongoose method for creating a user
 * @param adminDetails
 * @returns
 */
export const adminAdded = async (adminDetails: IAddUser) => {
  try {
    await User.create({
      firstName: adminDetails.firstName,
      lastName: adminDetails.lastName,
      email: adminDetails.email,
      password: adminDetails.password,
      role: "admin",
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
