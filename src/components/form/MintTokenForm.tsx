import { cn } from "@/utils/cn";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FileUpload from "./FileUpload";

const Form = () => {
  const mintTokenHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Token Minted!", {
      icon: "🚀🚀",
      position: "top-center",
    });
  };

  return (
    <div className=" glass-form max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        <span className=" text-xl font-extrabold">
          Mint<span className=" text-[#CD1818] mx-1">Token 🔨</span>
        </span>
      </h2>
      <form className="my-8" onSubmit={mintTokenHandler}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="tokenName">Token Name</Label>
            <Input
              id="tokenName"
              placeholder="TokenCrafters"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="tokenSymbol">Token Symbol</Label>
            <Input id="tokenSymbol" placeholder="TCX" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="tokenDescription">Token Description</Label>
          <Input
            id="tokenDescription"
            placeholder="Some info about the token ( optional )"
            type="text"
          />
        </LabelInputContainer>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 my-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="tokenImage">
              Token Image
            </Label>
            <FileUpload />
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

export default Form;
