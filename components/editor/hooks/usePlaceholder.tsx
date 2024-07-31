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
    if (editor?.getValue()) {
      hidePlaceholder();
    } else {
      showPlaceholder(editor?.getValue() ?? "");
    }
    const didChangeModel = editor?.onDidChangeModel(() => {
      if (editor?.getValue()) {
        hidePlaceholder();
      }
    });
    return () => {
      didChangeModel?.dispose();
    };
  }, [editor, editor?.getValue()]);
  return placeholderRef;
};

export default usePlaceholder;
