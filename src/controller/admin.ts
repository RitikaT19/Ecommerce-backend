import { getJWT } from "../helpers/helperFile";
import { IAddUser, IUserLogin } from "../interface/user";
import * as adminRepository from "../repository/admin";
import { validateUser } from "../db-init/model/user";
const bcrypt = require("bcrypt");

/**
 * @description function for registering an admin
 * @param adminDetails
 * @returns
 */
const registerAdmin = async (adminDetails: IAddUser) => {
  try {
    // validate user
    const userValidation: any = validateUser(adminDetails);
    // if there is error, throw error
    if (userValidation.error) {
      throw {
        statusCode: 400,
        customMessage: userValidation.error.details[0].message,
      };
    }
    // fetch email from the repository
    const existingEmail = await adminRepository.fetchAdmin(adminDetails.email);
    // if the user email exists, throw an error
    if (existingEmail) {
      throw {
        statusCode: 400,
        customMessage: "Email address already exists",
      };
    }

    let { firstName, lastName, email, password } = adminDetails;
    // hashing the password
    password = await bcrypt.hash(password, 10);
    // getting result rom adminRepository
    const result = await adminRepository.adminAdded({
      firstName,
      lastName,
      email,
      password,
    });
    // if result is not found, throw error
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Unable to register Admin. Please try after some time",
      };
    }

    return { isError: false };
  } catch (error) {
    return { isError: true, error };
  }
};

/**
 * @description function for logging in an admin
 * @param adminDetails
 * @returns
 */
const login = async (adminDetails: IUserLogin) => {
  try {
    // calling admin repository to fetch admin detail
    const result: any = await adminRepository.fetchAdmin(adminDetails.email);
    // if admin with the given email id not available, throw error
    if (!result) {
      throw {
        statusCode: 400,
        customMessage: "Admin not found!",
      };
    }

    // comparing password provided by the admin and password stored in the db
    const comparePassword = await bcrypt.compare(
      adminDetails.password,
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

export default { registerAdmin, login };
