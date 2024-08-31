import { User } from '@/lib/models.js'
import { connectDB } from '@/lib/utils.js'
import bcrypt from 'bcryptjs'

const POST = async (req, res) => {
  const { email, password } = await req.body

  console.log(email, password)

  // Calls the connect function to establish a connection to the database.

  try {
    await connectDB()

    console.log('connected')

    const userExist = await User.findOne({ email })

   

    if (userExist) {

      const isMatch = await bcrypt.compare(password, userExist.password)

      if (!isMatch) {
        return res.status(400).json({ error: 'invalid credientials password' })
      }
      
      res.status(200).json({
        message: 'user login successfuly',
        token: await userExist.generateToken(),
        userId: userExist._id.toString()
      })
    }

    return res.status(400).json({ error: 'invalid credientials' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
export default POST
