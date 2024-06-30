"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect } from "wagmi";

const GRADIENT_BORDER_WIDTH = 2;
interface GradientProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  isAnimationDisabled?: boolean;
}

function Gradient({
  children,
  style,
  isAnimationDisabled = false,
}: GradientProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter}>
      <div
        className="gradient-background absolute inset-0"
        style={gradientStyle}
      />
      {children}
    </div>
  );
}

export function CoinbaseWalletButton({ height = 60, width = 200 }) {
  const { connectors, connect } = useConnect();

  const minButtonHeight = 44;
  const minButtonWidth = 200;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK",
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <button
      className="relative flex items-center justify-center overflow-hidden rounded-full border-none bg-black"
      style={{ height: buttonHeight, width: buttonWidth }}
      onClick={createWallet}
    >
      <Gradient
        style={{
          background:
            "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
          top: -buttonHeight - GRADIENT_BORDER_WIDTH,
          left: -GRADIENT_BORDER_WIDTH,
          width: gradientDiameter,
          height: gradientDiameter,
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-full bg-black text-lg font-bold"
          style={{
            height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
            width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
          }}
        >
          <CoinbaseWalletLogo />
          Create Wallet
        </div>
      </Gradient>
    </button>
  );
}

const defaultContainerStyles = {
  paddingTop: 2,
};

export function CoinbaseWalletLogo({
  size = 26,
  containerStyles = defaultContainerStyles,
}) {
  return (
    <div className="pr-4">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.66675 15.9998C2.66675 23.3628 8.63712 29.3332 16.0001 29.3332C23.363 29.3332 29.3334 23.3628 29.3334 15.9998C29.3334 8.63687 23.363 2.6665 16.0001 2.6665C8.63712 2.6665 2.66675 8.63687 2.66675 15.9998ZM12.5927 11.7035H19.4075C19.9001 11.7035 20.2964 12.0998 20.2964 12.5924V19.4072C20.2964 19.8998 19.9001 20.2961 19.4075 20.2961H12.5927C12.1001 20.2961 11.7038 19.8998 11.7038 19.4072V12.5924C11.7038 12.0998 12.1001 11.7035 12.5927 11.7035Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
