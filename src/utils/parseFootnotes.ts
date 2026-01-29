export interface Footnote {
  id: number;
  content: string;
}

export interface ParsedContent {
  content: string;
  footnotes: Footnote[];
}

/**
 * Parses footnote syntax [*footnote content] from markdown content
 * Returns modified content with {{FN:n}} placeholders and extracted footnotes
 */
export function parseFootnotes(content: string): ParsedContent {
  const footnotes: Footnote[] = [];
  let footnoteIndex = 0;

  // Match [*...] pattern for footnotes
  const footnoteRegex = /\[\*([^\]]+)\]/g;

  const parsedContent = content.replace(footnoteRegex, (_match, footnoteContent) => {
    footnoteIndex++;
    footnotes.push({
      id: footnoteIndex,
      content: footnoteContent.trim(),
    });
    return `{{FN:${footnoteIndex}}}`;
  });

  return {
    content: parsedContent,
    footnotes,
  };
}

/**
 * Converts {{FN:n}} placeholders back to clickable superscript references
 * Used after markdown rendering to inject interactive footnote links
 */
export function renderFootnoteReferences(html: string): string {
  const placeholderRegex = /\{\{FN:(\d+)\}\}/g;

  return html.replace(placeholderRegex, (_match, id) => {
    return `<sup class="footnote-ref" data-footnote-id="${id}">[${id}]</sup>`;
  });
}
