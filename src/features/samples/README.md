# Application preparation samples

These are new, AI-assisted implementation samples made in October 2026. They are separate from the applicant's employment projects. They do not establish commercial experience with a video editor, Fabric.js, Zustand, or tactile graphics.

## Routes

- `/apply/clipy/demo/`: Vue 3 Composition API + TypeScript video timeline, hosted inside the existing React portfolio.
- `/apply/orinu/demo/`: React 19 + Fabric.js + Zustand shape editor.

Both editors are loaded on demand. The existing portfolio routes and case-study content are preserved.

## Video document

A clip contains an ID, a start/end time in the original video, and a caption. The timeline time is the sum of prior clip durations plus the current clip's offset. `timeline.ts` contains the pure mapping, trim, split, and reorder operations. Source ranges may overlap after edits; a split preserves total duration. Boundary splits below 0.1 seconds are rejected.

The preview seeks an HTMLVideoElement through the retained source ranges. Captions are a DOM overlay. Canvas API exports the currently decoded **original** frame as PNG; it does not burn in captions. A local file is held through an object URL and never uploaded. The export is a JSON edit document, not an encoded video. This is not a frame-accurate nonlinear editor: transitions rely on browser media seeking and animation frames. It does not implement multi-source composition, audio editing, FFmpeg/WebCodecs encoding, a resumable upload service, or persistent project storage.

## Canvas document

Fabric owns drawing and transforms. Zustand owns a serializable scene snapshot, document history, busy state, and current selection. Completed transforms, paths, additions, deletions, and layer moves commit the scene. Selection and zoom are UI state and are not history entries. `loadFromJSON` restores the scene; controls and pointer input are blocked during a restore.

`mockHost.ts` defines `EditorHost.loadDocument(): Promise<HostDocument>`. Its sample adapter returns a versioned local fixture without network access. A production host could replace that adapter once its actual interface is supplied. This does not claim integration with ORINU's undisclosed host contract.

The sample supports rectangles, circles, freehand paths, selection, resizing, rotation, layer ordering, zoom, undo/redo, a mock document, and SVG export. It does not implement tactile output, image thresholding/tracing/vectorization, path simplification, multi-user editing, or a professional accessibility audit. Buttons provide alternative layer selection and horizontal movement; this is not a claim of complete nonvisual canvas operation.

## History and validation

`history.ts` uses immutable snapshots, capped at 50 past states. New changes after undo discard the redo branch. Identical snapshots do not create new history. Snapshot storage is simple and inspectable for this scope; large production documents would require performance profiling and possibly patches or commands.

Run `pnpm test` (Node 22 with type stripping) for document-model tests and `pnpm check` for the repository's formatting, static checks, and TypeScript. The eight model tests cover source-time mapping, split duration, invalid ranges, undo/redo, branch truncation, history bounds, Canvas snapshot contents, and reordering. Browser-level interactions must be checked separately.
