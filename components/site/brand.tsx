import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Technovata home">
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src="/brand/logo.png"
          alt=""
          width={80}
          height={80}
          className="brand-symbol-image"
        />
      </span>
      <span>Technovata</span>
    </Link>
  );
}
