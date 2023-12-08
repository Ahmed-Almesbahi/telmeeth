import React, { Children } from 'react';

export default function coalesceNonElementChildren(
  children: any,
  coalesceNodes: any
) {
  var coalescedChildren = [];

  var contiguousNonElements: any = [];
  Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      contiguousNonElements.push(child);
      return;
    }

    if (contiguousNonElements.length) {
      coalescedChildren.push(
        coalesceNodes(contiguousNonElements, coalescedChildren.length)
      );
      contiguousNonElements = [];
    }

    coalescedChildren.push(child);
  });

  if (contiguousNonElements.length) {
    coalescedChildren.push(
      coalesceNodes(contiguousNonElements, coalescedChildren.length)
    );
  }

  return coalescedChildren;
}
