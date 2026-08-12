import { BiEdit } from "react-icons/bi";
import Image from "next/image";

export default function Avatar() {
  return (
    <div className="relative w-20 h-20 md:w-40 md:h-40 mx-auto">
      {/* Avatar Image */}
      <Image
        src="/images/avatar.jpg"
        className="rounded-full object-cover"
        alt="avatar"
        fill
        sizes="(max-width: 768px) 80px, 160px"
      />

      {/* Edit Icon Button */}
      <button
        className="absolute -bottom-2 -left-2 lg:bottom-1 lg:left-1 bg-amber-500 text-white p-1.5 rounded-full border-4 border-white flex items-center justify-center hover:bg-amber-600 transition-colors"
        aria-label="Edit avatar"
      >
        <BiEdit className=" w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
}
