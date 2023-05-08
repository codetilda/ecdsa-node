const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());


// 1 - 4a917afb7bb850a7018d7c4e9e9da449861ab8d7e74b95636a107f8302acea27
// 2 - dc4893d48ba7cb9165f3b965dc2760883fcd21c0c43cea596b0bc7120bac963f
// 3 - 87b522655ce98f42f8822adc6c4faa5735a6c6417d08c3fc4347fc8ed858544b
const balances = {
  "0x0377b590527ccb1781fb7b8e585bc34f6f5b45c7a24b8081d6429e8515fe324e2d": 100,
  "0x0391877a7da29fea0c927de2edea9fc2a97932de4c2a13e5ac56e270a2d8a6425e": 50,
  "0x021128523ff5ef411202d20a15c188bd17489e611534bdc2d1b4fa838a10e0356b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
