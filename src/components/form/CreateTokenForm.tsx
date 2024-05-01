import { cn } from "@/utils/cn";
import type { Umi } from "@metaplex-foundation/umi";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createTokenService } from "@/utils/token-operations";

interface CreateTokenFormProps {
  umi: Umi;
}

const CreateTokenForm: React.FC<CreateTokenFormProps> = ({ umi }) => {
  const tokenNameRef = useRef<HTMLInputElement | null>(null);
  const tokenSymbolRef = useRef<HTMLInputElement | null>(null);
  const tokenDescriptionRef = useRef<HTMLInputElement | null>(null);
  const tokenImageRef = useRef<HTMLInputElement | null>(null);

  const createTokenHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tokenName = tokenNameRef.current?.value || "";
    const tokenSymbol = tokenSymbolRef.current?.value || "";
    const tokenDescription = tokenDescriptionRef.current?.value || "";
    const tokenImage = tokenImageRef.current?.files?.[0];

    if (tokenImage) {
      createTokenService(
        umi,
        tokenName,
        tokenSymbol,
        tokenDescription,
        tokenImage
      );

      // toast.success("Token Created!", {
      //   icon: "🚀🚀",
      //   position: "top-center",
      // });
    } else {
      toast.error("Token Image Missing!");
    }
  };

  return (
    <div className=" glass-form max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        <span className=" text-xl font-extrabold">
          Craft<span className=" text-[#CD1818] mx-1">Token 🔨</span>
        </span>
      </h2>
      <form className="my-8" onSubmit={createTokenHandler}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="tokenName">Token Name</Label>
            <Input
              id="tokenName"
              placeholder="TokenCrafters"
              type="text"
              ref={tokenNameRef}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="tokenSymbol">Token Symbol</Label>
            <Input
              id="tokenSymbol"
              placeholder="TCX"
              type="text"
              ref={tokenSymbolRef}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="tokenDescription">Token Description</Label>
          <Input
            id="tokenDescription"
            placeholder="Some info about the token ( optional )"
            type="text"
            ref={tokenDescriptionRef}
          />
        </LabelInputContainer>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 my-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="tokenImage">
              Token Image
            </Label>
            <div className="relative">
              <label
                title="Click to upload"
                htmlFor="button2"
                className="cursor-pointer flex items-center gap-4 px-3 py-2 before:border-gray-600 group before:bg-transparent  before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
              >
                <div className=" w-max relative">
                  <img
                    className="w-10"
                    src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                    alt="file upload icon"
                    width="512"
                    height="512"
                  />
                </div>
                <div className="relative">
                  <span className="text-sm font-semibold relative text-blue-900 group-hover:text-blue-500">
                    Upload image
                  </span>
                  <span className="mt-0.5 block text-sm text-gray-500">
                    Max 2 MB
                  </span>
                </div>
              </label>
              <input
                hidden
                type="file"
                name="button2"
                id="button2"
                ref={tokenImageRef}
              />
            </div>
          </LabelInputContainer>
        </div>

        <button
          className="mt-10 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Craft 🛠️
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default CreateTokenForm;
