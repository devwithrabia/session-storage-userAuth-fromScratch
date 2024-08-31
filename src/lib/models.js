import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: 50
    },

    password: {
      type: String
    },

    img: {
      type: String
    },

    isAdmin: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
)

//now we are generating token for cookie store:

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token =jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//     this.tokens = this.tokens.concat({ token: token })
//     await this.save()
//     return token
//   } catch (error) {
//     console.log(error)
//   }
// }

//generating token for sessionStore:

userSchema.methods.generateToken = async function () {
  try {
    let token =  jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      },
      process.env.SECRET_KEY,
      {
        expiresIn:"30d",
      }
    )

    return token;
  } catch (error) {

    console.log(error)
  }
}

export const User = mongoose.models?.User || mongoose.model('User', userSchema)
