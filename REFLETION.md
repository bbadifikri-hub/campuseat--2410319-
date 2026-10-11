# Week 1 reflection

1. Building a UI imperatively means manually telling the browser how to update the DOM step by step (createElement, appendChild, etc.), while React is declarative — we describe what the UI should look like for a given state, and React handles the DOM updates for us.

2. A component name must start with a capital letter so React can tell the difference between a custom component and a regular HTML tag. Lowercase names are treated as HTML elements, so <header /> would render an HTML tag instead of our Header component.

3. A fragment <>...</> groups multiple elements so a component can return a single parent, without adding an extra element to the DOM. We avoid using <div> because it adds an unnecessary wrapper that can break CSS layouts and clutters the DOM.

4. One benefit of splitting the UI into small components is reusability — components like MenuItemCard can be reused for every menu item, and changes only need to be made in one file instead of everywhere.