# Implementation Plan - Phase 1: Styles & Navigation

## Goal Description
Unify the visual identity of `anticitera.deft.work` with `dominio.deft.work` by adopting `dominio`'s color palette. Establish cross-navigation between the two sites to create a cohesive user experience.

## User Review Required
> [!IMPORTANT]
> I am changing `anticitera`'s color scheme to match `dominio` (Dark: `#242424`, Light: `#ffffff`, Accent: `#646cff`). I will **preserve** `anticitera`'s distinct serif font (`GFS Didot`) to maintain its "classic/marketing" aesthetic while aligning the colors.

## Proposed Changes

### Anticitera (anticitera.deft.work)

#### [MODIFY] [index.css](file:///home/pirate/anticitera.deft.work/public/css/index.css)
- Update CSS variables to match `dominio`'s palette:
    - Background: `#ffffff` (light) / `#242424` (dark)
    - Text: `#213547` (light) / `rgba(255, 255, 255, 0.87)` (dark)
    - Links: `#646cff` (hover `#535bf2`)

#### [MODIFY] [base.njk](file:///home/pirate/anticitera.deft.work/_includes/layouts/base.njk)
- Add a "Registrar Dominio" button/link in the header navigation pointing to `https://dominio.deft.work`.

### Dominio (dominio.deft.work)

#### [MODIFY] [Navbar.jsx](file:///home/pirate/docker/dominio.deft.work/src/components/Navbar.jsx)
- Add a "Volver a Anticitera" link in the Navbar pointing to `https://anticitera.deft.work`.

## Verification Plan

### Automated Tests
- None available for UI style changes.

### Manual Verification
1.  **Build Anticitera**: Run `npm run build` in `anticitera.deft.work`.
2.  **Serve Anticitera**: Run `npm start` and open in browser.
    -   Verify background colors and link colors match the new palette.
    -   Verify "Registrar Dominio" link appears and works.
3.  **Run Dominio**: Run `npm run dev` in `dominio.deft.work`.
    -   Verify "Volver a Anticitera" link appears and works.
