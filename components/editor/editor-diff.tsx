import React, {
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as monaco from "monaco-editor";
import ThemeContext, {
  getThemeClassName,
} from "@/components/context/ThemeContext";

interface EditorDiffProps extends HTMLAttributes<HTMLDivElement> {
  original: string;
  modified: string;
  language: string;
  options?: monaco.editor.IStandaloneDiffEditorConstructionOptions;
}

monaco.editor.defineTheme("dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#20293a",
  },
});

monaco.editor.defineTheme("light", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ffffff",
  },
});

const EditorDiff: React.FC<EditorDiffProps> = (props) => {
  const { options = {}, original, modified, language, ...attrs } = props;
  const [editor, setEditor] = useState<monaco.editor.IStandaloneDiffEditor>();
  const monacoEl = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (monacoEl) {
      setEditor((e) => {
        if (e) return e;
        return monaco.editor.createDiffEditor(monacoEl.current!, {
          originalEditable: true,
          automaticLayout: true,
          renderSideBySideInlineBreakpoint: 480,
          minimap: {
            enabled: false,
          },
        });
      });
    }
    return () => editor?.dispose();
  }, []);

  useEffect(() => {
    const originalModel = monaco.editor.createModel(original, language);
    const modifiedModel = monaco.editor.createModel(modified, language);
    if (editor) {
      editor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });
    }
  }, [editor, original, modified, language]);

  useEffect(() => {
    monaco.editor.setTheme(getThemeClassName(theme));
  }, [theme]);

  useEffect(() => {
    editor?.updateOptions(options);
  }, [options]);

  return <div className="w-full h-[500px]" ref={monacoEl} {...attrs}></div>;
};

export default EditorDiff;
