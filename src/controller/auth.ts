import { IAddUser } from "../interface/auth";
import * as userRepository from "../repository/auth";
const bcrypt = require('bcrypt');


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

    let {
      firstName,
      lastName,
      email,
      password
    } = userDetails;

    password = await bcrypt.hash(password, 10)

    const result = await userRepository.userAdded({
      firstName,
      lastName,
      email,
      password
    });
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
