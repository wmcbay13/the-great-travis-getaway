# The Great Travis Getaway

A coast-first Ireland birthday-trip planner for Travis. The site presents a 7-day Wild Atlantic Way route, 10-day extensions, activities, lodging ideas, restaurant recommendations, cost estimates, and a preparation checklist.

## Local preview

This is a static site with no package installation or build step.

1. Clone the repository.
2. Open `index.html` in a browser, or serve the folder with any static web server.
3. Use the header theme control to switch between light and dark mode. The selected theme is retained in browser local storage.

## Project structure

```text
.
├── index.html                         # Page content and semantic structure
├── styles.css                         # Base layout, typography, responsive styles
├── modern.css                         # Modern visual layer and dark-mode overrides
├── enhancements.css                   # Booking gallery and calculator controls
├── app.js                             # Budget calculator, currency switch, checklist, form feedback, theme toggle
└── .github/workflows/deploy-pages.yml # GitHub Pages CI/CD workflow
```

## Languages and browser features

- **HTML5** supplies the content, navigation landmarks, controls, and accessible labels.
- **CSS3** handles responsive layout, custom properties, transitions, and the dark theme.
- **Vanilla JavaScript** powers the smooth scrolling, interactive budget calculator, checklist progress, trip form feedback, and stored light/dark theme setting.

The only external resources are Google Fonts and remote Unsplash images. There is no backend, database, bundler, or dependency installation required.

## Configuration

Most content is in `index.html`:

- Update the itinerary, accommodation, dining ideas, and reference links directly in the relevant sections.
- Adjust base colors and typography in `styles.css`.
- Adjust the contemporary design layer and dark-mode colors in `modern.css`.
- Change cost-calculation assumptions or the EUR/USD planning rate in `app.js` within `updateBudget()`.

Because the site is static, GitHub Pages can publish it directly from the repository artifact.

## Deployment pipeline

The workflow in `.github/workflows/deploy-pages.yml` is the site’s CI/CD pipeline.

1. A push to either `main` or `master` triggers the workflow. It can also be started manually from the Actions tab.
2. GitHub Actions checks out the repository and configures the Pages environment.
3. The complete repository is uploaded as a Pages artifact.
4. GitHub deploys that artifact to the `github-pages` environment.
5. The deployed site URL is exposed in the workflow summary and deployment environment.

To enable it for a new repository, open **Settings → Pages**, set **Source** to **GitHub Actions**, then push or merge a change to `main` or `master`.

## Publishing updates

Merge a pull request into `main` or `master` (or push directly to either branch). GitHub Actions will publish the new version automatically. You can monitor each release under the repository’s **Actions** tab.
