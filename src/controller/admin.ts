import { getJWT } from "../helpers/get-jwt";
import { IAddUser, IUserLogin } from "../interface/user";
import * as adminRepository from "../repository/admin";
import {validateUser} from "../db-init/model/user"
const bcrypt = require("bcrypt");

const registerAdmin = async (adminDetails: IAddUser) => {
    try {
      // validate user
      const userValidation: any = validateUser(adminDetails);
      // if there is error, throw error
      if(userValidation.error){
        throw{
          statusCode: 400,
          customMessage: userValidation.error.details[0].message
        }
      }
      const existingEmail = await adminRepository.fetchAdmin(adminDetails.email);
      // if the user email exists, throw an error
      if (existingEmail) {
        throw {
          statusCode: 400,
          customMessage: "email address already exists",
        };
      }
  
      let { firstName, lastName, email, password } = adminDetails;
  
      password = await bcrypt.hash(password, 10);
  
      const result = await adminRepository.adminAdded({
        firstName,
        lastName,
        email,
        password,
      });
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

  const login = async (adminDetails: IUserLogin) => {
    try {
      // calling admin repository to fetch admin detail
      const result: any = await adminRepository.fetchAdmin(adminDetails.email);
      // if admin with the given email id not available, throw error
      if (!result) {
        throw {
          statusCode: 400,
          customMessage: "admin not found!",
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
  
  
  export default {registerAdmin, login}