"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AmountInputProps {
  onSubmit: (amount: string) => Promise<void>;
  currency: string;
  buttonText: string;
  disabled?: boolean;
}

export function AmountInput({
  onSubmit,
  currency,
  buttonText,
  disabled,
}: AmountInputProps) {
  const [amount, setAmount] = useState("0");

  const handleOnChange = (val: string) => {
    // only allow numbers, no letters, allow for .
    if (val.match(/^[0-9]*\.?[0-9]*$/)) {
      setAmount(val);
    }
  };

  return (
    <div className="h-full justify-between space-y-2">
      <Input
        type="text"
        value={amount}
        placeholder="Enter amount"
        onChange={(val) => handleOnChange(val.target.value)}
      />
      <Button
        disabled={disabled}
        className="place-self-end"
        onClick={async () => await onSubmit(amount)}
      >
        {buttonText} {currency.toUpperCase()}
      </Button>
    </div>
  );
}
