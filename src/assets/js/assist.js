/**
 * vue组件通信
 * @author couy
 * @param context 当前上下文环境（一般传this）
 * @param componentName  需要查找的组件的组件名（特别注意需要该组件定义了name属性）
 */

export const assist = {
  methods: {
    // 由一个组件，向上找到最近的指定组件
    findComponentUpward(context, componentName) {
      let parent = context.$parent;
      let name = parent.$options.name;

      while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
      }
      return parent;
    },
    // 由一个组件，向上找到所有的指定组件
    findComponentsUpward(context, componentName) {
      let parents = [];
      const parent = context.$parent;

      if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(this.findComponentsUpward(parent, componentName));
      } else {
        return [];
      }
    },
    // 由一个组件，向下找到最近的指定组件
    findComponentDownward(context, componentName) {
      const childrens = context.$children;
      let children = null;

      if (childrens.length) {
        for (const child of childrens) {
          const name = child.$options.name;

          if (name === componentName) {
            children = child;
            break;
          } else {
            children = this.findComponentDownward(child, componentName);
            if (children) break;
          }
        }
      }
      return children;
    },
    // 由一个组件，向下找到所有指定的组件
    findComponentsDownward(context, componentName) {
      return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = this.findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
      }, []);
    },


    // 由一个组件，找到指定组件的兄弟组件
    findBrothersComponents(context, componentName, exceptMe = true) {
      let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
      });
      let index = res.findIndex(item => item._uid === context._uid);
      if (exceptMe) res.splice(index, 1);
      return res;
    }
  }
};