export const contactUs = (req, res) => {
  const { email, fullName, msg } = req.body;
  console.log(email, fullName, msg);

  if (!email || !fullName || !msg) {
    return res.status(400).json({
      error: `Invalid request. Missing required properties: ${
        !email ? "email" : !fullName ? "fullname" : !msg ? "msg" : ""
      }`,
      msgSent: false,
    });
  }

  //prolly have a function that sends the message to truetalk email
  res.status(201).json({
    msg: "Valid request. Message was received and has be sent to truetalk email.",
    msgSent: true,
  });
};
