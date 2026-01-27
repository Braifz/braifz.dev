import { useMDXComponent } from "@content-collections/mdx/react";
import type { MDXComponents } from "mdx/types";
import { cn } from "./src/lib/utils";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import slugify from "slugify";

interface Props {
  children: string;
  lang: BundledLanguage;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "night-owl",
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      id={slugify(props.children as string, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      })}
      className={cn(
        "mt-2 text-4xl font-bold tracking-tight scroll-m-20",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      id={slugify(props.children as string, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      })}
      className={cn(
        "pb-1 mt-10 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      id={slugify(props.children as string, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      })}
      className={cn(
        "mt-8 text-2xl font-semibold tracking-tight scroll-m-20",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 text-xl font-semibold tracking-tight scroll-m-20",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mt-8 text-lg font-semibold tracking-tight scroll-m-20",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mt-8 text-base font-semibold tracking-tight scroll-m-20",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7  not-first:mt-6 tracking-wider", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 text-xl italic border-primary/30 font-bold font-serif",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-y-auto my-6 w-full">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("p-0 m-0 border-t even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(children.props.className || "");
    const language = match ? match[1] : "text";

    return (
      <CodeBlock lang={language as BundledLanguage}>
        {children.props.children}
      </CodeBlock>
    );
  },
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
};

export function useMDXComponents(mdxComponents: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
