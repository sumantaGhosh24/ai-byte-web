import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import MDEditor from "@uiw/react-md-editor";

interface MakrdownPreviewProps {
  content: string;
}

const MarkdownPreview = ({ content }: MakrdownPreviewProps) => {
  return (
    <div data-color-mode="dark">
      <MDEditor.Markdown
        source={content}
        style={{
          background: "transparent",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
};

export default MarkdownPreview;
