"use client";
import React from "react";
import { AmountInput } from "./AmountInput";
import { type CURRENCY } from "../dashboard";
import {
  ArbitrumUSDCTokenAddress,
  ArbitrumUSDCVault,
  ArbitrumUSDCYieldToken,
} from "@/constants/Addresses";
import { useWriteContracts } from "wagmi/experimental";
import { erc20Abi, http, parseAbi } from "viem";
import { useAccount, useClient } from "wagmi";
import { createMemoryClient } from "tevm";
import { arbitrum } from "viem/chains";
const alchemixVaultABI = parseAbi([
  "function depositUnderlying(address, uint256, address, uint256) returns (uint256)",
]);

const Deposit = ({ currency }: { currency: CURRENCY }) => {
  const { writeContractsAsync, isPending } = useWriteContracts();
  const { address } = useAccount();

  const handleDeposit = async (amount: string) => {
    try {
      const amountBigInt = BigInt(parseFloat(amount) * 10 ** 6);
      const minOut = ((parseFloat(amount) * 10) / 100) * 10e5;
      const minOutBigInt = BigInt(minOut);
      console.log("🚀 ~ handleDeposit ~ minOutBigInt:", minOutBigInt);
      console.log("🚀 ~ handleDeposit ~ address: " + "<my address>");
      console.log("🚀 ~ handleDeposit ~ amountBigInt:", amountBigInt);
      console.log(
        "🚀 ~ handleDeposit ~ ArbitrumUSDCYieldToken:",
        ArbitrumUSDCYieldToken,
      );
      const res = await writeContractsAsync({
        contracts: [
          {
            address: ArbitrumUSDCTokenAddress,
            abi: erc20Abi,
            functionName: "approve",
            args: [ArbitrumUSDCVault, amountBigInt * 10n],
          },
          {
            address: ArbitrumUSDCVault,
            abi: alchemixVaultABI,
            functionName: "depositUnderlying",
            args: [ArbitrumUSDCYieldToken, amountBigInt, address, minOutBigInt],
          },
        ],
      });

      console.log("Deposit successful with result:", res);
    } catch (error) {
      console.error("Deposit failed with error:", error);
    }
  };

  return (
    <div>
      <AmountInput
        disabled={isPending}
        onSubmit={handleDeposit}
        currency={currency}
        buttonText="Deposit"
      />
    </div>
  );
};

export default Deposit;
// {"request":{"transaction":
//     {"nonce":
//         "0x2",
//         "sender":"0x8f86831f0b471f21e32f6abf95983ebc17d95719",
//         "initCode":"0x",
//         "callData":"0x34fcd5be000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000b46ee2e4165f629b4abce04b7eb4237f951ac66f000000000000000000000000000000000000000000000000000001d1a94a200000000000000000000000000000000000000000000000000000000000",
//         "maxPriorityFeePerGas":"0x0",
//         "maxFeePerGas":"0xe2afffe",
//         "paymasterAndData":"0x",
//         "preVerificationGas":"0x8a6e2",
//         "verificationGasLimit":"0x88f89",
//         "callGasLimit":"0x721c",
//         "additionalParameters":
//         {"baseFeePerGas":"0x989680"}},
//         "dappURL":"http://localhost:3000"},
//         "result":{"notices":[{"level":"INFO",
//             "i18nKey":"",
//             "localizedMessage":"",
//             "sourceCoordinate":"SOURCE_COORDINATE_UNKNOWN",
//             "sourceCoordinateIndex":0,
//             "noticeType":"NOTICE_TYPE_6"}],
//         "decodedTx":{"blockchain":"BLOCKCHAIN_ARBITRUM",
//             "operations":[{"operationType":"BALANCE_APPROVAL",
//             "balanceApproval":{"fromAddress":"0x8f86831f0B471F21e32f6abF95983EbC17d95719",
//             "spenderAddress":"0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F",
//             "amount":{"currency":{"currencyType":"TOKEN",
//             "symbol":"USDC",
//             "contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
//             "decimals":6,
//             "attributes":[],
//             "name":"",
//             "images":[]},
//         "value":"2000000000000",
//         "attributes":[]},
//         "allowance":{"currency":{"currencyType":"TOKEN",
//             "symbol":"USDC",
//             "contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
//             "decimals":6,
//             "attributes":[],
//             "name":"",
//             "images":[]},
//         "value":"1000000000000",
//         "attributes":[]},
//         "currentBalance":{"currency":{"currencyType":"TOKEN",
//             "symbol":"USDC",
//             "contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
//             "decimals":6,
//             "attributes":[],
//             "name":"",
//             "images":[]},
//         "value":"3000000",
//         "attributes":[]},
//         "isSpenderAddressEoa":false,
//         "expiry":null},
//         "validity":null,
//         "attributes":[]}],
//         "addresses":[{"address":"0x8f86831f0B471F21e32f6abF95983EbC17d95719",
//             "attributes":[]}],
//         "contracts":[{"address":"0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F",
//             "proxyTo":null,
//             "deployedInBlock":"0",
//             "code":"",
//             "attributes":[]},
//         {"address":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
//             "proxyTo":{"address":"0x86E721b43d4ECFa71119Dd38c0f938A75Fdb57B3",
//             "proxyTo":null,
//             "deployedInBlock":"0",
//             "code":"",
//             "attributes":[]},
//         "deployedInBlock":"0",
//         "code":"",
//         "attributes":[]}],
//         "hints":[],
//         "raw":"eyJub25jZSI6IjB4MiIsInNlbmRlciI6IjB4OGY4NjgzMWYwYjQ3MWYyMWUzMmY2YWJmOTU5ODNlYmMxN2Q5NTcxOSIsImluaXRDb2RlIjoiMHgiLCJjYWxsRGF0YSI6IjB4MzRmY2Q1YmUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBhZjg4ZDA2NWU3N2M4Y2MyMjM5MzI3YzVlZGIzYTQzMjI2OGU1ODMxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDQ0MDk1ZWE3YjMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBiNDZlZTJlNDE2NWY2MjliNGFiY2UwNGI3ZWI0MjM3Zjk1MWFjNjZmMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxZDFhOTRhMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwibWF4UHJpb3JpdHlGZWVQZXJHYXMiOiIweDAiLCJtYXhGZWVQZXJHYXMiOiIweGUyYWZmZmUiLCJwYXltYXN0ZXJBbmREYXRhIjoiMHgiLCJwcmVWZXJpZmljYXRpb25HYXMiOiIweDhhNmUyIiwidmVyaWZpY2F0aW9uR2FzTGltaXQiOiIweDg4Zjg5IiwiY2FsbEdhc0xpbWl0IjoiMHg3MjFjIiwiYWRkaXRpb25hbFBhcmFtZXRlcnMiOnsiYmFzZUZlZVBlckdhcyI6IjB4OTg5NjgwIn19",
//         "from":"0x8f86831f0b471f21e32f6abf95983ebc17d95719",
// "overriddenBlockheight":"",
// "domain":"http://localhost:3000",
// "entrypoint":"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
// "attributes":[]}}}

// {"request":{"transaction":{"nonce":"0x3","sender":"0x8f86831f0b471f21e32f6abf95983ebc17d95719","initCode":"0x","callData":"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000b46ee2e4165f629b4abce04b7eb4237f951ac66f00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000000000000000000000000248a431116c6f6fcd5fe1097d16d0597e24100f5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000b46ee2e4165f629b4abce04b7eb4237f951ac66f00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000","maxPriorityFeePerGas":"0x0","maxFeePerGas":"0x9ba3c0","paymasterAndData":"0x","preVerificationGas":"0x8d897","verificationGasLimit":"0x88f89","callGasLimit":"0xe865","additionalParameters":{"baseFeePerGas":"0x989680"}},"dappURL":"http://localhost:3000"},"result":{"notices":[{"level":"INFO","i18nKey":"","localizedMessage":"","sourceCoordinate":"SOURCE_COORDINATE_UNKNOWN","sourceCoordinateIndex":0,"noticeType":"NOTICE_TYPE_6"}],"decodedTx":{"blockchain":"BLOCKCHAIN_ARBITRUM","operations":[{"operationType":"BALANCE_APPROVAL","balanceApproval":{"fromAddress":"0x8f86831f0B471F21e32f6abF95983EbC17d95719","spenderAddress":"0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F","amount":{"currency":{"currencyType":"TOKEN","symbol":"USDC","contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","decimals":6,"attributes":[],"name":"","images":[]},"value":"1000000","attributes":[]},"allowance":{"currency":{"currencyType":"TOKEN","symbol":"USDC","contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","decimals":6,"attributes":[],"name":"","images":[]},"value":"1000000000000","attributes":[]},"currentBalance":{"currency":{"currencyType":"TOKEN","symbol":"USDC","contractAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","decimals":6,"attributes":[],"name":"","images":[]},"value":"3000000","attributes":[]},"isSpenderAddressEoa":false,"expiry":null},"validity":null,"attributes":[]},{"operationType":"BALANCE_APPROVAL","balanceApproval":{"fromAddress":"0x8f86831f0B471F21e32f6abF95983EbC17d95719","spenderAddress":"0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F","amount":{"currency":{"currencyType":"TOKEN","symbol":"s_aArbUSDC","contractAddress":"0x248a431116c6f6FCD5Fe1097d16d0597E24100f5","decimals":6,"attributes":[],"name":"","images":[]},"value":"1000000","attributes":[]},"allowance":{"currency":{"currencyType":"TOKEN","symbol":"s_aArbUSDC","contractAddress":"0x248a431116c6f6FCD5Fe1097d16d0597E24100f5","decimals":6,"attributes":[],"name":"","images":[]},"value":"0","attributes":[]},"currentBalance":{"currency":{"currencyType":"TOKEN","symbol":"s_aArbUSDC","contractAddress":"0x248a431116c6f6FCD5Fe1097d16d0597E24100f5","decimals":6,"attributes":[],"name":"","images":[]},"value":"0","attributes":[]},"isSpenderAddressEoa":false,"expiry":null},"validity":null,"attributes":[]}],"addresses":[{"address":"0x8f86831f0B471F21e32f6abF95983EbC17d95719","attributes":[]}],"contracts":[{"address":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","proxyTo":{"address":"0x86E721b43d4ECFa71119Dd38c0f938A75Fdb57B3","proxyTo":null,"deployedInBlock":"0","code":"","attributes":[]},"deployedInBlock":"0","code":"","attributes":[]},{"address":"0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F","proxyTo":null,"deployedInBlock":"0","code":"","attributes":[]}],"hints":[],"raw":"eyJub25jZSI6IjB4MyIsInNlbmRlciI6IjB4OGY4NjgzMWYwYjQ3MWYyMWUzMmY2YWJmOTU5ODNlYmMxN2Q5NTcxOSIsImluaXRDb2RlIjoiMHgiLCJjYWxsRGF0YSI6IjB4MzRmY2Q1YmUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYWY4OGQwNjVlNzdjOGNjMjIzOTMyN2M1ZWRiM2E0MzIyNjhlNTgzMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDYwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA0NDA5NWVhN2IzMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYjQ2ZWUyZTQxNjVmNjI5YjRhYmNlMDRiN2ViNDIzN2Y5NTFhYzY2ZjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwZjQyNDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDI0OGE0MzExMTZjNmY2ZmNkNWZlMTA5N2QxNmQwNTk3ZTI0MTAwZjUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA2MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNDQwOTVlYTdiMzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMGI0NmVlMmU0MTY1ZjYyOWI0YWJjZTA0YjdlYjQyMzdmOTUxYWM2NmYwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMGY0MjQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJtYXhQcmlvcml0eUZlZVBlckdhcyI6IjB4MCIsIm1heEZlZVBlckdhcyI6IjB4OWJhM2MwIiwicGF5bWFzdGVyQW5kRGF0YSI6IjB4IiwicHJlVmVyaWZpY2F0aW9uR2FzIjoiMHg4ZDg5NyIsInZlcmlmaWNhdGlvbkdhc0xpbWl0IjoiMHg4OGY4OSIsImNhbGxHYXNMaW1pdCI6IjB4ZTg2NSIsImFkZGl0aW9uYWxQYXJhbWV0ZXJzIjp7ImJhc2VGZWVQZXJHYXMiOiIweDk4OTY4MCJ9fQ==","from":"0x8f86831f0b471f21e32f6abf95983ebc17d95719","overriddenBlockheight":"","domain":"http://localhost:3000","entrypoint":"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789","attributes":[]}}}
