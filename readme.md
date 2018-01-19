# Qlik React Starter

This is a starter template for creating projects powered by Qlik using enigma.js and React.
It includes everything you need to get started, plus a few helpful components.
In active development.

## Getting Started

Simply download the repo, then run npm install, and then npm run dev. npm run webpack will generate dist files

### Prerequisites

A Qlik engine, and node.js installed on your dev machine

## Components

Currently, there are 4 Qlik-specific components. These components can be broken down into two categories:
components that implement "render prop" pattern, whose job it is to do some stuff and pass props to another component to be rendered,
and components meant to be rendered.

### QlikObject

This component implements the render prop pattern, and contains the logic to create and manage a Qlik generic object.
It passes down the Qlik generic object information to another component meant for rendering.

#### Props

Props that this component takes

##### `qProp`: PropTypes.func.isRequired

The Qlik generic object properties

##### `type`: PropTypes.oneOf(['qHyperCube', 'qListObject', 'expression']).isRequired

The type of Qlik generic object you wish to create. One of `qHyperCube`, `qListObject`, or `expression`

##### `Component`: PropTypes.func.isRequired

The component to be rendered

##### `componentProps`: PropTypes.object

Props to pass to the component to be rendered

##### `qPage`: PropTypes.object

The qPage to fetch. Defaults to `{
qTop: 0,
 qLeft: 0,
 qWidth: 10,
 qHeight: 100}`

#### Passed Props

Props that this component passes to the rendered prop

##### `componentProps`

Any props defined in the `componentProps` prop are passed on

##### `updating`: PropTypes.Boolean

A boolean indicating that the Qlik generic object is updating

##### `qLayout`: PropTypes.object

The qLayout returned from the Qlik engine for the object

##### `qData`: PropTypes.object

The object at the first index in the array qDataPages returned from the Qlik engine for the object

##### `offset`: PropTypes.func

A function used for changing the qTop of the qPage of the Qlik object. Takes an integer as a parameter.

##### `select`: PropTypes.func

A function used to make selections in the Qlik object. Takes a qElemNumber as a parameter.

##### `beginSelections`: PropTypes.func

A function which sets the Qlik object into 'selection mode'

##### `endSelections`: PropTypes.func

A function which ends 'selection mode'. Takes a boolean as a parameter to either accept or reject selections.

##### `searchListObjectFor`: PropTypes.func

A function which executes the Qlik list object `searchListObjectFor` method. Takes a search string as a parameter.

##### `acceptListObjectSearch`: PropTypes.func

A function which accepts and applies selections from `searchListObjectFor`

##### `applyPatches`: PropTypes.func

A function which calls the Qlik generic object method `applyPatches` on the object. Takes an array of patches as a parameter.

### QlikVirtualScroll

This component implements the render prop pattern, and paginates data on vertical scroll for efficient rendering of large data sets.
It passes down the a subet of the qMatrix to another component meant for rendering.

#### Props

Props that this component takes

##### `qData`: PropTypes.object.isRequired

The `qData` of the Qlik object

##### `qcy`: PropTypes.number.isRequired

The total height of the data

##### `Component`: PropTypes.func.isRequired

The component to be rendered

##### `componentProps`: PropTypes.object

Props to pass to the component to be rendered

##### `offset`: PropTypes.func.isRequired

A function used for changing the qTop of the qPage of the Qlik object. Takes an integer as a parameter.

##### `rowHeight`: PropTypes.number

A function which specifies the row height of each row in pixels of the rendered component. Defaults to 40.

##### `viewportHeight`: PropTypes.number

A function which specifies the desired viewport height. Recommended that it is a multiple of row height. Defaults to 200.

#### Passed Props

Props that this component passes to the rendered component

##### `componentProps`

Any props defined in the `componentProps` prop are passed on

##### `qMatrix`: PropTypes.array

The limited qMatrix array to be rendered

##### `rowHeight`: PropTypes.number

The row height that's passed to QlikVirtalScroll is passed along to the rendered prop as a convenience

### QlikFilter

This component renders a dropdown that acts as a Qlik Sense filter. It's meant to be used as the `Component` prop of a `QlikObject` component a type of `qListObject`.
This component doesn't need to be passed any props other than the props passed to it by `QlikObject`.

### QlikTable

This component renders a table. It's meant to be used as the `Component` prop of a `QlikObject` component with a type of `qHyperCube`.
This component requires a prop `columnWidths` to be passed to it, defining the widths of the columns of the table. This prop should be passed
using the `componentProps` prop of the `QlikObject`.

#### Props

##### `columnWidths`: PropTypes.array.isRequired

An array of numbers which are used to define the column widths of the table. Column widths are rendered as percentages. 
The length of columnWidths should be equal to the number of columns to be rendered in the table, and the sum of all columnWidths should equal 100.






