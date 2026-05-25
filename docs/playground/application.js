// Application Code for the Code Editor playground.
//
// `Base` is the synthesized PictApplication wrapper that registers the
// CodeEditor view from your Pict Config (under `CodeEditorViewConfig`).
// Return a class that extends `Base` to customize lifecycle hooks or
// register additional views/providers.
//
// pict-section-code lazy-loads CodeJar via window.CodeJar when its view
// renders.  CodeJar 4.x is shipped as an ES module, so we can't load it
// with a plain <script src> tag — instead we dynamic-import it from
// jsDelivr and stamp the constructor onto window.CodeJar before letting
// the view render.  The same trick is used by pict-docuserve's own
// Fable / section playgrounds (see PictView-Docuserve-Section-Playground
// in pict-docuserve for the reference implementation).
//
// `new Function('u', 'return import(u)')(url)` is used instead of a
// literal `import(url)` so browserify doesn't try to rewrite the call
// at build time — the section-code UMD is also browserified.
//
return class extends Base
{
	onAfterInitialize()
	{
		// Skip the synthesized wrapper's render-the-view step; we'll
		// drive it ourselves after CodeJar is available.  Call straight
		// through to PictApplication so providers, manifest, AppData,
		// etc. still finish initializing on the normal schedule.
		window.PictApplication.prototype.onAfterInitialize.call(this);

		const tmpCodeJarCDN = 'https://cdn.jsdelivr.net/npm/codejar@4.2.0/dist/codejar.min.js';
		const tmpView = this.pict.views['CodeEditor'];

		new Function('u', 'return import(u)')(tmpCodeJarCDN)
			.then((pModule) =>
			{
				if (!pModule || typeof pModule.CodeJar !== 'function')
				{
					throw new Error('CodeJar export not found on the imported module');
				}
				// Expose globally for pict-section-code's connectCodeJarPrototype
				// fallback path, then connect explicitly so the view doesn't
				// have to re-discover it on first render.
				window.CodeJar = pModule.CodeJar;
				if (tmpView && typeof tmpView.connectCodeJarPrototype === 'function')
				{
					tmpView.connectCodeJarPrototype(pModule.CodeJar);
				}
				if (tmpView && typeof tmpView.render === 'function')
				{
					tmpView.render();
				}
			})
			.catch((pError) =>
			{
				console.error('[playground] Failed to load CodeJar from CDN:', pError);
			});
	}
};
