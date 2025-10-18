declare module "pdf-parse" {
  const pdf: (data: ArrayBuffer | Buffer) => Promise<{ text: string }>
  export default pdf
}
