import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  description?: string;
}

const Markdown = ({ description = '' }: MarkdownProps) => (
  <div className="h-full overflow-auto">
    <article className="prose prose-sm h-full max-w-[800px] p-4">
      <ReactMarkdown
        components={{
          a: ({ children, href }) => (
            <a target="_blank" rel="noreferrer" href={href}>
              {children}
            </a>
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </article>
  </div>
);

export default Markdown;
