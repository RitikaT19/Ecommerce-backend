import { validateUser } from "../db-init/model/user";
import { getJWT } from "../helpers/helperFile";
import { IAddUser, IUserLogin } from "../interface/user";
import * as userRepository from "../repository/user";
const bcrypt = require("bcrypt");

const registerUser = async (userDetails: IAddUser) => {
  try {
    // validate user
    const userValidation: any = validateUser(userDetails);
    // if there is error, throw error
    if (userValidation.error) {
      throw {
        statusCode: 400,
        customMessage: userValidation.error.details[0].message,
      };
    }
    // call repo to fetch user email
    const existingEmail = await userRepository.fetchUser(userDetails.email);
    // if the user email exists, throw an error
    if (existingEmail) {
      throw {
        statusCode: 400,
        customMessage: "Email address already exists",
      };
    }

    let { firstName, lastName, email, password } = userDetails;
    // hash password
    password = await bcrypt.hash(password, 10);
    // call repo to add user
    const result = await userRepository.userAdded({
      firstName,
      lastName,
      email,
      password,
    });
    // if result is not received, throw error
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
    // calling user repository to fetch user detail
    const result: any = await userRepository.fetchUser(userDetails.email);
    // if user with the given email id not available, throw error
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "User not found!",
      };
    }

    // comparing password provided by the user and password stored in the db
    const comparePassword = await bcrypt.compare(
      userDetails.password,
      result.password
    );
    // if password are same, then generate token
    if (comparePassword) {
      const token = getJWT({
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        username: result.username,
        role: result.role,
      });

      return { result: result.data, data: token };
    }
    // else throw error
    else {
      throw {
        statusCode: 400,
        customMessage: "Unauthorized login",
      };
    }
  } catch (error) {
    return { isError: true, error };
  }
};

export default { registerUser, login };
