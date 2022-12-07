# TODO
- [ ] think about how to express props more efficiently
- [ ] schemas can be JSON or JS object

# idea

configuring page's section for every business request can be a pain.

Imagine that we could leverage that work to a remote service and configure pages based on custom schema format.
This is an attempt to do just that.

# Description

Kombine is a simple interpreter of custom schemas.
It allows you to express page / component structures simply and effortlessly.

Create components during build time or at run time, yay!

# api

```javascript
const schema = {
  type: "Root",
  children: [
    { type: "TitleSection" },
    {
      type: "DescriptionSection",
      props: {
        hotelData: { type: "Object" },
      },
    },
    {
      type: "AboutSection",
      children: [
        {
          type: "FavoritesSection",
          props: {
            hotelData: { type: "Object" },
          },
        },
      ],
    },
  ],
};
```

```javascript
import {create} from '@noneinnon/kombine'
import {createElement} from "react"
// schema can be a local file
// or fetched over network
import schema from './my-schema.json'
// resolving components,
// lazy import etc is done here
import components from './my-components'

// calls createElement for each component, 
// passing myData prop to each
const AboutPage = create(createElement, schema, components)

const description = {
  // some props to pass down the tree
}

// ... later in code
<AboutPage description={description} />
```
