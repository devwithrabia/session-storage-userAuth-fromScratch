import { User } from '@/lib/models';
import { connectDB } from '@/lib/utils'
import bcrypt from 'bcryptjs'

const POST= async (req,res) => {
  const { username,email, password } = await req.body;

  console.log(email, password)

  // Calls the connect function to establish a connection to the database.

  await connectDB()

  console.log("connected")

  //Checks if a user with the provided email already exists.
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    // return res.json({ error: 'User already exists' }, { status: 400 })
    return res.status(400).json({ error: 'user already exist' })

  }

  //hash password using bcryptjs.
  const hashedPassword = await bcrypt.hash(password, 5)

  const newUser = new User({
    username,
    email,
    password:hashedPassword
  })
  console.log(newUser)

  //saving new user in database:
  try {
    await newUser.save()
    return res.status(200).json({ message: 'user is successfully registered......' })

  } catch (err) {
    return res.status(500).json({ error: err.message });

  }
}
export default POST
