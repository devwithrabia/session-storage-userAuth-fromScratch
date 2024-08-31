const GET = async (req, res) => {
  try {
    //here through token verification in middleware we get userdata who currently signed in:
    const userData = await req.user

    return res.status(200).json({ msg:userData})
  } catch (error) {
    console.log(`error from the user route ${error}`)
  }
}

export default GET
