import { getJWT } from "../helpers/get-jwt";
import { IAddUser, IUserLogin } from "../interface/auth";
import * as userRepository from "../repository/auth";
const bcrypt = require("bcrypt");

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

    let { firstName, lastName, email, password } = userDetails;

    password = await bcrypt.hash(password, 10);

    const result = await userRepository.userAdded({
      firstName,
      lastName,
      email,
      password,
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

const login = async (userDetails: IUserLogin) => {
  try {
    const result: any = await userRepository.fetchUser(userDetails.email);
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "User not found!",
      };
    }

    console.log(result, "result");

    const comparePassword = await bcrypt.compare(
      userDetails.password,
      result.password
    );
    if (comparePassword) {
      const token = getJWT({
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        username: result.username,
        role: result.role,
      });
      console.log(token,"token")
      return{data: token}
    } else {
      throw{
        statusCode: 400,
        customMessage: "Unauthorized login"
      }
    }
  
  } catch (error) {
    return { isError: true, error };
  }
};

export default { registerUser, login };
