const Tokens = {
  type: "type",
  props: "props",
  condition: "condition",
};

const applyCreate = (createFn, ...args) => createFn(...args);

function assertComponent(component) {
  const _type = typeof component;
  if (_type !== "function") {
    throw new Error(`Expected component to be a function, but got ${_type}`);
  }
}

export function create(createFn, schema, components) {
  function Root(props = {}) {
    return applyCreate(
      createFn,
      schema[Tokens.type] ?? "div",
      props,
      ...schema.children.map(makeCreateComponent(props)) // spreading removes the need for passing key
    );
  }

  function makeCreateComponent(props) {
    return function createComponent(node) {
      const condition = node[Tokens.condition] ?? (() => true);
      const componentName = node[Tokens.type];
      const componentFn = components[componentName];
      assertComponent(componentFn);

      if (!condition(props)) {
        return applyCreate(createFn, function _null() { return null }, props);
      }

      if (!node.children) {
        return applyCreate(createFn, componentFn, props);
      }

      return applyCreate(
        createFn,
        componentFn,
        props,
        ...node.children.map(makeCreateComponent(props))
      );
    };
  }

  return Root;
}
