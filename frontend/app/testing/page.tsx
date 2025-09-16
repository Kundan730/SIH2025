"use client";

import { useState } from "react";
import { ethers } from "ethers";
import abi from "@/abi/CarbonRegistory.json";

export default function Home() {
  const [status, setStatus] = useState<string>("");

  // contract setup
  const contractAddress = "0x0C6E8Cd6C78278CcA0f69F0F185b4E5d4B7789BE";

  const getContract = async () => {
    if (!window.ethereum) throw new Error("No wallet found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  const registerProject = async () => {
    try {
      setStatus("Registering project...");
      const contract = await getContract();
      const tx = await contract.registerProject(
        100, // credits
        "12.9716N,77.5946E",
        "NGO-123",
        Math.floor(Date.now() / 1000),
        10 // area
      );
      await tx.wait();
      setStatus("✅ Project registered & tokens minted");
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  };

  // 2. Register Project & log emitted event
  const registerWithEvent = async () => {
    try {
      setStatus("Registering (event check)...");
      const contract = await getContract();

      const tx = await contract.registerProject(
        100,
        "12.9716N,77.5946E",
        "NGO-123",
        Math.floor(Date.now() / 1000),
        10
      );

      const receipt = await tx.wait();
      console.log("Event logs:", receipt.logs);
      setStatus("✅ Project registered & event emitted (check console)");
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  };

  // 3. Fail case (Register with 0 credits)
  const failRegister = async () => {
    try {
      setStatus("Trying to register with 0 credits...");
      const contract = await getContract();

      const tx = await contract.registerProject(
        0, // invalid
        "12.9716N,77.5946E",
        "NGO-123",
        Math.floor(Date.now() / 1000),
        10
      );

      await tx.wait();
      setStatus("❌ Unexpected success (should have failed)");
    } catch (err: any) {
      setStatus("✅ Correctly reverted: " + err.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Carbon Registry Actions</h1>

      <button
        onClick={registerProject}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        1️⃣ Register Project
      </button>

      <button
        onClick={registerWithEvent}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        2️⃣ Register & Check Event
      </button>

      <button
        onClick={failRegister}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        3️⃣ Fail Register (0 credits)
      </button>

      <p className="mt-4 text-gray-700">Status: {status}</p>
    </div>
  );
}
