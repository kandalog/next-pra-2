import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>root</p>
      <Link href="/contacts">contactsへ</Link>
    </>
  );
}
