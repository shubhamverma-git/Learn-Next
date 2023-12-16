import Image from "next/image";
import PasswordGenerator from "./Components/PasswordGenerator";

export default function Home() {
  return (
    <main className="flex justify-center ">
      <PasswordGenerator />
    </main>
  );
}
