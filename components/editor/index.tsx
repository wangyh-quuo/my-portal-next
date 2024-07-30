import React, {
  type HTMLAttributes,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as monaco from "monaco-editor";
import ThemeContext, {
  getThemeClassName,
} from "@/components/context/ThemeContext";
import placeholderStyle from "./placeholder.module.scss";
import usePlaceholder from "./hooks/usePlaceholder";

interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  language: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onValueChange?: (value: string) => void;
  placeholder: string;
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

const Editor: React.FC<EditorProps> = (props) => {
  const {
    options = {},
    value,
    language,
    onValueChange,
    placeholder,
    ...attrs
  } = props;
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const monacoEl = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (monacoEl) {
      setEditor((e) => {
        if (e) return e;
        return monaco.editor.create(monacoEl.current!, {
          tabSize: 2,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        });
      });
    }
    return () => editor?.dispose();
  }, []);

  useEffect(() => {
    const textModel = monaco.editor.createModel(value, language);
    if (editor) {
      editor.setModel(textModel);
    }
  }, [editor, value, language]);

  useLayoutEffect(() => {
    const changeMarkers = monaco.editor?.onDidChangeMarkers((e) => {
      const markers = monaco.editor.getModelMarkers({
        resource: editor?.getModel()?.uri,
      });
    });
    const changeModelContent = editor?.onDidChangeModelContent((e) => {
      onValueChange?.(editor.getValue());
    });
    return () => {
      changeMarkers.dispose();
      changeModelContent?.dispose();
    };
  }, [editor, onValueChange]);

  useEffect(() => {
    monaco.editor.setTheme(getThemeClassName(theme));
  }, [theme]);

  useEffect(() => {
    editor?.updateOptions(options);
  }, [options]);

  const placeholderRef = usePlaceholder(editor);

  return (
    <div className="relative w-full h-[500px]" ref={monacoEl} {...attrs}>
      <div
        ref={placeholderRef}
        className={placeholderStyle["monaco-placeholder"]}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default Editor;
