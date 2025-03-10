# Accessibility Issues - Sprint & Sip Website

This document outlines the accessibility issues deliberately included in the Sprint & Sip website for educational purposes. These issues represent common barriers that real users with disabilities might encounter on the web.

## HTML Structure and Semantic Markup Issues

### Missing Language Declaration
- `index.html` and `coffee.html` missing `lang` attribute on HTML tag
- Impact: Screen readers can't identify the language, affecting pronunciation

### Improper Heading Hierarchy
- **index.html**: 
  - Using `h2` instead of `h1` in hero section
  - Using `h3` in gallery after `h2` (improper hierarchy)
  - Using `h4` in location section (skipping from `h2` to `h4`)
- **coffee.html**: 
  - Starting with `h3` as first heading instead of `h1`
  - Using `h2` after `h3` (improper hierarchy)
- Impact: Screen reader users can't navigate via proper heading structure

### Non-semantic Elements
- **index.html**: Using styled `div` instead of proper heading for "Opening Hours"
- **coffee.html**: Using `div` with `onclick` instead of button for "ADD TO CART"
- Impact: Interactive elements aren't recognized by assistive technology, keyboard users can't access them

## Alt Text and Image Issues

### Missing Alt Text
- **index.html**: 
  - Hero image with no alt attribute
  - Beans image missing alt text
- **coffee.html**: 
  - Main coffee batch image missing alt text
  - Colombian coffee image missing alt attribute
- Impact: Screen reader users get no information about these images

### Poor Alt Text
- **index.html**: Coffee image with generic alt text "image"
- **coffee.html**: Product image with generic alt text "product" 
- **coffee.html**: Runner's blend with empty alt text
- **run-club.html**: Verbose/repetitive alt text "running is fun fun fun fun fun fun fun fun fun"
- Impact: Unhelpful descriptions don't convey meaningful information

### SVG Accessibility Issues
- Social media icons lacking proper accessible names
- Impact: Screen reader users can't identify the purpose of these links

## Color Contrast Issues

### Text on Background
- Light gray coffee description text (`#aaaaaa`) on white background
- Gray copyright text (`#999999`) in footer
- **coffee.html**: Light gray product descriptions on white background
- **coffee.html**: Light gray subtitle on light background
- **run-club.html**: Light gray run type text on white background
- **run-club.html**: Light gray FAQ title text
- Impact: Low-vision users may struggle to read this text

### Interactive Elements
- Gray button text (`#999999`) on light gray background (`#dddddd`) in contact forms
- **coffee.html**: Low contrast "ADD TO CART" button
- Impact: Users may not recognize these as interactive controls

## Form Accessibility Issues

### Missing or Improper Labels
- **index.html**:
  - Input with placeholder instead of label
  - Mismatched `for` attribute (pointing to "user-phone" instead of "user-email")
  - Input with no label for phone field
- **coffee.html**: No label for email subscription input
- **run-club.html**: 
  - Visually hidden label with mismatched `for`/`id` ("fullname" vs "name")
  - Empty label for email field
  - Select using `aria-label` instead of visible label
  - Checkbox using `span` instead of proper label association
- Impact: Screen reader users can't identify form purposes, voice input users can't target fields

### Button Issues
- **run-club.html**: Missing `type` attribute on submit button
- Impact: Form submission behavior may be unpredictable

## Keyboard Navigation and Focus Issues

### Focus States
- **run-club.html**: CSS defines `:hover` but not `:focus` for interactive elements
- Missing distinct focus indicators across interactive elements
- Using non-interactive elements (`div`) with click handlers
- Impact: Keyboard users can't see where they are on the page

### Navigation Issues
- PDF menu without text alternatives
- Some navigation elements not fully keyboard accessible
- Impact: Keyboard-only users can't access all content

## ARIA and Role Issues

### Missing or Improper ARIA
- Inconsistent use of `aria-label` and `aria-labelledby`
- Some sections lacking proper landmark roles
- Impact: Screen reader users miss important contextual information

## Document Structure Issues

### Table Structure
- **run-club.html**: Table lacking proper headers in some versions
- Impact: Screen reader users can't understand table relationships

## Fixing These Issues

For educational purposes, these issues have been deliberately introduced. To make the site fully accessible, you would need to:

1. Add proper language declarations
2. Fix heading hierarchy to be properly nested
3. Add descriptive alt text to all images
4. Ensure sufficient color contrast
5. Associate labels with all form controls
6. Make all interactive elements keyboard accessible
7. Add proper ARIA attributes where needed
8. Fix document structure issues

## Testing Tools

These issues can be detected using:
- WAVE (Web Accessibility Evaluation Tool)
- Axe DevTools
- Lighthouse Accessibility audits
- Screen readers like NVDA, VoiceOver, or JAWS
- Keyboard-only navigation testing