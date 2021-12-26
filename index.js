const {
  Connection,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const newAddress = new Keypair();

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// console.log("PUBLICKEY", newAddress.publicKey.toString());
// console.log("SECRETKEY", newAddress.secretKey.toString());

const airdrop = async () => {
  try {
    const sig = await connection.requestAirdrop(
      new PublicKey(newAddress.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(sig);
  } catch (error) {
    console.log("ERROR", error);
  }
};

const getBalance = async () => {
  try {
    const address = new PublicKey(newAddress.publicKey.toString());
    const bal = await connection.getBalance(address);
    console.log(bal);
  } catch (error) {
    console.log("ERROR", error);
  }
};

const main = async () => {
  await getBalance();
  await airdrop();
  await getBalance();
};

main();
