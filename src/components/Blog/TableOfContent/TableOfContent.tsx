import { Blog } from "@/.content-collections/generated";

const TableOfContent = ({ post }: { post: Blog }) => {
  return (
    <aside className="w-1/3 hidden lg:block mb-16 mt-10">
      <div className="sticky top-10">
        <h3 className="font-semibold text-lg mb-4 tracking-widest">
          Tabla de Contenido
        </h3>
        <nav className="space-y-2">
          {post.toc.map((item) => (
            <div key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.title}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContent;
