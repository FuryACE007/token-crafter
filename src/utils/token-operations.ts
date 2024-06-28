import {
  createFungible,
  fetchAllDigitalAssetByOwner,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Umi,
  createGenericFileFromBrowserFile,
  generateSigner,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import toast from "react-hot-toast";

export const createTokenService = async (
  umi: Umi,
  tokenName: string,
  tokenSymbol: string,
  tokenDescription: string,
  tokenImage: File
) => {
  const mint = generateSigner(umi);
  const imageFile = await createGenericFileFromBrowserFile(tokenImage, {
    contentType: "image/png",
  });
  const [fileUri] = await umi.uploader.upload([imageFile]);
  toast.success("Image uploaded!");
  const tokenMetadata = {
    name: tokenName,
    symbol: tokenSymbol,
    description: tokenDescription,
    image: fileUri,
  };
  const uri = await umi.uploader.uploadJson([tokenMetadata]);
  toast.success("Metadata uploaded!");

  createFungible(umi, {
    mint,
    name: tokenName,
    symbol: tokenSymbol,
    uri,
    // payer: the gas sponsor wallet
    sellerFeeBasisPoints: percentAmount(0),
    isMutable: true,
    isCollection: false,
    authority: umi.identity, // the address which is allowed to mint the tokens
    decimals: 3, // the divisibility of the fungible token
  })
    .sendAndConfirm(umi)
    .then(() => {
      console.log(
        tokenMetadata.name + "created successfully: ",
        mint.publicKey
      );
      toast.success("🦄 Token created successfully!");
    });
};
export const checkSolBalance = async () => {};
export const mintTokenHandler = async () => {};

export const getTokensOwned = async (walletAddress: string, umi: Umi) => {
  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_ENDPOINT!,
    "confirmed"
  );
  const assets = await fetchAllDigitalAssetByOwner(
    umi,
    publicKey(walletAddress)
  );
  if (assets.length < 0) throw new Error("No assets found");

  const tokenDataPromises = assets.map(async (asset) => {
    const pub = new PublicKey(asset.publicKey);

    const tokenAccount = await getAssociatedTokenAddress(
      pub,
      new PublicKey(walletAddress)
    );

    let balance = await connection.getTokenAccountBalance(tokenAccount);
    let balanceValue = 0;
    if (balance.value.uiAmount) balanceValue = balance.value.uiAmount;

    try {
      // const metadataResponse = await axios.get(asset.metadata.uri);
      // const metadata = metadataResponse.data;

      const result = {
        name: asset.metadata.name,
        symbol: asset.metadata.symbol,
        // metadata,
        balance: balanceValue,
        mintAddress: asset.mint.publicKey,
      };

      return result;
    } catch (error) {
      throw new Error(
        typeof error === "string" ? error : "An unknown error occurred"
      );
    }
  });
  const tokenData = await Promise.all(tokenDataPromises);

  return JSON.stringify(tokenData);
};
export const sendTokensHandler = async () => {};
