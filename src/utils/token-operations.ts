import { createFungible } from "@metaplex-foundation/mpl-token-metadata";
import {
  Umi,
  createGenericFileFromBrowserFile,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
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
export const getTokensOwned = async () => {};
export const sendTokensHandler = async () => {};
