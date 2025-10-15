

export const test = (req, res) =>{

  const { input } = req.body


  console.log(input)

  res.json({ output: input })
}

