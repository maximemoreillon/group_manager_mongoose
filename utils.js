exports.error_handling = (error, res) => {

  if(error.code === 11000) {
    console.log(error)
    return res.status(400).send(`Duplicates not allowed`)
  }

  const status_code = error.code || 500
  const message = error.message || error
  res.status(status_code).send(message)
  console.log(error)
}
