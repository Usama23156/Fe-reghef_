import React from "react";
import { TailSpin } from "react-loader-spinner";

interface LoadingProps {
  height?: number;
  width?: number;
  color?: string;
} 

export default function Loading({ height = 80, width = 80,color = "#E31C2D" }: LoadingProps) {
  return <div className="flex justify-center items-center py-6">
  <TailSpin
  visible={true}
  height={height}
  width={width}
  color={color}
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
/>
</div>
}
