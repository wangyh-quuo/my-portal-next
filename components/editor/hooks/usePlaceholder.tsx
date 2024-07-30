import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

const usePlaceholder = (
  editor: monaco.editor.IStandaloneCodeEditor | undefined
) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  function showPlaceholder(value: string) {
    if (placeholderRef.current && value === "") {
      placeholderRef.current.style.display = "initial";
    }
  }

  function hidePlaceholder() {
    if (placeholderRef.current) {
      placeholderRef.current.style.display = "none";
    }
  }
  
  useEffect(() => {
    showPlaceholder(editor?.getValue() ?? "");
    const blurEditorWidget = editor?.onDidBlurEditorWidget(() => {
      showPlaceholder(editor.getValue());
    });

    const focusEditorWidget = editor?.onDidFocusEditorWidget(() => {
      hidePlaceholder();
    });
    return () => {
      blurEditorWidget?.dispose();
      focusEditorWidget?.dispose();
    };
  }, [editor]);
  return placeholderRef;
};

export default usePlaceholder;
