# ZeroDocSigner

## Description

The purpose of this project is to create digital signature inside of doc files (any doc files).

### Tech stack

- Frontend - **Electron desktop with electron-forge, webpack, React (TypeScript)**

### Supported document types

| Document Type             | Extensions          | Description                           |
| ------------------------- | ------------------- | ------------------------------------- |
| Microsoft Office (legacy) | .doc, .xls, .ppt    | Supported only by custom algorithm    |
| Microsoft Office          | .docx, .xlsx, .pptx | Fully supported                       |
| OpenDocument              | .odt, .ods, .odp    | Fully supported                       |
| PDF                       | .pdf                | Fully supported                       |
| Other                     | .\*                 | *Maybe* supported by custom algorithm |

### Base digital signature algorithm

- **RSA**

### Signature type

- **Invisible**

## Startup

1. Download [Node.js](https://nodejs.org)
2. Clone repository with `git clone https://github.com/dmitry-ship-it/zerodocsigner-desktop`
3. Delete file `package-lock.json` with `rm package-lock.json`
4. Install all dependencies with `npm install`
5. Run the application `npm run start`
