import { cn } from "@/utils/cn";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FileUpload from "./FileUpload";

const Form = () => {
  const createTokenHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className=" glass-form max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Greetings{" "}
        <span className=" text-xl font-extrabold">
          Token<span className=" text-[#CD1818] mx-1">Crafters 🔨</span>
        </span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Launch and distribute your tokens on Solana without writing a single
        line of code !
      </p>
      <form className="my-8" onSubmit={createTokenHandler}>
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
            <Label htmlFor="tokenImage">Token Image</Label>
            <FileUpload />
          </LabelInputContainer>
        </div>
      </form>
    </div>
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
