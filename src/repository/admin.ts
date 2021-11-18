import { User } from "../db-init/model/user";
import { IAddUser } from "../interface/user";

export const fetchAdmin = async (email: string) =>{
    try{
        let result = await User.findOne({ email: email });
        return result;
    }catch(error){
        return false;
    }
}

export const adminAdded = async (adminDetails: IAddUser) => {
    try {
      await User.create({
        firstName: adminDetails.firstName,
        lastName: adminDetails.lastName,
        username: Math.random().toString(),
        email: adminDetails.email,
        password: adminDetails.password,
        role:"admin"
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };