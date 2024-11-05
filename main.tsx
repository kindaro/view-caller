import React from "react";
import { eth } from "web3";
import { createRoot } from "react-dom/client";

async function checkBalance({ contract, account }) {
  const input = eth.abi.encodeFunctionCall(
    {
      name: "balanceOf",
      type: "function",
      stateMutability: "view",
      inputs: [{ type: "address", name: "account" }],
    },
    [account],
  );
  const link = new URL("rpc-mainnet/public", "https://api.noderpc.xyz");
  const body = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_call",
    params: [
      {
        to: contract,
        input: input,
      },
      "latest",
    ],
    id: 1,
  });
  return (
    await fetch(link, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}

function Main() {
  const [model, setModel] = React.useState({ contract: null, answer: null });
  const [fluff, setFluff] = React.useState({
    contract: "0x4d224452801aced8b2f0aebe155379bb5d594381",
    account: "0x6fdc859bfad3bc680647c8c58530faa039e1fc03",
  });

  return (
    <div className="container">
      <header>
        <h1 className="display-1">view caller</h1>
      </header>
      <main>
        <section>
          <h2>view call settings</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="account" className="form-label">
                account
              </label>
              <input
                type="text"
                className="form-control"
                id="account"
                value={fluff.account}
                onChange={(event) => {
                  setFluff({ ...fluff, account: event.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contract" className="form-label">
                contract
              </label>
              <input
                type="text"
                className="form-control"
                id="contract"
                value={fluff.contract}
                onChange={(event) => {
                  setFluff({ ...fluff, contract: event.target.value });
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                checkBalance({
                  contract: fluff.contract,
                  account: fluff.account,
                }).then((answer) => setModel({ ...model, answer: answer }));
              }}
            >
              check balance
            </button>
          </form>
        </section>
        <section>
          <h2>view call answer</h2>
          <p>
            {JSON.stringify(
              model.answer ? Number(model.answer.result) : "pending…",
            )}
          </p>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
console.log("root", root);
root.render(<Main />);
console.log("done");
