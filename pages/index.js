import Link from "next/link";
import { frontMatter as introData } from "./docs/intro.mdx";
import { frontMatter as advancedData } from "./docs/advanced.mdx";

export default function DocsPage() {
  const docsPages = [introData, advancedData];

  return (
    <>
      <h1>Docs Index</h1>
      <ul>
        {docsPages.map((page) => (
          <li key={page.__resourcePath}>
            <Link href={formatPath(page.__resourcePath)}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function formatPath(p) {
  return p.replace(/\.mdx$/, "");
}
