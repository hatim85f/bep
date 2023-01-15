const express = require("express");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("Test is wroking");
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  return res.status(200).send(message);
});

// router.put("/", async (req, res) => {
//   try {
//     const users = await User.updateMany(
//       {},
//       {
//         $set: {
//           scheduledPayments: [],
//         },
//       }
//     );

//     return res.status(200).send({ message: "Updated ya Hatoom :*" });
//   } catch (error) {
//     return res.status(500).send({ error: "Error", message: error.message });
//   }
// });

router.put("/", async (req, res) => {
  const users = await User.find();

  for (let data in users) {
    const newPayments = users[data].payments;
    newPayments.completed = false;
    await User.updateMany(
      { _id: users[data]._id },
      {
        $set: {
          payments: newPayments,
        },
      }
    );
  }

  return res.status(200).send("Done");
});

module.exports = router;
