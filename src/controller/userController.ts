import { IAddUser } from "../interface/user";
import * as userRepository from "../repository/userRepository";

const registerUser = async (userDetails: IAddUser) => {
  try {
    const existingEmail = await userRepository.fetchUser(userDetails.email);
    // if the user email exists, throw an error
    if (existingEmail) {
      throw {
        statusCode: 400,
        customMessage: "email address already exists",
      };
    }
    const result = await userRepository.userAdded(userDetails);
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Unable to register. Please try after some time",
      };
    }
    return { isError: false };
  } catch (error) {
    return { isError: true, error };
  }
};

export default { registerUser };
