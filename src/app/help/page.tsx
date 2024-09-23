"use server";

import Link from "next/link";

export default async function Help() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* <h1 className={`text-5xl font-bold`}>
        A place to <i className="">dump</i> your thoughts.
      </h1> */}
      <Link href="/">Home</Link>
    </div>
  );
}
