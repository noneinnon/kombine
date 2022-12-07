import {  vi, afterEach, expect, describe, it } from "vitest";
import _ from 'lodash';
import { create } from "../lib/main.js";
import schema from "./__fixtures__/schema";
import components from "./__fixtures__/components.js";

function recurseTree(node, fn) {
  fn(node)
  if (node.children) {
    node.children.forEach(fn)
  }
}

const mockCreate = (component, props, ...children) => ({
  $name: component.name || component,
  props,
  children,
});

const props = { name: 'value', isDescriptionDisplayed: false, nested: { nestedName: 'nestedValue' }}

const mockRender = (component, props) => {
  return component(props)
};

afterEach(() => {
  vi.clearAllMocks()
  }
)

describe("create", () => {
  it("should return a function", () => {
    const rootComponent = create(mockCreate, schema, components);
    expect(typeof rootComponent).toEqual("function");
  });

  it("should create a renderable tree upon call", () => {
    const rootComponent = create(mockCreate, schema, components);
    const tree = mockRender(rootComponent);
    recurseTree(tree, node => {
      expect(node).toBeTruthy()
      expect(typeof node).toEqual("object")
    })
  });

  it("each component in tree should recieve given props", () => {
    const rootComponent = create(mockCreate, schema, components);
    const tree = mockRender(rootComponent, props);
    recurseTree(tree, node => {
      expect(node.props).toEqual(props)
    })
  });

  it("renders based on 'condition' prop", () => {
    const rootComponent = create(mockCreate, schema, components);
    const tree1 = mockRender(rootComponent, props);
    const props2 = {...props, isDescriptionDisplayed: true}
    const tree2 = mockRender(rootComponent, props2);
    expect(tree1.children).toEqual(
      expect.arrayContaining(
        [expect.objectContaining({ $name: '_null'})]
      )
    )
    expect(tree2.children).not.toEqual(
      expect.arrayContaining(
        [expect.objectContaining({ $name: '_null'})]
      )
    )
  });
});
