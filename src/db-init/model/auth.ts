import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// hashing the password
// userSchema.pre("save", async function(next){
//   // this will hash the password if the password is modified in the future
//   if(this.isModified('password')){
//     this.hash_password = await bcrypt.hash(this.password,10)
//   }
//   next();
// })

// userSchema.virtual("password")
// .set((password: any)=>{
//   userSchema.hash_password = bcrypt.hashSync(password);
// })
// userSchema.methods = {
//   authenticate: (password, hash_password) =>{
//     return bcrypt.compareSync(password, this.hash_password)
//   }
// }


export const User = mongoose.model("user", userSchema);
