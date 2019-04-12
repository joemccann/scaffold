exports['foo'] = async (req, res) => {
  const {
    body,
    query
  } = req

  //
  // TODO: Add Logic 
  //

  if (err) return res.send({ err })

  return res.send({ data })
}