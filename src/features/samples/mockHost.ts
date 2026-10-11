/** Minimal documented host contract. In production, replace this adapter with the agreed API. */
export interface HostDocument {
  schemaVersion: 1;
  title: string;
  scene: string;
}
export interface EditorHost {
  loadDocument(): Promise<HostDocument>;
}
export const mockHost: EditorHost = {
  async loadDocument() {
    return {
      schemaVersion: 1,
      title: "샘플 도형 문서",
      scene: JSON.stringify({
        version: "7.4.0",
        background: "#ffffff",
        objects: [
          {
            type: "Rect",
            version: "7.4.0",
            id: "mock-rect",
            label: "샘플 사각형",
            left: 110,
            top: 90,
            width: 200,
            height: 130,
            fill: "#d8e9e5",
            stroke: "#004643",
            strokeWidth: 3,
          },
          {
            type: "Circle",
            version: "7.4.0",
            id: "mock-circle",
            label: "샘플 원",
            left: 390,
            top: 170,
            radius: 70,
            fill: "#f5d6a7",
            stroke: "#563c1d",
            strokeWidth: 3,
          },
        ],
      }),
    };
  },
};
