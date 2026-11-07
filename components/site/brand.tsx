import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Technovata home">
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src="/brand/logo-mark-transparent.png"
          alt=""
          width={64}
          height={64}
          sizes="56px"
          className="brand-symbol-image brand-logo-light"
        />
        <Image
          src="/brand/logo-mark-dark.png"
          alt=""
          width={64}
          height={64}
          sizes="56px"
          className="brand-symbol-image brand-logo-dark"
        />
      </span>
      <span className="brand-wordmark">
        Technovata<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
