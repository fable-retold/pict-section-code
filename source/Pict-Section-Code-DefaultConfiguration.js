const _DARK_PALETTE = `--pict-code-text: #ABB2BF;
	--pict-code-background: #282C34;
	--pict-code-border: #3E4451;
	--pict-code-caret: #528BFF;
	--pict-code-selection: #3E4451;
	--pict-code-gutter-background: #21252B;
	--pict-code-gutter-text: #636D83;
	--pict-code-keyword: #C678DD;
	--pict-code-string: #98C379;
	--pict-code-number: #D19A66;
	--pict-code-comment: #7F848E;
	--pict-code-operator: #56B6C2;
	--pict-code-punctuation: #ABB2BF;
	--pict-code-function: #61AFEF;
	--pict-code-property: #E06C75;
	--pict-code-tag: #E06C75;
	--pict-code-attrname: #D19A66;
	--pict-code-attrvalue: #98C379;
	--pict-code-builtin: #E5C07B;
	--pict-code-type: #E5C07B;
	--pict-code-variable: #ABB2BF;
	--pict-code-deletion: #E06C75;
	--pict-code-deletion-background: rgba(224, 108, 117, 0.15);
	--pict-code-addition: #98C379;
	--pict-code-addition-background: rgba(152, 195, 121, 0.15);`;

module.exports = (
{
	"RenderOnLoad": true,

	"DefaultRenderable": "CodeEditor-Wrap",
	"DefaultDestinationAddress": "#CodeEditor-Container-Div",

	"Templates":
	[
		{
			"Hash": "CodeEditor-Container",
			"Template": "<!-- CodeEditor-Container Rendering Soon -->"
		}
	],

	"Renderables":
	[
		{
			"RenderableHash": "CodeEditor-Wrap",
			"TemplateHash": "CodeEditor-Container",
			"DestinationAddress": "#CodeEditor-Container-Div"
		}
	],

	"TargetElementAddress": "#CodeEditor-Container-Div",

	// Address in AppData or other Pict address space to read/write code content
	"CodeDataAddress": false,

	// The language for syntax highlighting (e.g. "javascript", "html", "css", "json")
	"Language": "javascript",

	// Whether the editor is read-only
	"ReadOnly": false,

	// Tab character: use tab or spaces
	"Tab": "\t",

	// Whether to indent with the same whitespace as the previous line
	"IndentOn": /[({[]$/,

	// Whether to add a closing bracket/paren/brace
	"MoveToNewLine": /^[)}\]]/,

	// Whether to handle the closing character
	"AddClosing": true,

	// Whether to preserve indentation on new lines
	"CatchTab": true,

	// Whether to show line numbers
	"LineNumbers": true,

	// Default code content if no address is provided
	"DefaultCode": "// Enter your code here\n",

	// CSS for the code editor.
	//
	// Every color/font is wired through pict-provider-theme tokens so apps
	// using pict-provider-theme get themed code editor automatically.  Each
	// var() falls back to a --pict-code-* palette color: One Light by default,
	// One Dark under [data-theme="dark"], .theme-dark, or an OS dark preference
	// (unless the page sets data-theme="light").  A host token still wins in
	// either mode.
	"CSS": `:root
{
	--pict-code-text: #383A42;
	--pict-code-background: #FAFAFA;
	--pict-code-border: #D0D0D0;
	--pict-code-caret: #526FFF;
	--pict-code-selection: #B3D4FC;
	--pict-code-gutter-background: #F5F5F5;
	--pict-code-gutter-text: #999;
	--pict-code-keyword: #A626A4;
	--pict-code-string: #50A14F;
	--pict-code-number: #986801;
	--pict-code-comment: #A0A1A7;
	--pict-code-operator: #0184BC;
	--pict-code-punctuation: #383A42;
	--pict-code-function: #4078F2;
	--pict-code-property: #E45649;
	--pict-code-tag: #E45649;
	--pict-code-attrname: #986801;
	--pict-code-attrvalue: #50A14F;
	--pict-code-builtin: #986801;
	--pict-code-type: #C18401;
	--pict-code-variable: #383A42;
	--pict-code-deletion: #B62828;
	--pict-code-deletion-background: rgba(220, 50, 47, 0.08);
	--pict-code-addition: #2E7A3A;
	--pict-code-addition-background: rgba(80, 161, 79, 0.10);
}
[data-theme="dark"],
.theme-dark
{
	${_DARK_PALETTE}
}
@media (prefers-color-scheme: dark)
{
	:root:not([data-theme="light"])
	{
		${_DARK_PALETTE}
	}
}
.pict-code-editor-wrap
{
	display: flex;
	font-family: var(--theme-typography-family-mono, 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace);
	font-size: 14px;
	line-height: 1.5;
	border: 1px solid var(--theme-color-border-default, var(--pict-code-border));
	border-radius: 4px;
	overflow: hidden;
}
.pict-code-editor-wrap .pict-code-line-numbers
{
	width: 40px;
	min-width: 40px;
	/* padding-top/bottom are stamped at runtime from the editor's
	   computed padding so row 1 of the gutter aligns with row 1 of
	   the code; only horizontal padding is stylesheet-owned. */
	padding: 0;
	text-align: right;
	background: var(--theme-color-editor-linenumber-background, var(--theme-color-background-secondary, var(--pict-code-gutter-background)));
	border-right: 1px solid var(--theme-color-editor-gutter-border, var(--theme-color-border-default, var(--pict-code-border)));
	color: var(--theme-color-editor-linenumber-text, var(--theme-color-text-muted, var(--pict-code-gutter-text)));
	font-size: 13px;
	/* line-height, padding-top, padding-bottom, and font-family are
	   intentionally NOT declared here.  PictSectionCode._syncGutterMetrics()
	   copies them from the editor's computed styles at init and on every
	   editor resize, so the gutter is guaranteed to track the editor.
	   Declaring them in CSS would either be redundant (when matching) or
	   actively wrong (when the editor's metrics diverge — e.g. theme scale
	   changes the editor's font-size).  See codejar-linenumbers for the
	   canonical version of this pattern. */
	user-select: none;
	pointer-events: none;
	box-sizing: border-box;
}
.pict-code-editor-wrap .pict-code-line-numbers span
{
	display: block;
	padding: 0 8px 0 0;
}
.pict-code-editor-wrap .pict-code-editor
{
	margin: 0;
	padding: 10px 10px 10px 8px;
	min-height: 100px;
	flex: 1;
	min-width: 0;
	outline: none;
	tab-size: 4;
	white-space: pre;
	overflow-wrap: normal;
	color: var(--theme-color-text-primary, var(--pict-code-text));
	background: var(--theme-color-background-panel, var(--pict-code-background));
	caret-color: var(--theme-color-brand-primary, var(--pict-code-caret));
	border-radius: 0 4px 4px 0;
}
.pict-code-editor-wrap .pict-code-editor.pict-code-no-line-numbers
{
	padding-left: 10px;
	border-radius: 4px;
}
.pict-code-editor-wrap .pict-code-editor::selection,
.pict-code-editor-wrap .pict-code-editor *::selection
{
	background: var(--theme-color-editor-selection-background, var(--theme-color-selection-background, var(--pict-code-selection)));
}
/* Syntax token colors — each class binds to a Color.Syntax.* token from
   pict-provider-theme, falling back to the --pict-code-* palette above. */
.pict-code-editor-wrap .pict-code-editor .keyword       { color: var(--theme-color-syntax-keyword,     var(--pict-code-keyword)); }
.pict-code-editor-wrap .pict-code-editor .string        { color: var(--theme-color-syntax-string,      var(--pict-code-string)); }
.pict-code-editor-wrap .pict-code-editor .number        { color: var(--theme-color-syntax-number,      var(--pict-code-number)); }
.pict-code-editor-wrap .pict-code-editor .comment       { color: var(--theme-color-syntax-comment,     var(--pict-code-comment)); font-style: italic; }
.pict-code-editor-wrap .pict-code-editor .operator      { color: var(--theme-color-syntax-operator,    var(--pict-code-operator)); }
.pict-code-editor-wrap .pict-code-editor .punctuation   { color: var(--theme-color-syntax-punctuation, var(--pict-code-punctuation)); }
.pict-code-editor-wrap .pict-code-editor .function-name { color: var(--theme-color-syntax-function,    var(--pict-code-function)); }
.pict-code-editor-wrap .pict-code-editor .property      { color: var(--theme-color-syntax-property,    var(--pict-code-property)); }
.pict-code-editor-wrap .pict-code-editor .tag           { color: var(--theme-color-syntax-tag,         var(--pict-code-tag)); }
.pict-code-editor-wrap .pict-code-editor .attr-name     { color: var(--theme-color-syntax-attrname,    var(--pict-code-attrname)); }
.pict-code-editor-wrap .pict-code-editor .attr-value    { color: var(--theme-color-syntax-attrvalue,   var(--pict-code-attrvalue)); }
.pict-code-editor-wrap .pict-code-editor .builtin       { color: var(--theme-color-syntax-builtin,     var(--pict-code-builtin)); }
.pict-code-editor-wrap .pict-code-editor .type          { color: var(--theme-color-syntax-type,        var(--pict-code-type)); }
.pict-code-editor-wrap .pict-code-editor .variable      { color: var(--theme-color-syntax-variable,    var(--pict-code-variable)); }

/* highlight.js class aliases — when host apps render code blocks with
   highlight.js (e.g. markdown previews via CodeJar's hljs integration),
   the output uses .hljs / .hljs-* classes rather than the bare token
   classes pict-section-code emits. Mapping them here lets one stylesheet
   theme both editor surfaces (bare classes) and hljs-rendered surfaces
   without the host needing a separate per-app github.css. Rules are
   intentionally unscoped (no .pict-code-editor-wrap parent) so they
   apply globally wherever hljs paints. */
.hljs                  { color: var(--theme-color-text-primary,         var(--pict-code-text)); background: transparent; }
.hljs-keyword,
.hljs-keyword.hljs-typeof,
.hljs-selector-tag,
.hljs-literal          { color: var(--theme-color-syntax-keyword,       var(--pict-code-keyword)); }
.hljs-string,
.hljs-regexp,
.hljs-template-tag,
.hljs-template-variable { color: var(--theme-color-syntax-string,       var(--pict-code-string)); }
.hljs-number,
.hljs-meta             { color: var(--theme-color-syntax-number,        var(--pict-code-number)); }
.hljs-comment,
.hljs-quote            { color: var(--theme-color-syntax-comment,       var(--pict-code-comment)); font-style: italic; }
.hljs-operator,
.hljs-link             { color: var(--theme-color-syntax-operator,      var(--pict-code-operator)); }
.hljs-punctuation      { color: var(--theme-color-syntax-punctuation,   var(--pict-code-punctuation)); }
.hljs-function .hljs-title,
.hljs-title.function_,
.hljs-title.class_     { color: var(--theme-color-syntax-function,      var(--pict-code-function)); }
.hljs-variable,
.hljs-variable.language_,
.hljs-params           { color: var(--theme-color-syntax-variable,      var(--pict-code-variable)); }
.hljs-type,
.hljs-class .hljs-title { color: var(--theme-color-syntax-type,         var(--pict-code-type)); }
.hljs-built_in,
.hljs-builtin-name     { color: var(--theme-color-syntax-builtin,       var(--pict-code-builtin)); }
.hljs-attr,
.hljs-property         { color: var(--theme-color-syntax-property,      var(--pict-code-property)); }
.hljs-tag,
.hljs-name             { color: var(--theme-color-syntax-tag,           var(--pict-code-tag)); }
.hljs-attribute        { color: var(--theme-color-syntax-attrname,      var(--pict-code-attrname)); }
.hljs-symbol           { color: var(--theme-color-syntax-attrvalue,     var(--pict-code-attrvalue)); }
.hljs-emphasis         { font-style: italic; }
.hljs-strong           { font-weight: bold; }
.hljs-deletion         { color: var(--theme-color-status-error,         var(--pict-code-deletion)); background: var(--pict-code-deletion-background); }
.hljs-addition         { color: var(--theme-color-status-success,       var(--pict-code-addition)); background: var(--pict-code-addition-background); }
`
});
