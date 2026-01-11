import { Badge } from "@/src/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrum";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { allBlogs } from "content-collections";
import { SlashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

// TODO: Add Metadata to the page
export default function BlogPage() {
  const principalPost = allBlogs.find((post) => post.principal);

  console.log(allBlogs);

  console.log(principalPost);

  return (
    <main className="p-4">
      {/* // TODO: Move this component to another place and make it reusable */}
      {/* <BackgroundRippleEffect rows={17} /> */}
      <div className="h-10 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex gap-2 mt-6 mb-6 border-b-2 pb-3">
        <h1 className="text-3xl lg:text-8xl font-bold italic">Blog</h1>
        <p className="text-sm text-muted-foreground">(12)</p>
      </div>

      <div className="lg:flex gap-6 mb-10">
        {/* // TODO: Move this logic to PrincipalPost component */}
        <div className="w-2/3 mt-10 border-r-2 pr-14">
          {principalPost && (
            <Link
              href={`/blog/${principalPost.slug}`}
              className="w-56 cursor-default space-y-3"
            >
              {/* <p className="text-secondary">{principalPost.category}</p> */}
              <ViewTransition
                key={`title-${principalPost.slug}`}
                name={`title-${principalPost.slug}`}
                enter="test"
                exit="test2"
              >
                <h2
                  className="text-5xl font-bold border-b-2 pb-4"
                  key={principalPost.slug}
                >
                  {principalPost.title}
                </h2>
              </ViewTransition>

              <ViewTransition
                key={`readingTime-${principalPost.slug}`}
                name={`readingTime-${principalPost.slug}`}
              >
                <div className="flex gap-2 text-muted-foreground">
                  <p>{principalPost.readingTime}</p>
                  <p>·</p>
                  <p>{principalPost.date}</p>
                </div>
              </ViewTransition>

              <ViewTransition
                key={`image-${principalPost.slug}`}
                name={`image-${principalPost.slug}`}
              >
                <Image
                  src={principalPost.image}
                  alt={principalPost.title}
                  width={720}
                  height={305}
                  className="w-full h-[350px] transition-colors bg-muted border-none object-cover rounded-xs"
                  priority
                />
              </ViewTransition>
              <p className="text-lg line-clamp-3">{principalPost.summary}</p>

              <Button
                // href={`/blog/${principalPost.slug}`}
                variant={"link"}
                className="cursor-pointer rounded-none pl-0 "
              >
                Leer el articulo completo
              </Button>
            </Link>
          )}
        </div>

        <div className="w-1/3 h-[600px] flex items-center flex-col justify-center">
          <div className="w-[400px] p-4">
            <p className="text-2xl"> Hola 👋,</p>
            {/* <p className="text-2xl font-bold">Soy Braifz</p> */}

            <p className="text-lg">
              ¡Bienvenido/a a mi blog! Donde escribo sobre lo que pienso, lo que
              me gusta y donde hablo de lasc cosas que me gusta compartir. lo
              que me gusta y donde hablo de lasc cosas que me gusta compartir
            </p>

            <div className="flex space-x-10 pt-4 justify-center mt-4">
              <Link
                href="https://linkedin.com/in/braifz"
                target="_blank"
                className="bg-white rounded-full p-2 hover:scale-110 transition-all"
              >
                <Image
                  src="/logos/linkedin.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="cursor-pointer "
                />
              </Link>
              <Link
                href="https://github.com/braifz"
                target="_blank"
                className="bg-white rounded-full p-2 hover:scale-110 transition-all"
              >
                <Image
                  src="/logos/github.svg"
                  alt="GitHub"
                  width={16}
                  height={16}
                />
              </Link>
              <Link
                href="https://x.com/braifz"
                target="_blank"
                className="bg-white rounded-full p-2 hover:scale-110 transition-all"
              >
                <Image src="/logos/x.svg" alt="X" width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-4xl font-bold border-b border-foreground pb-4 text-muted-foreground text-end italic">
          ↘ Todos los Articulos ↘
        </h2>
        <Table>
          <TableHeader>
            <TableRow></TableRow>
          </TableHeader>
          <TableBody className="*:h-25">
            {allBlogs.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="font-bold text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full h-full"
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full h-full"
                  >
                    <Badge variant="outline">{post.category}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full h-full"
                  >
                    {post.date}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
