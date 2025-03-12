const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");
const Mailgen = require("mailgen");
// SEND MAIL FROM TESTING ACCOUNT
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Sucessfully Register with Us", // plain text body
    html: "<b>Sucessfully Register with Us</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should received an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
  //   res.status(201).json("Signup Successfully");
};

// SEND MAIL FROM REAL GMAIL ACCOUNT
const getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "XYZ",
      intro: "Your bill has arrived",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend Application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "you should receive an email",
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
//   res.status(201).json("getBill Successfully");
};

module.exports = {
  signup,
  getbill,
};
