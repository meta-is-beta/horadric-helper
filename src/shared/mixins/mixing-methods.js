const nodeShowcases = {
  nodes: [],
  applyOptionsByReference(reference, options) {
    const nodes = window.HoradricHelper.nodeShowcases.nodes[reference];
    if (!nodes) {
      return;
    }

    nodes.forEach((node) => {
      node.applyOptions(options);
    });
  },
  applyOptionsById(nodeId, options) {
    const nodes = Object.values(window.HoradricHelper.nodeShowcases.nodes);
    if (!nodes) {
      return;
    }

    const nodesWithId = nodes.find((x) => x.id === nodeId);
    if (!nodesWithId) {
      return;
    }

    nodesWithId.applyOptions(options);
  },
};

const itemShowcases = {
  items: [],
  applyOptionsByReference(reference, options) {
    const items = window.HoradricHelper.itemShowcases.items[reference];
    if (!items) {
      return;
    }

    items.forEach((item) => {
      item.applyOptions(options);
    });
  },
  applyOptionsById(itemId, options) {
    const items = Object.values(window.HoradricHelper.itemShowcases.items);
    if (!items) {
      return;
    }

    const itemWithId = items.find((x) => x.id === itemId);
    if (!itemWithId) {
      return;
    }

    itemWithId.applyOptions(options);
  },
};

export const registerHoradricHelperGlobalObject = () => {
  window.HoradricHelper = window.HoradricHelper || {
    itemShowcases,
    nodeShowcases,
  };

  return window.HoradricHelper;
};
