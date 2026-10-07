# Frameline - Photography Video Comparison & Review Guide

## Tech Stack
Plain HTML / CSS / JS (No Frameworks)
- **CSS Architecture**: CSS variables based dark-theme, semantic naming, flexbox/grid.
- **Iconography**: Phosphor Icons (CDN)
- **Fonts**: Outfit (Headings), Plus Jakarta Sans (Body), Space Mono (Numbers) via Google Fonts.

## Page Structure
Exactly 10 pages provided:
1. `index.html` - Home page with cinematic hero, featured cameras, and use-case tiles.
2. `cameras.html` - Hub for exploring all cameras with sorting and filtering.
3. `lenses.html` - Hub for lenses with accessible detail modals.
4. `compare.html` - Side-by-side feature matrix (up to 4 cameras selected from hub).
5. `camera-detail.html` - Inner page template for specific camera models (uses `?id=` param).
6. `recommender.html` - Use-case recommender engine based on budget and priorities.
7. `services.html` - Details about the comparison platform offerings.
8. `about.html` - Methodology, editorial statement, and team details.
9. `contact.html` - Client-side validated contact form.
10. `404.html` - Custom error page.

## Affiliate Tracking Spec
All "Check price" buttons use the following scheme:
```html
<a href="https://example.com/buy" 
   target="_blank" 
   rel="sponsored noopener" 
   class="btn btn-primary" 
   data-affiliate="true" 
   data-product-id="[product-slug]" 
   data-merchant="[merchant-name]" 
   data-placement="[hero|card|matrix|detail|lens|recommender|sticky]">
   Check price
</a>
```
- Handled via event delegation in `assets/js/main.js` pushing to `window.dataLayer`.
- Includes proper `rel="sponsored noopener"` attributes.

## Features Included
- **Compare Matrix**: Interactive row/column matrix, highlighted 'Best Value/Overall', sticky headers.
- **Review System**: 5-star summary, verified badges, rating distributions.
- **Pros & Cons**: Visual breakdown blocks on detail page.
- **Lightbox Gallery**: Accessible focus trap, keyboard navigation (Esc, Arrows).
- **JSON-LD Integration**: SEO markup implemented on homepage and review detail page.
- **Recommender Engine**: Custom algorithm scoring demo cameras based on form inputs.

## Demo Data
All content (images, names, prices, reviews, specs) is strictly demo/placeholder data stored in `assets/js/data.js` to showcase platform functionality.
