const schema = {
  root: true,
  name: "vehicles",
  resource: "vehicles",
  fields: [{ name: "name" }],
  children: [
    {
      name: "pilots",
      resource: "people",
      fields: [{ name: "name" }],
      children: [
        {
          name: "homeworld",
          resource: "planets",
          fields: [
            { name: "name" },
            { name: "diameter", transform: Api.convertToNumber },
          ],
        },
      ],
    },
  ],
};

// console.log('schema', schema)
async function composeSchema(schema, urls) {
  let { fields, resource, children } = schema;
  let hasChildren = _.get(children, "length", 0);

  let result = await getResourceObjects(resource, urls);

  if (hasChildren) {
    for (let childSchema of children) {
      let propName = childSchema.name;
      fields.push(new Field(propName));

      const composeChild = async obj => {
        obj[propName] = await composeSchema(childSchema, obj[propName]);
        return obj;
      };
      result = await new Mapper(result).asyncMap(composeChild);
    }
  }

  result = pickFields(result, fields);

  return result;
}

async function getResourceObjects(type, urls) {
  if (!urls) {
    return (await Api.getObjectsByType(type)).objects;
  }

  const [onArray, onItem] = [Api.getObjectsFromUrls, Api.getObjectFromUrl];
  return await new Mapper(urls).byType(onArray, onItem);
}

class Field {
  constructor(field) {
    if (_.isString(field)) {
      field = { name: field };
    }
    this.name = field.name;
    this.transform = field.transform;
  }
}

function pickFields(itemOrArray, fields = []) {
  const _updateFields = result => updateFields(result, fields);

  const fieldsResult = new Mapper(itemOrArray).map(_updateFields);

  return fieldsResult;
}

function updateFields(obj, fields) {
  const props = _.map(fields, "name");
  const result = _.pick(obj, props);

  for (let { name, transform } of fields) {
    if (_.isFunction(transform)) {
      result[name] = transform(result[name]);
    }
  }

  return result;
}

class Mapper {
  constructor(value) {
    this.value = value;
  }

  map(fn) {
    let value = this.value;

    if (this.isArray) {
      value = value.map(fn);
    } else {
      value = fn(value);
    }

    return value;
  }

  async asyncMap(fn) {
    let result = this.map(fn);

    if (_.isArray(result)) {
      return Promise.all(result);
    }

    return result;
  }

  byType(onArray, onItem) {
    const fn = this.isArray ? onArray : onItem;
    return fn(this.value);
  }

  get isArray() {
    return _.isArray(this.value);
  }
}

const Schema = {
  compose: () => composeSchema(schema),
  composeSchema,
  getResourceObjects,
  pickFields,
  updateFields,
  Mapper,
};
